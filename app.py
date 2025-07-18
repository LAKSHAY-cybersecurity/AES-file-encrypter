from flask import Flask, request, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Random import get_random_bytes
import io
import os

app = Flask(__name__)
CORS(app)

BLOCK_SIZE = AES.block_size
KEY_LEN = 32
SALT_LEN = 16
PBKDF2_ROUNDS = 100_000

def pad(data):
    padding_len = BLOCK_SIZE - len(data) % BLOCK_SIZE
    return data + bytes([padding_len]) * padding_len

def unpad(data):
    padding_len = data[-1]
    if not 1 <= padding_len <= BLOCK_SIZE:
        raise ValueError("Invalid padding or incorrect password.")
    return data[:-padding_len]

@app.route('/process', methods=['POST'])
def process_file():
    try:
        file = request.files['file']
        password = request.form['password']
        mode = request.form['mode']
        filename = secure_filename(file.filename)

        if not file or not password or mode not in ["encrypt", "decrypt"]:
            return "Missing file, password or invalid mode.", 400

        data = file.read()

        if mode == "encrypt":
            salt = get_random_bytes(SALT_LEN)
            key = PBKDF2(password, salt, dkLen=KEY_LEN, count=PBKDF2_ROUNDS)
            iv = get_random_bytes(BLOCK_SIZE)
            cipher = AES.new(key, AES.MODE_CBC, iv)
            encrypted = cipher.encrypt(pad(data))
            result = salt + iv + encrypted
            download_name = filename + ".aesenc"

        elif mode == "decrypt":
            if len(data) < SALT_LEN + BLOCK_SIZE:
                return "Invalid encrypted file format", 400

            salt = data[:SALT_LEN]
            iv = data[SALT_LEN:SALT_LEN + BLOCK_SIZE]
            ciphertext = data[SALT_LEN + BLOCK_SIZE:]

            key = PBKDF2(password, salt, dkLen=KEY_LEN, count=PBKDF2_ROUNDS)
            cipher = AES.new(key, AES.MODE_CBC, iv)
            try:
                decrypted = unpad(cipher.decrypt(ciphertext))
            except Exception:
                return "Decryption failed. Wrong password or corrupted file.", 400

            base, _ = os.path.splitext(filename)
            download_name = base + ".decrypted"
            result = decrypted

        else:
            return "Unsupported mode", 400

        return send_file(
            io.BytesIO(result),
            as_attachment=True,
            download_name=download_name,
            mimetype="application/octet-stream"
        )

    except Exception as e:
        print(f"[ERROR] {e}")
        return f"Server error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)

# 🔐 AES File Encrypter & Decrypter

A powerful and elegant web-based tool that allows users to **encrypt** and **decrypt** files using AES (Advanced Encryption Standard) with a secure password. Built with HTML, CSS, JavaScript, and Flask (Python), it ensures data security and provides real-time password strength evaluation with theme switching support.

---

## 🚀 Features

- 📂 **Encrypt & Decrypt Files** using AES-CBC mode
- 🔐 **Password-Based Encryption** using PBKDF2 key derivation
- 🌗 **Light & Dark Theme Toggle** with extra theme selector
- 🔎 **Password Strength Meter** with animated progress bar
- 👁️ **Show/Hide Password Toggle**
- 💡 **Smart Suggestions** for improving weak passwords
- 🚫 **Brute-Force Prevention** with limited attempts
- ✅ **Client-Side Validations** and user-friendly alerts
- 🎨 **Animated & Responsive UI**

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| HTML5, CSS3, JavaScript | Python, Flask |
| Responsive Design | Crypto.Cipher (AES) |
| Theme Switching | PBKDF2 (password-based key derivation) |
| Password Strength Bar | Flask-CORS |

---

## 📦 Setup Instructions

### 🔧 1. Clone the Repository
```bash
git clone https://github.com/your-username/aes-encrypter.git
cd aes-encrypter
````

### 🐍 2. Set Up Python Environment

```bash
# (Optional) Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install flask pycryptodome flask-cors
```

### ▶️ 3. Run the Flask Server

```bash
python app.py
```

Flask server will run on [http://localhost:5000](http://localhost:5000)

### 🌐 4. Open the Web App

Open `index.html` in your browser (or serve via Flask if you integrate templates).

---

## 🔒 Security Notes

* Passwords are never stored or transmitted—used only for local encryption.
* AES-256 with CBC mode ensures strong symmetric encryption.
* Salt + IV is securely generated per session.
* 3 failed attempts lock further submission to prevent brute force.

---

## 📁 File Structure

```
aes-encrypter/
├── app.py              # Flask backend
├── index.html          # Main UI
├── style.css           # Styles and themes
├── script.js           # Frontend logic
├── README.md
├── .gitignore
```

---

## 🎨 Themes Supported

* Light 🌞
* Dark 🌙
* Cyberpunk ⚡
* Ocean 🌊
* Forest 🌿
* Sunset 🌇

Change themes from the top navbar dropdown.

---

## 📌 TODO / Future Improvements

* 🔐 Add RSA public key encryption mode
* 📱 Create a mobile app version
* 📁 Drag & Drop file upload
* 📈 Add analytics for password trends

---

## Author

* Built by **Lakshay and Saiyyam**

---

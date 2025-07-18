# 🔐 AES File Encrypter & Decrypter
A web-based application that securely encrypts and decrypts files using **AES-256** (CBC mode) in the browser with a Python Flask backend.

## 🚀 Features
- File encryption & decryption with AES-256
- Password strength detection (frontend)
- Drag & drop file input
- Modern themes (light, dark, cyberpunk, etc.)
- Frontend built with HTML, CSS, JS
- Flask backend with secure AES implementation

## 🛠 Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Python (Flask), PyCryptodome
- Security: AES-CBC, PBKDF2 with salt & IV

## 🔧 Setup Instructions


### Backend (Flask)
```bash
pip install flask flask-cors pycryptodome
python app.py

# 🔐 AES File Encrypter & Decrypter
A powerful and elegant web-based tool that allows users to **encrypt** and **decrypt** files using AES (Advanced Encryption Standard) with a secure password. Built with HTML, CSS, JavaScript, and Python, it ensures data security and provides real-time password strength evaluation with theme switching support.

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

### 1. Clone the Repository
   git clone https://github.com/your-username/aes-encrypter.git
   cd aes-encrypter

### 2. Set Up Python Environment (optional)
    python -m venv venv
    source venv/bin/activate
    On Windows: venv\Scripts\activate
 Install dependencies
   pip install flask pycryptodome flask-cors

### 3. Run the Flask Server
   python app.py

### 4. Open the Web App
Open index.html in your browser

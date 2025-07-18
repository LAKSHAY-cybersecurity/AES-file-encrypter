let attemptCount = 0;
    const maxAttempts = 3;

    const prefersDark = localStorage.getItem("theme") === "dark";
    if (prefersDark) document.body.classList.add("dark-theme");

    document.getElementById("themeToggleBtn").addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    function togglePassword() {
      const input = document.getElementById("password");
      input.type = input.type === "password" ? "text" : "password";
    }

    document.getElementById("password").addEventListener("input", () => {
      const val = document.getElementById("password").value;
      const strengthText = document.getElementById("passwordStrength");
      const input = document.getElementById("password");
      const fill = document.getElementById("strengthFill");

      input.classList.remove("weak", "medium", "strong");

      let score = 0;
      if (val.length >= 5) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (score <= 1) {
        input.classList.add("weak");
        strengthText.textContent = "🔴 Weak Password. Use more characters, mix letters, numbers and symbols.";
        fill.style.width = "25%";
        fill.style.backgroundColor = "var(--weak-color)";
      } else if (score <= 3) {
        input.classList.add("medium");
        strengthText.textContent = "🟡 Not Strong. Try adding more variety or length.";
        fill.style.width = "60%";
        fill.style.backgroundColor = "var(--medium-color)";
      } else {
        input.classList.add("strong");
        strengthText.textContent = "🟢 Strong Password!";
        fill.style.width = "100%";
        fill.style.backgroundColor = "var(--strong-color)";
      }
    });

    document.getElementById("fileForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const file = document.getElementById("fileInput").files[0];
      const password = document.getElementById("password").value;
      const mode = document.querySelector("input[name='mode']:checked").value;
      const messageBox = document.getElementById("message");

      if (!file) {
        messageBox.textContent = "❗ Please select a file first.";
        return;
      }

      if (attemptCount >= maxAttempts) {
        messageBox.textContent = "Too many failed attempts. Access locked.";
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);
      formData.append("mode", mode);

      try {
        const res = await fetch("http://localhost:5000/process", {
          method: "POST",
          body: formData
        });

        if (!res.ok) {
          attemptCount++;
          const errorText = await res.text();
          messageBox.textContent = `Error: ${errorText}`;
          if (attemptCount >= maxAttempts) {
            messageBox.textContent += "\n🔒 Access locked due to too many failed attempts.";
          }
          return;
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file.name}.${mode === 'encrypt' ? 'encrypted' : 'decrypted'}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        messageBox.textContent = "✅ Success! File downloaded.";
        attemptCount = 0;

        document.getElementById("fileForm").reset();
        document.getElementById("strengthFill").style.width = "0";
        document.getElementById("passwordStrength").textContent = "";
        document.getElementById("password").classList.remove("weak", "medium", "strong");

      } catch (err) {
        console.error(err);
        attemptCount++;
        messageBox.textContent = "❌ Error processing file.";
      }
    });
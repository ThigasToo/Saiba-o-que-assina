# ⚖️ Know What You Sign — AI-Powered Privacy Assistant

Your intelligent assistant that reads and summarizes Terms of Service and Privacy Policies in seconds!

✅ **Now available on the Chrome Web Store!**  
Install it directly and start browsing with more transparency and awareness.

---

## 🚀 How to Install

### Option 1: Install from Chrome Web Store (Recommended)
1. Go to the Chrome Web Store page of the extension.
2. Click **"Add to Chrome"**.
3. Confirm the installation.

That’s it! 🎉 The extension will be ready to use instantly.

---

### Option 2: Manual Installation (Developer Mode)

If you prefer, you can still install it manually:

1. **Download the Extension:** Download the `.zip` file and extract it somewhere easy to find (e.g., Desktop).
2. **Open Extensions Page:** In Chrome, go to `chrome://extensions/`.
3. **Enable Developer Mode:** Toggle **"Developer mode"** in the top-right corner.
4. **Load the Extension:** Click **"Load unpacked"**.
5. **Select Folder:** Choose the extracted folder *(make sure it contains the `manifest.json` file)*.

Done! 🎉 The extension icon will appear in your browser.

---

## 💡 How to Use

Just browse the internet normally!

Visit popular websites (Netflix, Instagram, ChatGPT, etc.) and wait a few seconds.  
The assistant will automatically analyze the page and display:

- A **Privacy Score**
- Key **warnings and critical points** you should know

---

## 🌐 Live API (Recommended)

The backend is already deployed and running in production.

👉 No setup required — the extension works out of the box.

If you prefer, you can still run the backend locally by following the instructions below.

---

## 🛠️ Backend Setup

This project uses a Node.js backend to process privacy analysis using AI.

### 1. Navigate to the backend folder
```bash
cd /backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your `.env` file
```env
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

### 4. Run the server
```bash
node server.js
```

The backend will be available at:
[http://localhost:3000](http://localhost:3000)

---

## ⚠️ Important Notice (First Load May Be Slower)

The AI "brain" runs on a cloud server to keep your computer lightweight.

If the extension hasn’t been used for a while, the server may "sleep" to save resources.

👉 Because of that, the **first analysis of the day may take 30–50 seconds** while the server wakes up.  
After that, all analyses will be almost instant.

---

## 🔒 Privacy Policy

**Privacy Policy — "Know What You Sign" Extension**  
Last updated: April 6, 2026

Your privacy is taken seriously. This Privacy Policy explains how the extension collects, uses, and protects your data. Since our mission is to improve transparency on the internet, our own practices are designed to be as transparent as possible.

---

### 1. What data do we collect?

To function properly, the extension collects **only the main domain (URL)** of the website you are currently visiting (e.g., "netflix.com", "facebook.com").

We do **NOT**:
- Collect personal data (name, email, passwords)
- Track your browsing history
- Use third-party tracking cookies

---

### 2. How do we use your data?

The captured domain is securely sent to our cloud server for a single purpose:

- Query public privacy databases (such as ToS;DR)
- Use AI to generate a **privacy score and summary** for that specific website

---

### 3. Third-Party Data Sharing

To generate intelligent summaries, the domain and publicly available Terms of Service excerpts are processed via the **OpenAI (GPT) API**.

- No personal data is sent to OpenAI or any third party  
- We **never sell, rent, or trade user data**

---

### 4. Data Storage and Retention

Analysis results (scores and alerts) are temporarily cached on our server to improve performance.

- No user identity is stored  
- No user profiles or tracking databases exist

---

### 5. Permissions Requested

The extension requests permissions (`activeTab` / `<all_urls>`) strictly to:

- Identify the current website
- Display the privacy alert overlay

---

### 6. Contact

If you have any questions about this Privacy Policy or the extension, contact:

📧 **tcms2014@hotmail.com**

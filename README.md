# 🛠 Unstop Job Portal UX Revamp

> Fixing real-world user experience bugs in Unstop's job application flow — built using Python + Streamlit.

---

## 🚀 Demo

🖥️ **Live App:**  
[https://unstop-ux-revamp-c6hp5hncfxpckggvb2lm9u.streamlit.app/](https://unstop-ux-revamp-c6hp5hncfxpckggvb2lm9u.streamlit.app/)

---

## 🧠 Problem

While using Unstop to apply for jobs, I noticed several UX bugs and friction points in the flow. For example:
- No "Back to Jobs" button after opening a job
- Breadcrumb navigation is static — no real links
- Clicking "Apply" without login doesn't preserve context
- No similar jobs are recommended

---

## ✅ What This Project Fixes

| Bug Fixed | Description |
|-----------|-------------|
| 🧭 Breadcrumb Navigation | Clickable Home / Jobs links |
| 🔁 Back to Jobs Button | Easily return to explore other jobs |
| 🔄 Loading Spinner | Prevents blank/instant transitions |
| 🔐 Login Flow Fix | Preserves job after login and auto-submits |
| ✅ Prevent Double Apply | "Apply Now" disabled after submit |
| 💡 Similar Jobs Section | Recommends 3 matching jobs |

---

## 💻 Tech Stack

- [Streamlit](https://streamlit.io) – Python web app framework
- `session_state` for routing and flow
- Modular file structure (`app.py`, `job_detail.py`, etc.)

---

## 🧩 Folder Structure

📁 unstop-ux-revamp/
├── app.py # Main router and entrypoint
├── job_detail.py # Job detail screen + Apply button
├── jobs_list.py # Job listing screen
├── login.py # Simulated login flow
├── requirements.txt
└── README.md

📬 Feedback Sent to Unstop Team
This project was shared with the Unstop Product Team as a working proof-of-concept UX improvement. If you'd like to suggest additional features or want to collaborate, feel free to open an issue!

🙌 Author
Banothu Prashanth
🎓 NIT Bhopal | AI/ML Developer
📧 banothuprashanth121@gmail.com
📱 +91 6301415995
🌐 LinkedIn | Portfolio

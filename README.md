<div align="center">

<br/>

```
░█████╗░██████╗░██╗░█████╗░
██╔══██╗██╔══██╗██║██╔══██╗
███████║██████╔╝██║███████║
██╔══██║██╔══██╗██║██╔══██║
██║  ██║██║  ██║██║██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
```

### *Your AI voice journal & mental health companion*

<br/>

![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![AI Powered](https://img.shields.io/badge/AI-Powered-8278B0?style=for-the-badge&logo=openai&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Development-C08763?style=for-the-badge)

<br/>

> *"Take a breath. Speak freely — nothing here leaves this space."*

</div>

---

##  What is Aria?

**Aria** is an AI-powered voice journal and mental health companion for Android. You tap a button, speak your thoughts, and Aria listens — really listens. It transcribes your voice in real time, reads your emotional state, and responds with warmth and clarity tuned exactly to how you're feeling right now.

Not generic advice. Not a checklist. Just a presence that meets you where you are — whether that's overwhelmed, low, numb, or simply needing to be heard.

---

##  Features

###  Voice-First Journaling
Tap the mic. Speak. Aria handles the rest — transcribing your words and understanding the emotional weight behind them, not just the text.

###  Mood-Matched AI Responses
Aria detects your current emotional state and adapts its entire tone and response style to match it:

| Mood | How Aria Responds |
|---|---|
|  Anxious / Overwhelmed | Grounding techniques, calm reassurance, short clear steps |
|  Low / Sad | Soft validation first, gentle encouragement, no pressure |
|  Frustrated | Acknowledges intensity, holds space, then gently redirects |
|  Numb / Disconnected | Minimal words, presence-first, sensory grounding prompts |
|  Stable / Okay | Reflective journaling, light goal nudges, gratitude prompts |

###  Mood Insights
A smooth weekly mood chart visualises your emotional patterns over time. Spot trends, understand triggers, and see your consistency — on the rough days and the good ones.

###  Streak Tracking
A daily reflection streak keeps you coming back — not out of pressure, but out of care for yourself.

###  Daily Prompt
Each session opens with a gentle prompt: *"What's one thing you could set down tonight?"* — an invitation, never an obligation.

###  Personalised Themes
Four calm accent colours — **Sage**, **Clay**, **Lavender**, and **Dusk** — plus a full night mode. The app should feel like yours.

---

##  Screens

| Home · Today | Reflection | Mood Insights |
|:---:|:---:|:---:|
| Mood ring, streak counter, and the big mic button | Your transcribed entry + Aria's warm written response | Weekly mood chart + past entry cards |

---

##  Tech Stack

**Frontend / Mobile UI**

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)
![Android](https://img.shields.io/badge/Android_WebView-3DDC84?style=for-the-badge&logo=android&logoColor=white)

**Typography**

- `Newsreader` — serif display for emotional moments and AI responses
- `Hanken Grotesque` — clean sans-serif for UI and data

**AI & Backend**

![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

##  Getting Started

```bash
# Clone the repo
git clone https://github.com/hazzylol/aria.git
cd aria

# Install backend dependencies
npm install

# Set up environment variables
cp .env.example .env
# → Add your OpenAI API key and MongoDB URI

# Start the backend
npm run dev
```

Open `Voice Journal.html` in a browser for the UI prototype, or load the Android project in Android Studio to run on device.

---

##  Environment Variables

```env
OPENAI_API_KEY=your_key_here
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

---

##  Roadmap

- [x] Voice transcription + real-time mood detection
- [x] Mood-matched AI responses
- [x] Weekly mood chart + entry history
- [x] Daily streak tracking
- [x] Accent themes (Sage, Clay, Lavender, Dusk) + night mode
- [ ] On-device mood detection (offline support)
- [ ] Crisis detection + emergency contact alert
- [ ] Shareable mood reports for therapists
- [ ] iOS version

---

##  Disclaimer

Aria is a supportive companion, not a replacement for professional mental health care. If you are in crisis, please reach out to a licensed professional or your local emergency services.

**Pakistan:** Umang helpline — 0317-4288665
**International:** [findahelpline.com](https://findahelpline.com)

---

##  Contributing

Issues and pull requests are welcome.

1. Fork the repo
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit (`git commit -m 'Add your feature'`)
4. Push (`git push origin feature/your-feature`)
5. Open a Pull Request

---

<div align="center">

Built with care by [Hassaan Nasir](https://github.com/hazzylol) · Rawalpindi, Pakistan 🇵🇰

*Rest was never something you had to earn first.*

</div>

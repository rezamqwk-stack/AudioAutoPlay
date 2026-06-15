<div align="center">

# 🎵 Auto Audio Player

### A Chrome Extension that brings continuous playback to any website

[![Version](https://img.shields.io/badge/version-1.0.0-e94560?style=for-the-badge)](https://github.com/YOUR_USERNAME/auto-audio-player)
[![Manifest](https://img.shields.io/badge/Manifest-V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![License](https://img.shields.io/badge/license-MIT-7fdbca?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

<br/>

> **Ever been on a music site that has all the songs but no "play next" button?**
> Auto Audio Player fixes that — silently, automatically, on *any* website.

<br/>

![Demo Preview](assets/demo.gif)

</div>

---

## ✨ Features

- **Auto Next** — When a track ends, the next `<audio>` on the page plays instantly
- **Works Everywhere** — No site-specific code; if it uses a standard `<audio>` tag, this works
- **Dynamic Page Support** — Uses `MutationObserver` to catch audio elements loaded after page render
- **Smooth Scroll** — Automatically scrolls to the currently playing track
- **Persistent State** — Remembers if you had it enabled, even after closing the browser
- **Zero Config** — One toggle. That's it.
- **Lightweight** — No dependencies, no frameworks, pure vanilla JS (~100 lines)

---

## 📸 Screenshots

| Popup UI | Active on Page |
|----------|----------------|
| ![Popup](assets/screenshot-popup.png) | ![Active](assets/screenshot-active.png) |

---

## 🚀 Installation

### From Source (Developer Mode)

1. **Clone the repo**
```bash
   git clone https://github.com/rezamqds/AudioAutoPlay.git
   cd AudioAutoPlay
```
   
# 🛠️ How It Works
Page Loads
│
▼
content.js injects into the page
│
▼
Queries all <audio> elements
│
▼
Attaches `ended` event listener to each
│
▼
MutationObserver watches for new audio elements
│
▼
Track ends → next track plays → page scrolls to it

The extension uses a clean IIFE pattern with no global scope pollution. State is managed via `chrome.storage.local` and communication between popup and content script is handled through `chrome.runtime.onMessage`.

---

## 📁 Project Structure


auto-audio-player/
│
├── manifest.json        # Extension config (Manifest V3)
├── content.js           # Core logic — injected into every page
├── popup.html           # Extension popup UI
├── popup.js             # Popup logic & tab communication
│
└── icons/
├── icon16.png
├── icon48.png
└── icon128.png

---

## 🧠 Tech Stack

| Layer | Tech |
|-------|------|
| Extension API | Chrome Manifest V3 |
| Content Script | Vanilla JavaScript (ES6+) |
| DOM Observation | `MutationObserver` API |
| State Persistence | `chrome.storage.local` |
| UI | HTML + CSS (no framework) |

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📜 License

MIT © [rezamqds](https://github.com/rezamqds)

---

<div align="center">

**If this saved you from clicking "Next" a hundred times, consider giving it a ⭐**

</div>

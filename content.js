(function () {
  let enabled = false;
  let audioElements = [];
  let observers = [];

  // Load state from storage
  chrome.storage.local.get(["autoPlayEnabled"], (result) => {
    enabled = result.autoPlayEnabled || false;
    if (enabled) init();
  });

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "toggle") {
      enabled = msg.enabled;
      if (enabled) {
        init();
      } else {
        cleanup();
      }
    }
  });

  function getAudioList() {
    return Array.from(document.querySelectorAll("audio"));
  }

  function attachEndedListener(audio, index, list) {
    // Remove old listener if exists
    if (audio._autoPlayHandler) {
      audio.removeEventListener("ended", audio._autoPlayHandler);
    }

    audio._autoPlayHandler = function () {
      if (!enabled) return;
      const next = list[index + 1];
      if (next) {
        // Scroll into view
        next.scrollIntoView({ behavior: "smooth", block: "center" });
        // Some players need load() before play()
        next.load();
        next.play().catch(() => {});
      }
    };

    audio.addEventListener("ended", audio._autoPlayHandler);
  }

  function init() {
    cleanup();
    audioElements = getAudioList();

    audioElements.forEach((audio, i) => {
      attachEndedListener(audio, i, audioElements);
    });

    // Watch for dynamically added audios
    const observer = new MutationObserver(() => {
      const newList = getAudioList();
      if (newList.length !== audioElements.length) {
        cleanup();
        audioElements = newList;
        audioElements.forEach((audio, i) => {
          attachEndedListener(audio, i, audioElements);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    observers.push(observer);
  }

  function cleanup() {
    audioElements.forEach((audio) => {
      if (audio._autoPlayHandler) {
        audio.removeEventListener("ended", audio._autoPlayHandler);
        delete audio._autoPlayHandler;
      }
    });
    audioElements = [];
    observers.forEach((obs) => obs.disconnect());
    observers = [];
  }
})();

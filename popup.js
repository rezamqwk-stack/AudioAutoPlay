const toggleBtn = document.getElementById("toggleBtn");
const status = document.getElementById("status");
const audioCount = document.getElementById("audioCount");

// Load saved state
chrome.storage.local.get(["autoPlayEnabled"], (result) => {
  const isEnabled = result.autoPlayEnabled || false;
  toggleBtn.checked = isEnabled;
  updateStatus(isEnabled);
});

// Get audio count from active tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0]) return;
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      func: () => document.querySelectorAll("audio").length,
    },
    (results) => {
      if (results && results[0]) {
        const count = results[0].result;
        audioCount.textContent = `${count} فایل صوتی در صفحه`;
      }
    }
  );
});

toggleBtn.addEventListener("change", () => {
  const isEnabled = toggleBtn.checked;
  chrome.storage.local.set({ autoPlayEnabled: isEnabled });
  updateStatus(isEnabled);

  // Send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "toggle",
      enabled: isEnabled,
    });
  });
});

function updateStatus(isEnabled) {
  status.textContent = isEnabled ? "فعال - پخش خودکار روشن است" : "غیرفعال";
  status.style.color = isEnabled ? "#e94560" : "#aaa";
}

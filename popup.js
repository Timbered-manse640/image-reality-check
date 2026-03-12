// Popup script: auto-detect toggle
const toggle = document.getElementById('autoDetectToggle');

// Load saved state (default: ON)
chrome.storage.sync.get({ autoDetect: true }, (data) => {
  toggle.checked = data.autoDetect;
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ autoDetect: enabled });

  // Notify active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: enabled ? 'RC_START_AUTO_SCAN' : 'RC_STOP_AUTO_SCAN'
      }).catch(() => {});
    }
  });
});

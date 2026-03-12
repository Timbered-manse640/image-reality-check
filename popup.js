// Popup script: settings toggles
const autoToggle = document.getElementById('autoDetectToggle');
const faceOnlyToggle = document.getElementById('faceOnlyToggle');

// Load saved state (defaults: autoDetect ON, faceOnly ON)
chrome.storage.sync.get({ autoDetect: true, faceOnly: true }, (data) => {
  autoToggle.checked = data.autoDetect;
  faceOnlyToggle.checked = data.faceOnly;
});

autoToggle.addEventListener('change', () => {
  const enabled = autoToggle.checked;
  chrome.storage.sync.set({ autoDetect: enabled });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: enabled ? 'RC_START_AUTO_SCAN' : 'RC_STOP_AUTO_SCAN'
      }).catch(() => {});
    }
  });
});

faceOnlyToggle.addEventListener('change', () => {
  const enabled = faceOnlyToggle.checked;
  chrome.storage.sync.set({ faceOnly: enabled });
  // Notify active tab to update setting
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'RC_UPDATE_FACE_ONLY', faceOnly: enabled
      }).catch(() => {});
    }
  });
});

// Service worker: context menu + message routing

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'check-image-reality',
    title: '图片打假',
    contexts: ['image']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'check-image-reality' && info.srcUrl) {
    // Store the image URL and open popup-like analyzer page
    chrome.storage.local.set({ pendingImageUrl: info.srcUrl }, () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (imageUrl) => {
          // Send message to content script to open analyzer
          window.postMessage({ type: 'REALITY_CHECK_OPEN', imageUrl }, '*');
        },
        args: [info.srcUrl]
      });
    });
  }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_PENDING_IMAGE') {
    chrome.storage.local.get('pendingImageUrl', (data) => {
      sendResponse({ imageUrl: data.pendingImageUrl });
    });
    return true;
  }

  if (message.type === 'RC_START_AUTO_SCAN' || message.type === 'RC_STOP_AUTO_SCAN') {
    // Forward to active tab's content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, message).catch(() => {});
      }
    });
  }
});

let setDomain = ({ tab, search = false }) => {
  let url = tab.url;
  let host = new URL(url).origin;
  chrome.tabs.sendMessage(tab.id, {
    type: "setDomain",
    url,
    host,
    search,
  });
};

chrome.contextMenus.create({
  id: "ovalEdgeSelectionMenu",
  title: "Search Widget for ...",
  contexts: ["all"],
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    setDomain({ tab: tabs[0] });
  });
});

chrome.contextMenus.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    setDomain({ tab: tabs[0], search: true });
  });
});

chrome.runtime.onMessage.addListener((messageObj) => {
  let { message = "", type, isRightClick = false } = messageObj;
  if (type === "selectedText") {
    chrome.contextMenus.update("ovalEdgeSelectionMenu", {
      title: `Search Widget for ${
        message && !isRightClick ? `"${message}"` : `...`
      }`,
    });
  }
});

chrome.storage.sync.get(['theme'], (data) => {
  const theme = data.theme || 'default';
  document.body.style.backgroundColor = theme;
});
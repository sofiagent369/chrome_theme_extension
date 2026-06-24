document.getElementById('changeThemeButton').addEventListener('click', () => {
  const theme = document.getElementById('themeSelector').value;
  
  // Guardar el tema en almacenamiento local de Chrome
  chrome.storage.sync.set({ theme }, () => {
    console.log(`Tema ${theme} guardado y aplicado.`);
    
    // Notificar al content script que se ha cambiado el tema
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          chrome.storage.sync.get(['theme'], (data) => {
            const theme = data.theme || 'default';
            document.body.style.backgroundColor = theme;
          });
        }
      });
    });
  });
});
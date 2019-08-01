// alert("Hello from your Chrome extension!");
let closeButtonIntervalId;

window.onload = () => {
  console.log('window has loaded ...');
  
  const iframe = document.getElementById('iframeplayer');
  if (iframe) {
    const contentDocument = iframe.contentDocument;
    
    const adblock = contentDocument.querySelector('div.vb_smoke-base.vb_smoke-visible');
    adblock.style.display = 'none';
  }
  
  if (window.location.host === 'www.wsj.com' && window.location.search !== '?mod=rsswn') {
    window.location.search = 'mod=rsswn';
  }

  if (window.location.host === 'www.wsj.com') {
    closeButtonIntervalId = setInterval(toggleCloseButton, 2000);
  } 
}

toggleCloseButton = () => {
  const closeButton = document.querySelector('.close-btn');
  
  if (closeButton) {
    closeButton.click();
    clearInterval(closeButtonIntervalId);
  }
};

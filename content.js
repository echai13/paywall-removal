// alert("Hello from your Chrome extension!");
let closeButtonIntervalId;

const MAX_TIMES_INTERVAL = 10;
const INTERVAL_MILLISECONDS = 1000;

const selectors = {
  MEDIUM: {
    SMALL_POPUP: 'button.bb',
    LARGE_POPUP: 'body > div:last-child > div > div > div > div:first-child button',
  },
  WSJ: {
    POPUP: '.close-btn',
  },
  ICDRAMA: {
    POPUP: 'div.vb_smoke-base.vb_smoke-visible',
  }
};

window.onload = () => {
  console.log('Window has loaded ...');
  
  // icdrama
  checkIframeForIcdrama();

  // wall street journal
  checkQueryForWsj();

  // close popup using css
  setIntervalForClosingPopup();
};

checkIframeForIcdrama = () => {
  const iframe = document.getElementById('iframeplayer');

  if (iframe) {
    const contentDocument = iframe.contentDocument;
    
    const adblock = contentDocument.querySelector(selectors.ICDRAMA.POPUP);
    adblock.style.display = 'none';
  }
};

checkQueryForWsj = () => {
  if (window.location.host === 'www.wsj.com' && window.location.search !== '?mod=rsswn') {
    window.location.search = 'mod=rsswn';
  }
};

setIntervalForClosingPopup = () => {
  if (window.location.host === 'www.wsj.com') {
    closeButtonIntervalId = setInterval(() => {
      let timesOfInterval = 0;

      handleClose(selectors.WSJ.POPUP, timesOfInterval);
    }, INTERVAL_MILLISECONDS);
  } 

  if (window.location.host.includes('medium.com')) {
    closeButtonIntervalId = setInterval(() => {
      let smallPopupTimesOfInterval = 0;
      let largePopupTimesOfInterval = 0;

      handleClose(selectors.MEDIUM.SMALL_POPUP, smallPopupTimesOfInterval);
      handleClose(selectors.MEDIUM.LARGE_POPUP, largePopupTimesOfInterval);
    }, INTERVAL_MILLISECONDS);
  }
};

// handler for closing sign up wall
handleClose = (selector, timesOfInterval) => {
  const element = document.querySelector(selector);

  timesOfInterval++;

  if (element) {
    element.click();
    clearInterval(closeButtonIntervalId);
  }

  if (timesOfInterval > MAX_TIMES_INTERVAL) {
    clearInterval(closeButtonIntervalId);
  }
};

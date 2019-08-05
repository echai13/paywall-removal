const domainsForClearingCookie = [
  'medium.com',
];

chrome.webRequest.onCompleted.addListener(function(details) {
  domainsForClearingCookie.forEach(domain => {
    if (details.url.indexOf(domain)) {
      chrome.cookies.getAll({ domain }, (cookies) => {
        for (let c = 0; c < cookies.length; c++) {
          const protocol = cookies[c].secure ? 'https://' : 'http://';
          const { domain, path, name } = cookies[c] || {};

          const url = `${protocol}${domain}${path}`;

          chrome.cookies.remove({ url, name });
        }
      });
    }
  })
}, {
  urls: ["<all_urls>"]
});

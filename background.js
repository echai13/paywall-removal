const domainsForClearingCookie = [
  'medium.com',
];

const HTTPS = 'https://';
const HTTP = 'http://';

chrome.webRequest.onCompleted.addListener(function(details) {
  domainsForClearingCookie.forEach(domain => {
    if (details.url.indexOf(domain)) {
      chrome.cookies.getAll({ domain }, (cookies) => {
        
        cookies.forEach(cookie => {
          const protocol = cookie.secure ? HTTPS : HTTP;
          const { domain, path, name } = cookie;

          const url = `${protocol}${domain}${path}`;

          chrome.cookies.remove({ url, name });
        });
        
      });
    }
  })
}, {
  urls: ["<all_urls>"]
});

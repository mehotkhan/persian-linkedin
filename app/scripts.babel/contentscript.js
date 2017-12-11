'use strict';

// WebExtensions compatibilty
// See here: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Chrome_incompatibilities
if (!chrome) {
  const chrome = browser;
}

chrome.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    return;
  }
  if (!request.changeFont) {
    return;
  }

  const bodyElement = document.querySelector('body');
  const postElement = document.querySelector('.feed-base-update__description');
  const fixedFontSizeStatus = request.changeFont.fixedFontSize;
  const fontName = request.changeFont.font;
  if (fixedFontSizeStatus !== 0 && !bodyElement.classList.contains('persian-linkedin-fixed-font-size')) {
    bodyElement.classList.add('persian-linkedin-fixed-font-size');
  }
  if (fixedFontSizeStatus === 0 && bodyElement.classList.contains('persian-linkedin-fixed-font-size')) {
    bodyElement.classList.remove('persian-linkedin-fixed-font-size');
  }
  const newClassName = `persian-linkedin-${fontName}`;
  if (bodyElement.classList.contains(newClassName)) {
    return;
  }
  for (const className of bodyElement.classList) {
    if (className.startsWith('persian-linkedin') && className !== 'persian-linkedin-fixed-font-size') {
      bodyElement.classList.remove(className);
    }
  }
  bodyElement.classList.add(newClassName);

  postElement.classList.add('test')

});
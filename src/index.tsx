import _merge from 'lodash/merge';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { IntlProvider } from 'react-intl';
import English from './languages/en.json';
import Spanish from './languages/es.json';
// const myproject=require('/Users/harsh.goyal/Desktop/convert/spr-messenger-client-vite/packages/rest-client/src/index.js');
// import {makePostRequest} from 'packages/rest-client/src/index.js';
// import _reduce from 'lodash/reduce';

// import _split from 'lodash/split';

// import _isEmpty from 'lodash/isEmpty';

// import _isArray from 'lodash/isArray';

// import _startsWith from 'lodash/startsWith';

// import _forEach from 'lodash/forEach';

 
// console.log(window.parent);
// export function getParentWindow() {

//  console.log(window.parent);

// }
// makePostRequest();
let lang;
const local=navigator.language;
if(local==='en-US')
{
  lang=English;
}
else{
  lang=Spanish;
}
const rootElement = document.getElementById('root');
export const loadApps = () => {
 
// getParentWindow();
// const stringifiedQuery =

//     getParentWindow()?.location?.search?.substring(1) || getParentWindow()?.location?.hash?.split('?')?.[1];
// console.log(stringifiedQuery);
//   if (_isEmpty(stringifiedQuery)) {

//     return {};

//   }

  // const div = document.createElement('div');
  ReactDOM.render(
<IntlProvider locale={local} messages={lang}>
  <App />
  </IntlProvider>,
  //div
    rootElement
);
};

/*
 This is done to avoid the possibility of getting body as null in createWidgetRootContainer
  of packages/web/src/proactive-prompt-app/index.tsx.
  Fetching the above scripts when the document is ready will make sure that document.body is always
  available.
 */
if (document.readyState !== 'loading') {
loadApps();
  
} else {
  document.addEventListener('DOMContentLoaded', loadApps);
}

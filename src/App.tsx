import React, {Suspense} from "react";
// import Chatbox from "./components/Chatbox/Chatbox";
// import Dates from "./components/Dates/Dates";
import { FormattedMessage } from 'react-intl';
import { loadable } from './loadable';
const Dates = loadable(() =>
  import(/* webpackChunkName: "Dates" */'./components/Dates/Dates')
);
const Chatbox = loadable(() =>
  import(/* webpackChunkName: "Chatbox" */'./components/Chatbox/Chatbox')
);
// import { Button } from 'antd';
const App: React.FC = () => {
  return (
    
    <div>
      {/* <Button type="primary">Button</Button> */}
      {/* <div css={{ color: 'red' }}>Just facing typescript compilation error otherwise it's working fine!!</div> */}
      <Suspense fallback={<div><FormattedMessage id="loading" defaultMessage="loading..." /></div>}>
      <Dates/>
      </Suspense>
  <Suspense fallback={<div><FormattedMessage id="loading" defaultMessage="loading..." /></div>}>
      <Chatbox />
      </Suspense>

    </div>
  );
};

export default App;

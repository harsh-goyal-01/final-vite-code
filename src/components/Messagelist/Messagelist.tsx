import React, { Suspense, useState } from 'react';
import { StyledDiv } from './MessageStyles';
import { loadable } from '../../loadable';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/core';
import _map from 'lodash/map';
// import Form from '../Form/Form';
const Form = loadable(() => import(/* webpackChunkName: "Form" */'../Form/Form'));

const Messagelist: React.FC = () => {
  const DummyList: string[] = [];
  const [messageList, updateMessageList] = useState<string[]>(DummyList);

  const addMessage = (message: string) => {
    updateMessageList([...messageList, message]);
  };
  

  return (
    <>
    <div id='scroll' css={{overflow: 'scroll', height:'calc(100% - 30px)'}}>
      {_map(messageList,function (m,index) { 
          return (
            <StyledDiv key={index}>
              {m}
            </StyledDiv>
          );
        })}
    </div>
    <div>
      <div css={{height: '30px'}}></div>
  <Suspense fallback={<div><FormattedMessage id="loading" defaultMessage="loading..." /></div>}>
    <Form addMessageHandler={addMessage} />
  </Suspense>
  </div>
  </>
  );
};

export default Messagelist;

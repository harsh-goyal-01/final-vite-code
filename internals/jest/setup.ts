/* eslint-disable no-undef */
// @ts-ignore
import App from '@sprinklr/chat-types';
import '@testing-library/jest-dom/extend-expect';
import '../../../../internals/jest/setupAfterEnv';

declare const window: Window & {
  sprChatSettings: App.ChatSettings;
  sprChat: () => void;
};

const mockSprChat = jest.fn();

window.sprChatSettings = {
  appId: 'app_123',
};

window.sprChat = mockSprChat;

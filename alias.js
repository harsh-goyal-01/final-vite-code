/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  '@': path.resolve(__dirname, 'src/'),
  '@chat-app': path.resolve(__dirname, 'src/chat-app/'),
  '@teams-app': path.resolve(__dirname, 'src/teams-app/'),
  '@proactive-prompt-app': path.resolve(__dirname, 'src/proactive-prompt-app/'),
  '@utils': path.resolve(__dirname, 'src/utils/'),
  '@locales': path.resolve(__dirname, 'src/locales/'),
  '@sdk': path.resolve(__dirname, 'src/sdk/'),
  '@typings': path.resolve(__dirname, 'src/typings/'),
  '@hooks': path.resolve(__dirname, 'src/hooks/'),
  '@stream-app': path.resolve(__dirname, 'src/stream-app/'),
};

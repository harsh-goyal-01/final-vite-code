import shortid from 'shortid';

import _stubTrue from 'lodash/stubTrue';
import prepare from './prepare';
import compress from '../compress';
import upload from '../upload';
import postUpload from './postUpload';

import { BUILD_DIR, COMPRESSED_BUILD_DIR } from './constants';

export default async function page() {
  const version = shortid.generate();
  import.meta.env.VITE_VERSION = version;
  process.env.PUBLIC_URL = process.env.PUBLIC_URL.replace(/([^/]*)$/, version);
  await prepare();
  await compress(BUILD_DIR, COMPRESSED_BUILD_DIR);
  const pageUrl = await upload({
    dirToUpload: COMPRESSED_BUILD_DIR,
    uploadUrl: `chat/page/${import.meta.env.VITE_VERSION}`,
    shouldCacheFile: _stubTrue,
    compression: true,
  });
  postUpload(pageUrl);
}
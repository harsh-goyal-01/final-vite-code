import path from 'path';

const CWD = process.cwd();

const RELATIVE_STATIC_PATH = 'static';
export const BUILD_DIR = path.resolve(CWD, 'build');
export const BUILD_STATIC_DIR = path.resolve(BUILD_DIR, RELATIVE_STATIC_PATH);
export const PAGE_DIR = path.resolve(CWD, 'src/chat-app/build/page');
export const COMPRESSED_BUILD_DIR = path.resolve(BUILD_DIR, 'compressed');

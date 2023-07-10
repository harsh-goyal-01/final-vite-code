import path from 'path';

const CWD = process.cwd();

export default {
  BUILD_DIR: path.resolve(CWD, 'build'),
  MODERN_BUILD_DIR: path.resolve(CWD, 'modern-build'),
  WIDGET_DIR: path.resolve(CWD, 'src/chat-app/build/widget'),
  BASE_URL: `http://${process.env.HOST_NAME}-restricted.sprinklr.com/restricted/v1`,
  get BUILD_STATIC_DIR() {
    return path.resolve(this.BUILD_DIR, 'static');
  },
  get MODERN_BUILD_JS_BUNDLE_DIR() {
    return path.resolve(this.MODERN_BUILD_DIR, 'static/js');
  },
  get COMPRESSED_BUILD_DIR() {
    return  path.resolve(this.BUILD_DIR, 'compressed');
  },
  get BUILD_VERSION_DIR() {
    return path.resolve(this.BUILD_DIR, `${process.env.VITE_VERSION}/static`)
  },
  get JS_BUILD_DIR() {
    return path.resolve(this.BUILD_DIR, `${process.env.VITE_VERSION}/static/js`)
  },
  BUILD_INFO: path.join(process.cwd(), 'buildInfo.txt'),
}

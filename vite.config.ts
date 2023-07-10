import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import macrosPlugin from "vite-plugin-babel-macros";
import { splitVendorChunkPlugin } from 'vite';
import svgr from "vite-plugin-svgr";
// import commonjs from 'vite-plugin-commonjs'
import vitePluginRequire from "vite-plugin-require";

// import alias from './alias';
const alias = require('./alias');
export default defineConfig({
  resolve: {
    alias,
  },
  optimizeDeps: {
    exclude:['fs'],
  },
  // server: { 
  //   fs: {
  //     strict: false, 
  //   },   
  // },
  build: {
    outDir: 'build',
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 100000,
        }
      }
    },
  
  plugins: [splitVendorChunkPlugin(),react({
    babel: {
      "presets": ["@emotion/babel-preset-css-prop"],
      "plugins": [
        [
          "react-intl-auto"
        ],
        [
            "react-intl", {
            "messagesDir": "./messages/"
        }],
        ["lodash"]   
      ]
    }
  }),
  vitePluginRequire(),
  svgr(),
    legacy(),
  macrosPlugin()]
})

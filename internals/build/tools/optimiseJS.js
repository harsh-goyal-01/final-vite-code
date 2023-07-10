import Terser from "terser";

export default function optimiseJSCode(code) {
  return Terser.minify(code, { toplevel: true }).code;
}
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

module.exports = {
  input: 'src/index.ts',
  output: {
    name: 'hukk',
    file: pkg.main,
    format: 'cjs',
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json"
    }),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
  ],
};

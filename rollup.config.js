import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json'

module.exports = {
  input: 'src/index.js',
  output: {
    name: 'hukk',
    file: pkg.main,
    format: 'cjs'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]
}


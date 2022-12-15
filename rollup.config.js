import image from '@rollup/plugin-image';

export default {
  input: 'src/dan-its-lit.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [image()]
};
import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

const directory = 'node_modules/@aemforms/af-formatters';

export default {
  input: {
    'afb-formatters': path.join(directory, 'esm/afb-formatters.js'),
  },
  plugins: [
    cleanup({
      comments: 'none',
    }),
    license({
      banner: {
        content: {
          file: path.join(directory, 'LICENSE'),
          encoding: 'utf-8',
        },
      },
    }),
  ],
  output: [{
    dir: 'src/rules/model',
    format: 'es',
    entryFileNames: 'afb-formatters.js',
  },
  {
    dir: 'src/rules/model',
    format: 'es',
    entryFileNames: 'afb-formatters.min.js',
    plugins: [terser()],
  }],
};

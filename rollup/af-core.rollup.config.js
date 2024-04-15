import path from 'path';
import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';

const directory = 'node_modules/@aemforms/af-core';
export default {
  external: ['@adobe/json-formula', '@aemforms/af-formatters'],
  input: {
    runtime: path.join(directory, 'esm/afb-runtime.js'),
    events: path.join(directory, 'esm/afb-events.js'),
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
    entryFileNames: 'afb-[name].js',
    paths: {
      '@adobe/json-formula': '../formula/index.js',
      '@aemforms/af-formatters': './afb-formatters.min.js',
    },
  },
  {
    dir: 'src/rules/model',
    format: 'es',
    entryFileNames: 'afb-[name].min.js',
    paths: {
      '@adobe/json-formula': '../formula/index.min.js',
      '@aemforms/af-formatters': './afb-formatters.min.js',
    },
    plugins: [terser()],
  }],
};

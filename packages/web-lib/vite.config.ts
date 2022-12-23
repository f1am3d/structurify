import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import wasmPlugin from 'vite-plugin-wasm';
import dtsPlugin from 'vite-plugin-dts';


module.exports = defineConfig(({ command, mode, ssrBuild }) => {
  const sharedConfig: UserConfig = {
    base: './',
    resolve: {
      alias: {
          'f1am3d-structurify-core': '../wasm-lib/pkg'
      }
    },
    build: {
      target: 'esnext',
      lib: {
        entry: path.resolve(__dirname, "src/main.ts"),
        name: 'index',
        formats: ["es"]
      },
    },
    plugins: [
      dtsPlugin({
        insertTypesEntry: true,
      }),
      wasmPlugin()
    ],
  };

  switch (command) {
    case 'build':
      return {
        ...sharedConfig,
        mode: 'production'
      };

    default:
      return {
        ...sharedConfig,
        mode: 'development'
      }
  }

});

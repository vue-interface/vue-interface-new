import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  // Required
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.app.json',
      },
    },
  },
  stories: ['../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Optional
  addons: ['@storybook/addon-docs'],
  docs: {
    // autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Ensure JSX plugin is configured
    const vueJsx = (await import('@vitejs/plugin-vue-jsx')).default
    
    config.plugins = config.plugins || []
    config.plugins.push(vueJsx({
      include: /\.(jsx|tsx)$/
    }))
    
    config.esbuild = {
      ...config.esbuild,
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import { h, Fragment } from 'vue'`
    }
    return config
  },
  // staticDirs: ['../public'],
};
 
export default config;

// import tailwindcss from '@tailwindcss/postcss';
// import autoprefixer from 'autoprefixer';
// import { dirname, join, resolve } from "path";

// /**
// * This function is used to resolve the absolute path of a package.
// * It is needed in projects that use Yarn PnP or are set up within a monorepo.
// */
// function getAbsolutePath(value) {
//   return dirname(resolve(join(value, 'package.json')))
// }

// /** @type { import('@storybook/html-vite').StorybookConfig } */
// const config = {
//   "stories": [
//     "../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)"
//   ],
//   "addons": [
//     getAbsolutePath('@storybook/addon-docs'),
//     getAbsolutePath('@storybook/addon-themes')
//   ],
//   "framework": {
//     "name": getAbsolutePath('@storybook/html-vite'),
//     "options": {}
//   },
//   viteFinal: async (config) => {
//     config.css = config.css || {};
//     config.css.postcss = {
//       plugins: [
//         tailwindcss(), 
//         autoprefixer()
//       ],
//     };
//     return config;
//   }
// };
// export default config;
import { defineConfig } from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginSass } from "@rsbuild/plugin-sass"

export default defineConfig({
	output: {
		distPath: '../thawth.me-rs/serve',
	},
  html: {
    template: './src/template.html',
    title: 'thawth.me',
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'automatic',
        importSource: '@bsgbryan/rnzlr',
      },
    }),
    pluginSass()
  ],
})

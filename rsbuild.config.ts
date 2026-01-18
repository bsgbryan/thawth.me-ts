import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig({
	output: {
		distPath: "../thawth.me-rs/serve",
	},
	html: {
		template: "./static/template.html",
		title: "thawth.me",
		tags: [
			{
				tag: "script",
				append: false,
				attrs: {
					defer: true,
					crossorigin: true,
					src: "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js",
				},
			},
		],
	},
	plugins: [
		pluginReact({
			swcReactOptions: {
				runtime: "automatic",
				importSource: "@bsgbryan/rnzlr",
			},
		}),
		pluginSass(),
	],
});

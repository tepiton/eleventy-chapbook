import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy"
import pluginNavigation from "@11ty/eleventy-navigation"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"
import markdownIt from "markdown-it"

import pluginFilters from "./_config/filters.js"

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft) {
			data.title = `${data.title} (draft)`
		}

		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false
		}
	})

	// Copy the contents of the `public` folder to the output folder
	eleventyConfig.addPassthroughCopy({
		"./public/": "/"
	})

	// Watch CSS and image files
	eleventyConfig.addWatchTarget("css/**/*.css")
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}")

	// Per-page bundles
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		bundleHtmlContentFromSelector: "style",
	})

	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
		bundleHtmlContentFromSelector: "script",
	})

	// Markdown-it config
	const md = markdownIt({
		html: true,
		breaks: false,
		linkify: true,
		typographer: true,
	}).disable("code")

	eleventyConfig.setLibrary("md", md)

	// Chapters collection sorted ascending by `order` front matter
	eleventyConfig.addCollection("chapters", function(collectionApi) {
		return collectionApi.getFilteredByTag("chapters").sort((a, b) => {
			const aOrder = a.data.order ?? 999
			const bOrder = b.data.order ?? 999
			return aOrder - bOrder
		})
	})

	// Plugins
	eleventyConfig.addPlugin(pluginNavigation)
	eleventyConfig.addPlugin(HtmlBasePlugin)
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["avif", "webp", "auto"],
		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			}
		},
		sharpOptions: {
			animated: true,
		},
	})

	eleventyConfig.addPlugin(pluginFilters)

	eleventyConfig.addPlugin(IdAttributePlugin)

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString()
	})

	eleventyConfig.setServerOptions({
		showAllHosts: true,
		port: 8082,
	})
}

export const config = {
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",

	dir: {
		input: "content",
		includes: "../_includes",
		data: "../_data",
		output: "_site"
	},
}

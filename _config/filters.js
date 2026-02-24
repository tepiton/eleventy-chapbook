export default function(eleventyConfig) {
	// ISO date string for sitemap and other templates (replaces luxon htmlDateString)
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		if (!dateObj) return ""
		return new Date(dateObj).toISOString().split("T")[0]
	})

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return []
		}
		if( n < 0 ) {
			return array.slice(n)
		}
		return array.slice(0, n)
	})

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers)
	})

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target)
	})
}

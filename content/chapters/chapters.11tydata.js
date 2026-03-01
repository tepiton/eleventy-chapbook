export default {
  layout: "layouts/chapter.njk",
  eleventyComputed: {
    chapterNumber: data => data.order
  }
}

export default {
  tags: ["chapters"],
  layout: "layouts/chapter.njk",
  eleventyComputed: {
    chapterNumber: data => data.order
  }
}

/**
 * This is the 11ty config! If you ever need to get underneath the hood of 11ty
 * to add functionality or to sort your collections, this would be the place to
 * do it! 
 * (https://www.11ty.dev/docs/config/)
 */

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
const CleanCSS = require("clean-css");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const now = Date.now();


module.exports = function(eleventyConfig) {
		// Copy `img` and `css` folders to output
		eleventyConfig.addPassthroughCopy("img");
		eleventyConfig.addPassthroughCopy("js");

		//convert images to webp, use lazy loading
		eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
			widths: [100, "auto"], 
			defaultAttributes: {
			  loading: 'lazy'
			}	
		});

		//minify css
		  eleventyConfig.addFilter("cssmin", function (code) {
			return new CleanCSS({}).minify(code).styles;
		  });

		// creates a mechanism to filter items and collections out of a spoofed "All" collection
		eleventyConfig.addCollection("filteredAll", function(collectionApi) {
			return collectionApi.getAll().filter(item => {
			return !item.data.isSecretCollection;
			});
		});
		eleventyConfig.addPlugin(pluginRss);

		// Creates filter utcDate to present dates in UTC instead of converting to local time
		eleventyConfig.addLiquidFilter("utcDate", function(value) { 
			const utc= (new Date(value)).toUTCString().split(' ');
			return `${utc[2]} ${utc[1]}, ${utc[3]}`;
		});

		// Creates the filter toISOString to convert post dates to YYYY-MM-DD format for sitemap
		eleventyConfig.addFilter("toISOString", function(value) { 
			const dateObj = new Date(value);
			const ISOString = dateObj.toISOString().split('T')[0];
			return ISOString;
		});

       //Creates custom "chapter" collection type, defines process for reprocessing names into Chapter X format
		eleventyConfig.addAsyncFilter("chapters", async function(collections) { 
			return Object.keys(collections).filter(function (propertyName) {
				if (propertyName.indexOf("chapter") === 0){
					return propertyName;
				}
			});
		});	

		//Creates draft posts and excludes them from buld
		eleventyConfig.addPreprocessor("drafts", "njk,md,liquid", (data, content) => {
			if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
				return false;
			}
			else if(Date(data.date) > now && process.env.ELEVENTY_RUN_MODE === "build") {
				return false;
			}
		});
		eleventyConfig.addPreprocessor()


}











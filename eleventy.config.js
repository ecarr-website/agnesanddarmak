/**
 * This is the 11ty config! If you ever need to get underneath the hood of 11ty
 * to add functionality or to sort your collections, this would be the place to
 * do it! 
 * (https://www.11ty.dev/docs/config/)
 */

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */

const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss");


module.exports = function(eleventyConfig) {
		// Copy `js` and `css` folders to output
		eleventyConfig.addPassthroughCopy("css");
		eleventyConfig.addPassthroughCopy("js");
		eleventyConfig.addPassthroughCopy("robots.txt");

		//Converts images to webp or jpeg to reduce page load times
		eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
			widths: [100, "auto"], 
			formats: ["webp","jpeg"],
			defaultAttributes: {
			  loading: 'lazy'
			}	
		});
		eleventyConfig.addPassthroughCopy("img");

		// creates a mechanism to filter items and collections out of a spoofed "All" collection
		eleventyConfig.addCollection("filteredAll", function(collectionApi) {
			return collectionApi.getAll().filter(item => {
			return !item.data.isSecretCollection;
			});
		});

		//Plugin to manage RSS feed
		eleventyConfig.addPlugin(pluginRss);

		//minifies CSS files to reduce page load times
		eleventyConfig.addPlugin(lightningCSS);

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


}











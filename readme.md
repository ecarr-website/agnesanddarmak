# lief's eleventy-webcomic

I'm lief and I'm a comic artist by night, software QA and SEO analyst by day! This repository is my adaptation of [Katedee's Eleventy-webcomic](https://github.com/katedee/eleventy-webcomic), which is a template, built off of the Rashon's [eleventy-rarebit](https://github.com/the-rashons/eleventy-rarebit-template), which itself is built to replicate the functionality found in [geno7's](https://geno7.neocities.org/) [Rarebit](https://rarebit.neocities.org/) webcomic template.

I'm keeping this repository public so my good friends in the [Comix Accountability Club](https://comixaccountability.club) can use my work to make their own websites. I've made a few changes to Katedees work to fit the specific use case of myself and my friends, as follows:  
- Added a gallery - based on https://www.geeksforgeeks.org/javascript/how-to-create-responsive-modal-images-using-css-javascript/.
- minor layout changes to the comic pages
- added support for post scheduling - just set the date of your page.md file to the date you want the post to go live, and when the job runs that day it will publish that page - otherwise, the post won't be included in the site build. (thanks to [localghost.dev](https://localghost.dev/blog/how-to-schedule-posts-in-eleventy/) for the code for this bit!)
- SEO updates
- added XML sitemap


## Features (This text is cloned from katedee's readme) 

- **Mostly Static**: Built from [Liquid](https://www.11ty.dev/docs/languages/liquid/) templates, pages core functions no longer require JavaScript. ([Why does this matter?](https://adamsilver.io/blog/javascript-isnt-always-available-and-its-not-the-users-fault/)). There are some "additional" features (comments, navigating with keyboard arrow keys, archive drop down selection) which require javascript, but the core reading experience functions just fine!

- **Drag and Drop**: No more fiddling with JavaScript to add updates; comic pages can be added with [Markdown](https://www.11ty.dev/docs/languages/markdown/) through custom [front matter](https://www.11ty.dev/docs/data-frontmatter/).

- **Beginner Friendly**: eleventy-rarebit-template maintains the same philosophy as Rarebit to be as beginner friendly as possible. Files are commented extensively with constant references to the Eleventy Docs and other relevant documentation. In addition, I'm working on a setup tutorial [over here](https://webcomics.fyi/templates/my-template.html).

- **RSS Feed**: An RSS feed of your comic is automatically generated after some very slight setup. I've added this because people still frequently use them (especially for webcomics), and some webrings require you to have one in order to be listed with them.

- **more “neutral” default styling** (mostly done for my site, but why not 🤷‍♀️)

- **revamp of the archive.** It is explicitly divided by chapters, and only shows one image per chapter (and using 11ty img to output it at a smaller size). Additionally, there's a dropdown selection to go to a page for chapter

- **added explicit date setting in the post**, in case folks copy a file to make a new page, using the github repo as a pseudo-CMS.

- **ability to add comments**, leveraging google forms (big shout to the jekyll guy). We've even got emojis! 💅

- **added back arrowkey navigation**, because folks seem really set on it

## Deployment

### Netlify
1. Make sure you have a Github account setup first.

2. Click this button: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/houseoflief/liefs-webcomic)


### Neocities

1. [Create a new GitHub repository from this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template)
2. From your [account settings](https://neocities.org/settings) in Neocities, generate an API key for your site by clicking **Manage Site Settings (of target site) > API > Generate API Key**
3. [Add the API key as an action secret to your repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) with the name `NEOCITIES_API_TOKEN`
4. Download [GitHub Desktop](https://desktop.github.com/) and [clone the repository to your computer](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop#cloning-a-repository)
5. Open the cloned repository in a [terminal window](https://www.11ty.dev/docs/terminal-window/) and, [assuming Node.JS is installed](https://nodejs.org/), type `npm install`
6. In the same terminal, start a local webserver by entering `npm start`

You now have a hot-reloading preview of your website! Go ahead and start tailoring the template for your comic. When you're ready to publish, just [commit](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop) and [push]() your changes in GitHub Desktop; your site should update on Neocities shortly afterwards!

## Usage & Eleventy
> **If you're new to Eleventy, make sure you go over its [Getting Started](https://www.11ty.dev/docs/getting-started/) guide.**

Comic pages can be stored in any subfolder within your Eleventy project's [input directory](https://www.11ty.dev/docs/config/#input-directory). You can specify their custom data - whether that be titles, images, or thumbnails -  through [template and directory data files](https://www.11ty.dev/docs/data-template-dir/) or [front matter data](https://www.11ty.dev/docs/data-frontmatter/).

```json
// Directory Data
{
  "tags": ["comic"],
  "thumb": "/img/thumbs/default.png",
  "layout": "layouts/strip.liquid"
}
```

```yaml
---
# Front Matter Data
title: The First Page Title
images: ['/img/comics/pg1.jpg']
alt: Here's some alt text!
thumb: '/img/thumbs/pg1.png'
tags:
  - chapter1
---
```

[Layouts](https://www.11ty.dev/docs/layouts/) can then be applied to define how the page and its data are rendered. 

```liquid
<!-- `strip.liquid` (Snippet) -->
<div class="comic">
  <h1>{{ title }}</h1>
  {% render 'comic.liquid', collection: collections.comic, page: page, images: images, alt: alt %}
</div>
```

Still curious? [Start exploring the template](https://github.com/covalria-sow/eleventy-rarebit-template/blob/master/index.liquid) or [see it working for yourself](https://dev.houseoflief.com)!


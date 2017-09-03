# Gutenbergerli

WordPress plugin which adds blocks to Gutenberg

A plugin based on [Gutenberg examples](https://github.com/WordPress/gutenberg-examples). 

## Blocks

Currently the only block is Gutenbergerli faq. To use, simply download and install this plugin.

### Gutenbergerli faq

This is a block which contains the question and answer as well as a field for users to upvote or downvote the entry on the frontend. 

![Screen shot of three Gutenbergerli blocks](https://github.com/tharsheblows/gutenbergerli/blob/master/screenshots/gutenbergerli-faq.png)

Use is, I hope, fairly self evident. In the Gutenberg editor, choose the Gutenbergerli faq block then put your question in the question field, your answer in the answer field and it's done. The up/downvote bit appears automatically and keeps track of clicks made on the front end in a postmeta entry with the meta key "helpfulness". The answer and voting bit are initially hidden on the front end; you initially see a list of questions on page load (unless javascript is disabled and then everything shows except voting won't work).

This is meant to be a demo of adding postmeta content to a post. The votes are stored in postmeta like this:

![Screen shot of helpfulness json](https://github.com/tharsheblows/gutenbergerli/blob/master/screenshots/gutenbergerli-faq-helpfulness-json.png)

but really you could use the same idea to put and get the data anywhere (eg like a custom table).

### Development

I've included the build.js so the plugin is good to go. For development: the blocks require building; to do this go to the directory of the block you want, run `npm install` then `npm run build` to build a production copy and `npm run dev` to keep a watch when you're developing.

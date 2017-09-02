// this sets and gets the data for the WasItHelpful component

// We need to get the post id because I took it out of the block id
// These need to be uniquely named?

const queryString = require('query-string');

/**
 * Returns the post id if it's there, otherwise is undefined
 *
 * @returns current post id or undefined
 */
function getPostId() {

	var postId;

	// do we already have it because it's been localised onto the page?
	if ( locPostId !== undefined ) {
		postId = mjjGutenbergerli.postId;
	} else {
		let parsedSearch = queryString.parse(window.location.search);
		postId = parsedSearch.post_id;
	}

	return post_id;

}

/*
 * @param   {String} clickVote      The data-vote of the click ("helpful" or "unhelpful")
 */
export function getHelpfulness() {

}
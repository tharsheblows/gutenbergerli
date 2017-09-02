// this sets and gets the data for the WasItHelpful component

// We need to get the post id because I took it out of the block id
// These need to be uniquely named?

const queryString = require('query-string');

/**
 * Returns the post id if it's there, otherwise is undefined
 *
 * @returns current post id or undefined
 */
export function getPostId() {

	var postId;

	// do we already have it because it's been localised onto the page?
	if ( typeof( mjjGutenbergerli.postId ) !== undefined && mjjGutenbergerli.postId !== null  ) {
		console.log( 'here' );
		postId = mjjGutenbergerli.postId;
	} else {
		let parsedSearch = queryString.parse(window.location.search);
		postId = parsedSearch.post_id;
	}

	return postId;

}

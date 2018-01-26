<?php

defined( 'ABSPATH' ) || exit;

add_action( 'enqueue_block_editor_assets', 'gutenbergerli_faq_enqueue_block_editor_assets' );

function gutenbergerli_faq_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'gutenbergerli_faq-editor',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'underscore', 'backbone' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
	);

	wp_enqueue_style(
		'gutenbergerli_faq-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);
}

add_action( 'enqueue_block_assets', 'gutenbergerli_faq_enqueue_block_assets' );

function gutenbergerli_faq_enqueue_block_assets() {

	// I'm going to get the post id
	global $post;

	$post_id = ! empty( $post->ID ) ? (int) $post->ID : ( ! empty( $_GET['post_id'] ) ? (int) $_GET['post_id'] : 0 );

	wp_enqueue_style(
		'gutenbergerli_faq',
		plugins_url( 'style.css', __FILE__ ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	wp_enqueue_script(
		'gutenbergerli_faq',
		plugins_url( 'gutenbergerli-faq.js', __FILE__ ),
		array( 'jquery','wp-api' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'gutenbergerli-faq.js' )
	);

	wp_localize_script(
		'gutenbergerli_faq',
		'mjjGutenbergerli',
		array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'postId' => $post_id,
			'helpfulnessNonce' => wp_create_nonce( 'helpfulness_nonce_' . $post->ID ),
		)
	);

}

add_action( 'wp_head', 'gutenbergerli_faq_head' );

// no script functions for the front end -- this causes all answers to show so you don't have to click on anything to see them
function gutenbergerli_faq_head() {
	echo '<noscript>';
	echo '<style> .wp-block-gutenbergerli-faq .answer{ display: block !important; } </style>';
	echo '</noscript>';
}

// OK now the meta metametameta. Let's register us a rest field baby
// WHY am I not using the REST API here? I can't get the permissions to work.
// In the REST API, to edit postmeta a user has to have the edit_post capability.
// I'm not giving them that capability and I can't quite find a way around it because of the way the checks are run.
// So admin-ajax it is.

add_action( 'wp_ajax_gutenbergerli_faq_helpfulness', 'gutenbergerli_faq_helpfulness' );
add_action( 'wp_ajax_nopriv_gutenbergerli_faq_helpfulness', 'gutenbergerli_faq_helpfulness' );


// This doesn't have any checks so it's possible to just sit there and run up the tallies. Which is kind of fun and fine for testing. This is not for production.
function gutenbergerli_faq_helpfulness() {

	$post_id = $_POST['postId'];
	$block_id = $_POST['blockId'];
	$helpfulness = $_POST['helpfulness'];
	$nonce = $_POST['nonce'];

	if ( ! wp_verify_nonce( $nonce, 'helpfulness_nonce_' . $post_id ) ) {
		echo json_encode( array( 'result' => 'fail', 'message' => 'Verification failed and the vote was not recorded.' ) );
		die();
	}

	$helpfulness_value = get_post_meta( (int) $post_id, 'helpfulness', true );
	$helpfulness_json = $helpfulness_value;

	$helpful_votes = ! empty( $helpfulness_json->$block_id || $helpfulness_json->$block_id->helpful ) ? $helpfulness_json->$block_id->helpful : 0;
	$unhelpful_votes = ! empty( $helpfulness_json->$block_id || $helpfulness_json->$block_id->unhelpful ) ? $helpfulness_json->$block_id->unhelpful : 0;

	if ( 'helpful' === $helpfulness ) {
		$helpfulness_json->$block_id->helpful = $helpful_votes + 1;
	} elseif ( 'unhelpful' === $helpfulness ) {
		$helpfulness_json->$block_id->unhelpful = $unhelpful_votes + 1;
	}

	$updated = empty( update_post_meta( (int) $post_id, 'helpfulness', $helpfulness_json ) ) ? 'fail' : 'succeed';

	echo json_encode( array( 'result' => $updated, 'helpfulnessJson' => $helpfulness_json ) );
	die();

}

// We can get the helpfulness meta via the rest api though
add_action( 'rest_api_init', function(){
	register_rest_field(
		'post',
		'helpfulness',
		array(
			'get_callback' => function( $object ) {
				return get_post_meta( $object['id'], 'helpfulness', true );
			},
			'update_callback' => null,
			'schema' => null,
		)
	);
} );


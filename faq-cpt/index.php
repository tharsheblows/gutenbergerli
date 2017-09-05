<?php

// Registers a FAQ cpt which will use Gutenberg
// in theory

function guet_faq_cpt() {

	register_post_type( 'guet_faq',
		array(
			'labels' => array(

				'name' => __( 'FAQs' ),
				'singular_name' => __( 'FAQ' ),
				'add_new' => 'Add New',
				'add_new_item' => 'Add New FAQ',
				'edit_item' => 'Edit FAQ',
				'new_item' => 'New FAQ',
			    'all_items' => 'All FAQs',
				'view_item' => 'View FAQs',
				'search_items' => 'Search FAQ',
				'not_found' => 'No FAQs found',
				'not_found_in_trash' => 'No FAQs found in Trash',
				'parent_item_colon' => '',
				'menu_name' => 'FAQs',
			),
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'comments', 'revisions' ), // needs to support revisions for Gutenberg
			'public' => true,
			'has_archive' => true,
			'rewrite' => array( 'slug' => 'faqs' ),
			'menu_position' => 5,
			'show_in_rest' => true, // need for Gutenberg

		)
	);
}
add_action( 'init', 'guet_faq_cpt' );

function guet_faq_editor_scripts_and_styles( $hook ) {

	// Set initial title to empty string for auto draft for duration of edit.
	$is_new_post = 'auto-draft' === $post_to_edit['status'];
	if ( $is_new_post ) {
		$default_title = apply_filters( 'default_title', 'Default faq title' );
		$post_to_edit['title'] = array(
			'raw'      => $default_title,
			'rendered' => apply_filters( 'the_title', $default_title, $post_id ),
		);
	}
	// Prepopulate with some test content in demo.
	if ( $is_new_post && $is_demo ) {
		wp_add_inline_script(
			'wp-editor',
			file_get_contents( gutenberg_dir_path() . 'post-content.js' )
		);
	}
}

// adds an "Add New (Gutenberg)" link which makes a new faq post in the Gutenberg editor
function guet_faq_cpt_guted() {
	add_submenu_page(
		'edit.php?post_type=guet_faq',
		'Add New (Gutenberg)',
		'Add New (Gutenberg)',
		'publish_posts',
		'edit.php?post_type=guet_faq&page=gutenberg'
	);
}
add_action( 'admin_menu', 'guet_faq_cpt_guted' );

function guet_faq_template_blocks() {
	wp_enqueue_script(
		'guet-faq-template-blocks',
		plugins_url( 'faq-template-editor.build.js', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'faq-template-editor.build.js' )
	);
}
add_action( 'enqueue_block_editor_assets', 'guet_faq_template_blocks' );




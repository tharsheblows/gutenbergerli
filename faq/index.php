<?php

defined( 'ABSPATH' ) || exit;

add_action( 'enqueue_block_editor_assets', 'gutenbergerli_faq_enqueue_block_editor_assets' );

function gutenbergerli_faq_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'gutenbergerli_faq',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'underscore' ),
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
	wp_enqueue_style(
		'gutenbergerli_faq',
		plugins_url( 'style.css', __FILE__ ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);
}

<?php
/**
 * Theme functions file
 *
 * Contains all of the Theme's setup functions, custom functions,
 * custom hooks and Theme settings.
 * 
 * @package    ThemeName
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/* Load the Hybrid Core framework and launch it. */
require_once( trailingslashit( get_template_directory() ) . 'hybrid/hybrid.php' );
new Hybrid();

/* Load theme-supports files. */
require_once( trailingslashit( get_template_directory() ) . 'inc/theme-supports.php' );

/* Load constants file. */
require_once( trailingslashit( get_template_directory() ) . 'inc/constants.php' );

/* Set up the theme early. */
add_action( 'after_setup_theme', 'basic_theme_setup', 5 );

/* Load include files. */
add_action( 'after_setup_theme', 'basic_load_libraries', 10 );

/**
 * The theme setup function. This function sets up support for various 
 * WordPress and framework functionality.
 *
 * @since  1.0.0
 * @access public
 */
function basic_theme_setup() {

	/* Editor styles. */
	add_editor_style( trailingslashit( THEME_CSS ) . 'editor-style.css' );

	/* Handle content width for embeds and images. */
	hybrid_set_content_width( 1025 );

}

/**
 * Various custom function files.
 *
 * @since  1.0.0
 * @access public
 */
function basic_load_libraries() {

	/* Functions. */
	require_once( trailingslashit( THEME_INC ) . 'functions.php' );

	/* Template Tags. */
	require_once( trailingslashit( THEME_INC ) . 'template-tags.php' );

	/* Scripts. */
	require_once( trailingslashit( THEME_INC ) . 'scripts.php' );

	/* Helpers. */
	require_once( trailingslashit( THEME_INC ) . 'helpers.php' );

	/* Custom Hybrid functions. */
	require_once( trailingslashit( THEME_INC ) . 'hybrid.php' );

	/* Custom attributes functions. */
	require_once( trailingslashit( THEME_INC ) . 'attr.php' );

	/* Options Framework functions. */
	require_once( trailingslashit( THEME_ADMIN ) . 'options-framework.php' );

	/* Require and recommended plugins. */
	require_once( trailingslashit( THEME_CLASSES ) . 'class-tgm-plugin-activation.php' );
	require_once( trailingslashit( THEME_INC ) . 'plugins.php' );

}
<?php
/**
 * Defines constants used by the theme.
 * 
 * @package    ThemeName
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/* Do constants setup on the 'after_setup_theme' hook. */
add_action( 'after_setup_theme', 'basic_constants', 5 );

/**
 * Set up the constants for theme usage.
 *
 * @since  1.0.0
 * @access public
 */
function basic_constants() {

	/* Sets the path to the inc directory. */
	define( 'THEME_INC', trailingslashit( THEME_DIR ) . 'inc' );

	/* Sets the path to the inc directory URI. */
	define( 'THEME_INC_URI', trailingslashit( THEME_URI ) . 'inc' );

	/* Sets the path to the admin directory. */
	define( 'THEME_ADMIN', trailingslashit( THEME_INC ) . 'admin' );

	/* Sets the path to the classes directory. */
	define( 'THEME_CLASSES', trailingslashit( THEME_INC ) . 'classes' );

	/* Sets the path to the assets directory. */
	define( 'THEME_ASSETS', trailingslashit( THEME_INC_URI ) . 'assets' );

	/* Sets the path to the img directory. */
	define( 'THEME_IMG', trailingslashit( THEME_ASSETS ) . 'img' );

	/* Sets the path to the css directory. */
	define( 'THEME_CSS', trailingslashit( THEME_ASSETS ) . 'css' );

	/* Sets the path to the js directory. */
	define( 'THEME_JS', trailingslashit( THEME_ASSETS ) . 'js' );

	/* Options Framework Dir. */
	define( 'OPTIONS_FRAMEWORK_DIRECTORY', trailingslashit( THEME_INC_URI ) . 'admin/' );

}
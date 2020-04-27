<?php
/**
 * Enqueue scripts and styles.
 *
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/**
 * Loads the theme styles & scripts.
 *
 * @since 1.0.0
 * @link  http://codex.wordpress.org/Function_Reference/wp_enqueue_script
 * @link  http://codex.wordpress.org/Function_Reference/wp_enqueue_style
 */
function delivery_enqueue() {

	// Load google fonts.
	wp_enqueue_style( 'delivery-font', delivery_open_sans_font_url(), array(), null );

	// Load plugins stylesheet
	wp_enqueue_style( 'delivery-plugins-style', trailingslashit( get_template_directory_uri() ) . 'assets/css/plugins.min.css' );

	// if WP_DEBUG and/or SCRIPT_DEBUG turned on, load the unminified styles & script.
	if ( ! is_child_theme() && WP_DEBUG || SCRIPT_DEBUG ) {

		// Load main stylesheet
		wp_enqueue_style( 'delivery-style', get_stylesheet_uri(), array( 'dashicons' ) );

		// Load custom js plugins.
		wp_enqueue_script( 'delivery-plugins', trailingslashit( get_template_directory_uri() ) . 'assets/js/plugins.min.js', array( 'jquery' ), null, true );

		// Load custom js methods.
		wp_enqueue_script( 'delivery-main', trailingslashit( get_template_directory_uri() ) . 'assets/js/main.js', array( 'jquery' ), null, true );

	} else {

		// Load main stylesheet
		wp_enqueue_style( 'delivery-style', trailingslashit( get_template_directory_uri() ) . 'style.min.css', array( 'dashicons' ) );

		// Load custom js plugins.
		wp_enqueue_script( 'delivery-scripts', trailingslashit( get_template_directory_uri() ) . 'assets/js/delivery-lite.min.js', array( 'jquery' ), null, true );

	}

	// If child theme is active, load the stylesheet.
	if ( is_child_theme() ) {
		wp_enqueue_style( 'delivery-child-style', get_stylesheet_uri() );
	}

	// Load comment-reply script.
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	// js / no-js script.
	wp_add_inline_script( 'faithpress-main-js', "document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/,'js');" );

}
add_action( 'wp_enqueue_scripts', 'delivery_enqueue' );

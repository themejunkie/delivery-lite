<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/**
 * Get our wp_nav_menu() fallback, wp_page_menu(), to show a home link.
 *
 * @since  1.0.0
 * @param  array $args Configuration arguments.
 * @return array
 */
function delivery_page_menu_args( $args ) {
	$args['show_home'] = true;
	return $args;
}
add_filter( 'wp_page_menu_args', 'delivery_page_menu_args' );

/**
 * Adds custom classes to the array of body classes.
 *
 * @since  1.0.0
 * @param  array $classes Classes for the body element.
 * @return array
 */
function delivery_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a custom class if 'Secondary' sidebar at least has one widget.
	if ( is_active_sidebar( 'secondary' ) ) {
		$classes[] = 'has-left-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'delivery_body_classes' );

/**
 * Control the excerpt length.
 *
 * @since  1.0.0
 * @param  $length
 */
function delivery_excerpt_length( $length ) {
	
	if ( is_archive() || is_search() ) {
		return 40;
	} else {
		return 20;
	}

}
add_filter( 'excerpt_length', 'delivery_excerpt_length', 999 );

/**
 * Change the excerpt more string.
 *
 * @since  1.0.0
 * @param  string  $more
 */
function delivery_excerpt_more( $more ) {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'delivery_excerpt_more' );

/**
 * Extend archive title
 *
 * @since  1.0.0
 */
function delivery_extend_archive_title( $title ) {
	if ( is_category() ) {
		$title = single_cat_title( '', false );
	} elseif ( is_tag() ) {
		$title = single_tag_title( '', false );
	} elseif ( is_author() ) {
		$title = get_the_author();
	}
	return $title;
}
add_filter( 'get_the_archive_title', 'delivery_extend_archive_title' );

/**
 * Customize tag cloud widget
 *
 * @since  1.0.0
 */
function delivery_customize_tag_cloud( $args ) {
	$args['largest']  = 12;
	$args['smallest'] = 12;
	$args['unit']     = 'px';
	$args['number']   = 20;
	return $args;
}
add_filter( 'widget_tag_cloud_args', 'delivery_customize_tag_cloud' );
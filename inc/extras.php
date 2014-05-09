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

// wp_nav_menu() fallback.
add_filter( 'wp_page_menu_args', 'delivery_page_menu_args' );

// Custom classes to the body classes.
add_filter( 'body_class', 'delivery_body_classes' );

// Filters wp_title.
add_filter( 'wp_title', 'delivery_wp_title', 10, 2 );

// Sets the authordata global when viewing an author archive.
add_action( 'wp', 'delivery_setup_author' );

// Generates the relevant template info.
add_action( 'wp_head', 'delivery_meta_template', 10 );

// Removes default styles set by WordPress recent comments widget.
add_action( 'widgets_init', 'delivery_remove_recent_comments_style' );

// Change the excerpt length.
add_filter( 'excerpt_length', 'delivery_excerpt_length', 999 );

// Change the excerpt more string.
add_filter( 'excerpt_more', 'delivery_excerpt_more' );

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

	// Adds a custom class if 'Home' sidebar at least has one widget.
	if ( is_active_sidebar( 'home' ) && is_home() ) {
		$classes[] = 'has-left-sidebar';
	}

	return $classes;
}

/**
 * Filters wp_title to print a neat <title> tag based on what is being viewed.
 *
 * @since  1.0.0
 * @param  string $title Default title text for current view.
 * @param  string $sep Optional separator.
 * @return string The filtered title.
 */
function delivery_wp_title( $title, $sep ) {

	if ( is_feed() ) {
		return $title;
	}
	
	global $page, $paged;

	// Add the blog name
	$title .= get_bloginfo( 'name', 'display' );

	// Add the blog description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title .= " $sep $site_description";
	}

	// Add a page number if necessary:
	if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
		$title .= " $sep " . sprintf( __( 'Page %s', 'delivery' ), max( $paged, $page ) );
	}

	return $title;
}

/**
 * Sets the authordata global when viewing an author archive.
 *
 * This provides backwards compatibility with
 * http://core.trac.wordpress.org/changeset/25574
 *
 * It removes the need to call the_post() and rewind_posts() in an author
 * template to print information about the author.
 *
 * @since  1.0.0
 * @global WP_Query $wp_query WordPress Query object.
 * @return void
 */
function delivery_setup_author() {
	global $wp_query;

	if ( $wp_query->is_author() && isset( $wp_query->post ) ) {
		$GLOBALS['authordata'] = get_userdata( $wp_query->post->post_author );
	}
}

/**
 * Generates the relevant template info. Adds template meta with theme version. Uses the theme 
 * name and version from style.css.
 *
 * @since 1.0.0
 */
function delivery_meta_template() {
	$theme    = wp_get_theme( get_template() );
	$template = sprintf( '<meta name="template" content="%1$s %2$s" />' . "\n", esc_attr( $theme->get( 'Name' ) ), esc_attr( $theme->get( 'Version' ) ) );

	echo apply_filters( 'delivery_meta_template', $template );
}

/**
 * Removes default styles set by WordPress recent comments widget.
 *
 * @since 1.0.0
 */
function delivery_remove_recent_comments_style() {
	global $wp_widget_factory;
	remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
}

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

/**
 * Change the excerpt more string.
 *
 * @since  1.0.0
 * @param  string  $more
 */
function delivery_excerpt_more( $more ) {
	return '...';
}
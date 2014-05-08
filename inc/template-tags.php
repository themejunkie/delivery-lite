<?php
/**
 * Custom template tags for this theme.
 * Eventually, some of the functionality here could be replaced by core features.
 * 
 * @package    Delivery Lite
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

if ( ! function_exists( 'delivery_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 *
 * @since 1.0.0
 */
function delivery_posted_on() {
	$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() )
	);

	printf( __( '<span class="posted-on">%1$s</span><span class="byline"> &#8211; by %2$s</span>', 'delivery' ),
		sprintf( '<a href="%1$s" rel="bookmark">%2$s</a>',
			esc_url( get_permalink() ),
			$time_string
		),
		sprintf( '<span class="author vcard"><a class="url fn n" href="%1$s">%2$s</a></span>',
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			esc_html( get_the_author() )
		)
	);
}
endif;
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

if ( ! function_exists( 'delivery_get_posted_on' ) ) :
/**
 * Return HTML with meta information for the current post-date/time and author.
 *
 * @since 1.0.0
 */
function delivery_get_posted_on() {
	$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() )
	);

	$meta = sprintf( __( '<span class="posted-on">%1$s</span><span class="byline"> &#8211; by %2$s</span>', 'delivery' ),
		sprintf( '<a href="%1$s" rel="bookmark">%2$s</a>',
			esc_url( get_permalink() ),
			$time_string
		),
		sprintf( '<span class="author vcard"><a class="url fn n" href="%1$s">%2$s</a></span>',
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			esc_html( get_the_author() )
		)
	);

	return $meta;
}
endif;

/**
 * Prints HTML with meta information for the current post-date/time and author.
 *
 * @since 1.0.0
 */
function delivery_posted_on() {
	echo delivery_get_posted_on();
}

if ( ! function_exists( 'delivery_site_branding' ) ) :
/**
 * Site branding for the site.
 * 
 * Display site title by default, but user can change it with their custom logo.
 * They can upload it on Customizer page.
 * 
 * @since  1.0.0
 */
function delivery_site_branding() {

	$logo = get_theme_mod( 'delivery_logo' );

	// Check if logo available, then display it.
	if ( $logo ) {
		echo '<div class="site-logo">' . "\n";
			echo '<a href="' . esc_url( get_home_url() ) . '" rel="home">' . "\n";
				echo '<img class="logo" src="' . esc_url( $logo ) . '" alt="' . esc_attr( get_bloginfo( 'name' ) ) . '" />' . "\n";
			echo '</a>' . "\n";
		echo '</div>' . "\n";

	// If not, then display the Site Title and Site Description.
	} else {
		echo '<h1 class="site-title"><a href="' . esc_url( get_home_url() ) . '" rel="home">' . esc_attr( get_bloginfo( 'name' ) ) . '</a></h1>';
		echo '<h2 class="site-description">' . esc_attr( get_bloginfo( 'description' ) ) . '</h2>';
	}

}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @since  1.0.0
 * @return bool
 */
function delivery_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'delivery_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,

			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'delivery_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so delivery_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so delivery_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in delivery_categorized_blog.
 *
 * @since 1.0.0
 */
function delivery_category_transient_flusher() {
	// Like, beat it. Dig?
	delete_transient( 'delivery_categories' );
}
add_action( 'edit_category', 'delivery_category_transient_flusher' );
add_action( 'save_post',     'delivery_category_transient_flusher' );

/**
 * Sets up different post thumbnail size.
 *
 * @since  1.0.0
 */
function delivery_post_thumbnail() {

	if ( post_password_required() || is_attachment() || ! has_post_thumbnail() ) {
		return;
	}

	// Sets up empty variable.
	$size = '';

	// Check if on archive or search page.
	if ( is_archive() || is_search() ) :
		$size = 'delivery-archive';
	else :
		$size = 'delivery-post';
	endif;
	?>

	<a class="thumb-link" href="<?php the_permalink(); ?>" rel="bookmark">
		<?php the_post_thumbnail( $size, array( 'class' => 'post-thumbnail', 'alt' => esc_attr( get_the_title() ) ) ); ?>
	</a>

<?php
}

if ( ! function_exists( 'delivery_featured_content' ) ) :
/**
 * Sets up the featured posts based on user selected tag.
 *
 * @since  1.0.0
 */
function delivery_featured_content() {
	global $post;

	// Return if on singular page.
	if ( is_singular() ) {
		return;
	}
	
	// Get the user selected tag for the featured posts.
	$tag = get_theme_mod( 'delivery_featured_posts', 'featured' );

	// Check if the tag is not empty.
	if ( empty( $tag ) ) {
		return;
	}

	// Get any existing copy of our transient data.
	if ( false === ( $featured = get_transient( 'delivery_featured_posts' ) ) ) {
		// It wasn't there, so regenerate the data and save the transient.
		
		// Posts query arguments.
		$args = array(
			'post_type'      => 'post',
			'posts_per_page' => 4,
			'tag'            => $tag
		);

		// The post query
		$featured = get_posts( $args );

		// Store the transient.
		set_transient( 'delivery_featured_posts', $featured );
	}

	// Check if the post(s) exist.
	if ( $featured ) :

		$html = '<div class="featured-slider">';

			$html .= '<div id="slider" class="flexslider">';
				$html .= '<ul class="slides">';
				foreach ( $featured as $post ) :
					setup_postdata( $post );

					$html .= '<li>';
						if ( has_post_thumbnail( $post->ID ) ) {
							$html .= '<a href="' . esc_url( get_permalink( $post->ID ) ) . '" rel="bookmark">' . get_the_post_thumbnail( $post->ID, 'delivery-featured', array( 'alt' => esc_attr( get_the_title( $post->ID ) ) ) ) . '</a>';
						}
						$html .= '<header class="entry-header">';
							$html .= '<h1 class="entry-title"><a href="' . esc_url( get_permalink( $post->ID ) ) . '" rel="bookmark">' . esc_attr( get_the_title( $post->ID ) ) . '</a></h1>';
							$html .= '<div class="entry-meta">' . delivery_get_posted_on() . '</div>';
						$html .= '</header>';
						$html .= '<div class="entry-summary">' . get_the_excerpt() . '</div>';
					$html .= '</li>';

				endforeach;

				// Restore original post data.
				wp_reset_postdata();

				$html .= '</ul>';
			$html .= '</div>';

			$html .= '<div id="carousel" class="flexslider">';
				$html .= '<ul class="slides">';
				foreach ( $featured as $post ) :
					setup_postdata( $post );

					$html .= '<li>';
						$html .= '<div>';
						if ( has_post_thumbnail( $post->ID ) ) {
							$html .= get_the_post_thumbnail( $post->ID, 'delivery-thumb', array( 'alt' => esc_attr( get_the_title( $post->ID ) ) ) );
						}
						$html .= '<p>' . esc_attr( get_the_title( $post->ID ) ) . '</p>';
						$html .= '</div>';
					$html .= '</li>';

				endforeach;

				// Restore original post data.
				wp_reset_postdata();

				$html .= '</ul>';
			$html .= '</div>';

		$html .= '</div><!-- .featured-slider -->';

	// End check.
	endif;

	// Display the featured content.
	if ( ! empty( $html ) ) {
		echo $html;
	}

}
endif;

/**
 * Flush out the transients used in delivery_featured_content.
 *
 * @since 1.0.0
 */
function delivery_featured_content_transient_flusher() {
	delete_transient( 'delivery_featured_posts' );
}
add_action( 'save_post'     , 'delivery_featured_content_transient_flusher' );
add_action( 'customize_save', 'delivery_featured_content_transient_flusher' );

/**
 * Exclude featured posts from the home page blog query.
 *
 * @since  1.0.0
 */
function delivery_pre_get_posts( $query ) {

	// Bail if not home or not main query.
	if ( ! $query->is_home() || ! $query->is_main_query() ) {
		return;
	}

	$page_on_front = get_option( 'page_on_front' );

	// Bail if the blog page is not the front page.
	if ( ! empty( $page_on_front ) ) {
		return;
	}

	// Get the tag.
	$featured = get_theme_mod( 'delivery_featured_posts', 'featured' );

	// Bail if no featured posts.
	if ( ! $featured ) {
		return;
	}

	// Get the tag name.
	$exclude = get_term_by( 'name', $featured, 'post_tag' );

	// Exclude the main query.
	if ( ! empty( $exclude ) ) {
		$query->set( 'tag__not_in', $exclude->term_id );
	}

}
add_action( 'pre_get_posts', 'delivery_pre_get_posts' );
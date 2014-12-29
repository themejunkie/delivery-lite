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
	wp_enqueue_style( 'delivery-fonts', '//fonts.googleapis.com/css?family=Droid+Sans:400,700', null, null, 'all' );

	// if WP_DEBUG and/or SCRIPT_DEBUG turned on, load the unminified styles & script.
	if ( WP_DEBUG || SCRIPT_DEBUG ) {

		// Load main stylesheet
		wp_enqueue_style( 'delivery-style', get_stylesheet_uri(), array( 'dashicons' ) );

		// Load custom js plugins.
		wp_enqueue_script( 'delivery-plugins', trailingslashit( get_template_directory_uri() ) . 'assets/js/plugins.js', array( 'jquery' ), null, true );

		// Load custom js methods.
		wp_enqueue_script( 'delivery-main', trailingslashit( get_template_directory_uri() ) . 'assets/js/main.js', array( 'jquery' ), null, true );

	} else {

		// Load main stylesheet
		wp_enqueue_style( 'delivery-style', trailingslashit( get_template_directory_uri() ) . 'style.min.css', array( 'dashicons' ) );

		// If child theme is active, load the stylesheet.
		if ( is_child_theme() ) {
			wp_enqueue_style( 'delivery-child-style', get_stylesheet_uri() );
		}

		// Load custom js plugins.
		wp_enqueue_script( 'delivery-scripts', trailingslashit( get_template_directory_uri() ) . 'assets/js/delivery.min.js', array( 'jquery' ), null, true );

	}

	// Load comment-reply script.
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

}
add_action( 'wp_enqueue_scripts', 'delivery_enqueue' );

/**
 * Loads HTML5 Shiv & Respond js file.
 * 
 * @since  1.0.0
 */
function delivery_special_scripts() {
?>
<!--[if lte IE 9]>
<script src="<?php echo trailingslashit( get_template_directory_uri() ) . 'assets/js/html5shiv.js'; ?>"></script>
<![endif]-->
<?php
}
add_action( 'wp_head', 'delivery_special_scripts', 15 );

/**
 * js / no-js script.
 *
 * @since  1.0.0
 */
function delivery_no_js_script() {
?>
<script>document.documentElement.className = 'js';</script>
<?php
}
add_action( 'wp_footer', 'delivery_no_js_script' );
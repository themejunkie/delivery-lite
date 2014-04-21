<?php
/**
 * Enqueue scripts and styles for theme usage.
 *
 * @package    ThemeName
 * @author     Theme Junkie
 * @copyright  Copyright (c) 2014, Theme Junkie
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @since      1.0.0
 */

/* Load the theme styles & scripts. */
add_action( 'wp_enqueue_scripts', 'basic_enqueue' );

/* Load HTML5 Shiv & Respond js file. */
add_action( 'wp_head', 'basic_for_ie_scripts', 10 );

/* Script for no-js / js class. */
add_action( 'wp_footer', 'basic_no_js_script' );

/**
 * Loads the theme styles & scripts.
 *
 * @since  1.0.0
 * @access public
 * @link   http://codex.wordpress.org/Function_Reference/wp_enqueue_script
 */
function basic_enqueue() {

	/* Load google fonts. */
	wp_enqueue_style( 'basic-fonts', '//fonts.googleapis.com/css?family=Ubuntu:300,400,500,400italic,500italic|Dancing+Script:700', null, null, 'all' );

	/* Load custom js plugins. */
	wp_enqueue_script( 'basic-plugins', trailingslashit( THEME_JS ) . 'plugins.js', array( 'jquery' ), null, true );

	/* Load custom js methods. */
	wp_enqueue_script( 'basic-main', trailingslashit( THEME_JS ) . 'main.js', array( 'jquery' ), null, true );

}

/**
 * Loads HTML5 Shiv & Respond js file.
 * 
 * @since  1.0.0
 * @access public
 */
function basic_for_ie_scripts() {
?>
<!--[if lt IE 9]>
<script src="<?php echo trailingslashit( THEME_JS ) . 'html5shiv.js'; ?>"></script>
<script src="<?php echo trailingslashit( THEME_JS ) . 'respond.js'; ?>"></script>
<![endif]-->
<?php
}

/**
 * js / no-js script.
 *
 * @since  1.0.0
 * @access public
 */
function basic_no_js_script() {
?>
<script>document.documentElement.className = 'js';</script>
<?php
}
?>
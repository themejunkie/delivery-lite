<?php
/**
 * Load the part of Hybrid Core functions/extensions.
 * 
 * @package    Delivery Lite
 * @author     Justin Tadlock
 * @license    http://www.gnu.org/licenses/gpl-2.0.html
 * @link       http://themehybrid.com/hybrid-core
 * @since      1.0.0
 */

/**
 * Load the Breadcrumb Trail extension.
 */
require trailingslashit( get_template_directory() ) . 'inc/hybrid/breadcrumb-trail.php';

/**
 * Load the Loop Pagination extension.
 */
require trailingslashit( get_template_directory() ) . 'inc/hybrid/loop-pagination.php';
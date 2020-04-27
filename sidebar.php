<?php
// Return early if no widget found.
if ( ! is_active_sidebar( 'primary' ) ) {
	return;
}
?>

<div id="secondary" class="widget-area widget-primary" role="complementary" aria-label="<?php echo esc_attr_x( 'Primary Sidebar', 'Sidebar aria label', 'delivery-lite' ); ?>" <?php hybrid_attr( 'sidebar', 'primary' ); ?>>
	<?php dynamic_sidebar( 'primary' ); ?>
</div><!-- #secondary -->

<?php
// Return early if no widget found.
if ( ! is_active_sidebar( 'primary' ) ) {
	return;
}
?>

<div id="secondary" class="widget-area widget-primary" role="complementary">
	<?php dynamic_sidebar( 'primary' ); ?>
</div><!-- #secondary -->

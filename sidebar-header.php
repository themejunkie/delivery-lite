<?php if ( is_active_sidebar( 'header' ) ) : // Check, if header sidebar at least has one widget ?>
	<div id="header-sidebar" class="widget-header">
		<?php dynamic_sidebar( 'header' ); ?>
	</div><!-- #header-sidebar -->
<?php endif; ?>

<?php if ( is_active_sidebar( 'home' ) && is_home() ) : // Check, if home sidebar at least has one widget and on home page. ?>
	<div id="home-sidebar" class="widget-area widget-home">
		<?php dynamic_sidebar( 'home' ); ?>
	</div><!-- #home-sidebar -->
<?php endif; ?>

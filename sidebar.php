<div id="secondary" class="widget-area widget-primary" role="complementary">

	<?php if ( ! dynamic_sidebar( 'primary' ) ) : ?>

		<aside id="archives" class="widget">
			<h1 class="widget-title"><?php _e( 'Archives', 'delivery' ); ?></h1>
			<ul>
				<?php wp_get_archives( array( 'type' => 'monthly' ) ); ?>
			</ul>
		</aside>

		<aside id="meta" class="widget">
			<h1 class="widget-title"><?php _e( 'Meta', 'delivery' ); ?></h1>
			<ul>
				<?php wp_register(); ?>
				<li><?php wp_loginout(); ?></li>
				<?php wp_meta(); ?>
			</ul>
		</aside>

	<?php endif; // end sidebar widget area ?>
	
</div><!-- #secondary -->

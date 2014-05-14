<?php if ( has_nav_menu( 'secondary' ) ) : // Check if there's a menu assigned to the 'secondary' location. ?>

	<nav id="secondary-navigation" class="secondary-navigation" role="navigation">
		<div class="navigation-item">

			<?php wp_nav_menu(
				array(
					'theme_location'  => 'secondary',
					'container'       => '',
					'menu_id'         => 'menu-secondary-items',
					'menu_class'      => 'menu-secondary-items sf-menu',
					'fallback_cb'     => ''
				)
			); ?>

		</div><!-- .navigation-item -->
	</nav><!-- #site-navigation -->

<?php endif; // End check for menu. ?>
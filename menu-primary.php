<?php if ( has_nav_menu( 'primary' ) ) : // Check if there's a menu assigned to the 'primary' location. ?>

	<nav id="primary-navigation" class="main-navigation" role="navigation">
		<div class="navigation-item">

			<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'delivery' ); ?></a>
			<?php wp_nav_menu(
				array(
					'theme_location'  => 'primary',
					'container'       => '',
					'menu_id'         => 'menu-primary-items',
					'menu_class'      => 'menu-primary-items sf-menu',
					'fallback_cb'     => ''
				)
			); ?>

			<?php get_search_form(); // Loads the searchform.php template. ?>

		</div><!-- .navigation-item -->
	</nav><!-- #site-navigation -->

<?php endif; // End check for menu. ?>
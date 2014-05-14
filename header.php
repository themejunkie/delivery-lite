<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div id="page" class="hfeed site">

	<?php get_template_part( 'menu', 'primary' ); // Loads the menu-primary.php template. ?>
	
	<!-- Mobile navigation -->
	<a href="#primary-navigation" class="mobile-menu"><div class="dashicons dashicons-menu"></div></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="header-item">

			<div class="site-branding">
				<?php delivery_site_branding(); // Custom function to display site title or logo. ?>
			</div>

			<?php get_sidebar( 'header' ); // Loads the sidebar-header.php template. ?>

		</div><!-- .header-item -->
	</header><!-- #masthead -->

	<?php get_template_part( 'menu', 'secondary' ); // Loads the menu-secondary.php template. ?>

	<div id="content" class="site-content">

		<?php get_sidebar( 'home' ); // Loads the sidebar-home.php template. ?>

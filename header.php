<!DOCTYPE html>
<html class="no-js" <?php language_attributes( 'html' ); ?>>

<head>
<?php wp_head(); // Hook required for scripts, styles, and other <head> items. ?>
</head>

<body <?php hybrid_attr( 'body' ); ?>>

	<div id="site">

		<div class="container">

			<header <?php hybrid_attr( 'header' ); ?>>

				<?php if ( display_header_text() ) : // If user chooses to display header text. ?>

					<div id="branding">
						<?php hybrid_site_title(); ?>
						<?php hybrid_site_description(); ?>
					</div><!-- #branding -->

				<?php endif; ?>

			</header><!-- #header -->

			<?php hybrid_get_menu( 'primary' ); // Loads the menu/primary.php template. ?>

			<div id="main" class="main">

				<?php hybrid_get_menu( 'breadcrumbs' ); // Loads the menu/breadcrumbs.php template. ?>

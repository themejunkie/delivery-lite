<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<?php
		// Sets up two different thumbnail size, for archive and post page.
		$size = '';
		if ( is_archive() || is_search() ) {
			$size = 'delivery-archive';
		} else {
			$size = 'delivery-post';
		}
	?>

	<?php if ( has_post_thumbnail() ) : // Check if post has post thumbnail. ?>
		<a class="thumb-link" href="<?php the_permalink(); ?>" rel="bookmark">
			<?php the_post_thumbnail( $size, array( 'class' => 'post-thumbnail', 'alt' => get_the_title() ) ); ?>
		</a>
	<?php endif; ?>

	<header class="entry-header entry-header-index">
		<h1 class="entry-title">
			<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
		</h1>

		<?php if ( 'post' == get_post_type() ) : ?>
			<div class="entry-meta">
				<?php delivery_posted_on(); ?>

				<?php if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
					<span class="comments-link"><?php comments_popup_link( __( '0', 'delivery' ), __( '1', 'delivery' ), __( '%', 'delivery' ) ); ?> <div class="dashicons dashicons-admin-comments"></div></span>
				<?php endif; ?>
			</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	
</article><!-- #post-## -->

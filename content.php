<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php if ( has_post_thumbnail() ) : // Check if post has post thumbnail. ?>
		<a class="thumb-link" href="<?php the_permalink(); ?>" rel="bookmark">
			<?php the_post_thumbnail( 'delivery-post', array( 'class' => 'post-thumbnail', 'alt' => get_the_title() ) ); ?>
		</a>
	<?php endif; ?>

	<header class="entry-header">
		<h1 class="entry-title">
			<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
		</h1>

		<?php if ( 'post' == get_post_type() ) : ?>
			<div class="entry-meta">
				<?php delivery_posted_on(); ?>
			</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-summary">
		<?php the_excerpt(); ?>
	</div><!-- .entry-summary -->
	
</article><!-- #post-## -->

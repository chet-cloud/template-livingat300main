<?php
/**
 *
 * Let's Live Blog Admin
 *
 * @since      1.0.0
 *
 * @package    Let's Live Blog
 * @subpackage lets-live-blog/admin
 */
namespace letsliveblog;
class Lets_Live_Blog_Admin {

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	*/
	public function __construct( $slug, $version, $url ) {
		$this->slug = $slug;
		$this->version = $version;
		$this->url = $url;
	}

	/**
	 * Scripts
	 *
	 * @since    1.0.0
	 */
	public function scripts( $pagenow ) {

		if ( ( $pagenow == 'post.php' || $pagenow == 'post-new.php' ) && ! class_exists( 'Zeen_Engine' ) ) {
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_style( $this->slug, esc_url( $this->url . 'admin/css/admin-style.min.css' ), array(), $this->version, 'all' );
			wp_enqueue_script( 'jquery-ui-core' );
			wp_enqueue_script( 'jquery-ui-slider' );
			wp_enqueue_script( 'jquery-ui-datepicker' );
			wp_enqueue_script( $this->slug . '-vendors-js', esc_url( $this->url . 'admin/js/admin-ext.js' ), array( 'jquery', 'jquery-ui-datepicker', 'jquery-ui-core', 'jquery-ui-slider', 'wp-color-picker' ), $this->version, true );
			wp_enqueue_script( $this->slug . '-js', esc_url( $this->url . 'admin/js/lets-live-blog-admin.min.js' ), array( 'jquery', 'jquery-ui-core', 'wp-color-picker', $this->slug . '-vendors-js' ), $this->version, true );
			$i18n = array();

			$i18n['close']       = esc_html__( 'Close', 'lets-live-blog' );
			$i18n['now']       = esc_html__( 'Now', 'lets-live-blog' );
			$i18n['titleWarning']       = esc_html__( 'Warning', 'lets-live-blog' );
			$i18n['titleCancel']       = esc_html__( 'Cancel', 'lets-live-blog' );
			$i18n['titleContinue']     = esc_html__( 'Continue', 'lets-live-blog' );
			$i18n['titleModal']        = esc_html__( 'Select Image', 'lets-live-blog' );
			$i18n['titleGalleryModal'] = esc_html__( 'Select or Upload Images', 'lets-live-blog' );

			wp_localize_script( $this->slug . '-js', 'letsLiveBlogJS',
				array(
					'i18n'                => $i18n,
					'adminNonce'          => wp_create_nonce( 'lets_live_blog_nonce' ),
				)
			);
		}

	}

}


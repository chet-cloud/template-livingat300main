<?php
/**
 *
 * Let's Live Blog
 *
 * @since      1.0.0
 *
 * @package    Let's Live Blog
 * @subpackage lets-live-blog/inc
 */
namespace letsliveblog;
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Lets_Live_Blog {

	public static function init() {
		if ( empty( $_GET['tipi_builder'] ) ) {
			$class = __CLASS__;
			new $class;
		}
	}

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	*/
	public function __construct() {

		$this->version  = '1.0.2';
		$this->slug     = 'lets-live-blog';
		$this->url      = plugin_dir_url( dirname( __FILE__ ) );
		$this->dir_path = plugin_dir_path( dirname( __FILE__ ) );
		$this->lets_live_blog_loader();
		$this->lets_live_blog_locale();

		if ( is_admin() ) {
			$this->lets_live_blog_admin();
			add_action( 'load-post.php',     array( $this, 'lets_live_blog_metabox_init' ) );
			add_action( 'load-post-new.php', array( $this, 'lets_live_blog_metabox_init' ) );
		} else {
			$this->lets_live_blog_frontend();
		}

	}

	/**
	 * Let's Live Blog Loader
	 *
	 * @since 1.0.0
	 */
	private function lets_live_blog_loader() {
		require_once $this->dir_path . 'admin/class-lets-live-blog-admin.php';
		require_once $this->dir_path . 'admin/class-lets-live-blog-deactivate.php';
		require_once $this->dir_path . 'admin/class-lets-live-blog-meta.php';
		require_once $this->dir_path . 'admin/lets-live-blog-meta.php';
		require_once $this->dir_path . 'inc/class-lets-live-blog-i18n.php';
		require_once $this->dir_path . 'frontend/class-lets-live-blog-frontend.php';
		require_once $this->dir_path . 'frontend/app/routes/class-lets-live-blog-routes-control.php';
		require_once $this->dir_path . 'frontend/app/routes/class-lets-live-blog-routes.php';
	}

	/**
	 * Let's Live Blog Initialize
	 *
	 * @since    1.0.0
	 */
	function lets_live_blog_metabox_init() {
		$meta = lets_live_blog_meta( $this->url . 'admin/images/' );
		if ( class_exists( 'Zeen_Engine' ) ) {
			new \Zeen_Engine_Metabox( $meta );
		} else {
			new Lets_Live_Blog_Metabox( $meta );
		}
	}

	/**
	 * Let's Live Blog Backend Loader
	 *
	 * @since    1.0.0
	 */
	private function lets_live_blog_admin() {

		$admin = new Lets_Live_Blog_Admin( $this->slug, $this->version, $this->url );
		add_action( 'admin_enqueue_scripts', array( $admin, 'scripts' ) );

	}

	/**
	 * Let's Live Blog Frontend Loader
	 *
	 * @since    1.0.0
	 */
	private function lets_live_blog_frontend() {

		$frontend = new Lets_Live_Blog_Frontend( $this->slug, $this->version, $this->url );
		add_filter( 'the_content', array( $frontend, 'append' ) );
		add_action( 'wp_enqueue_scripts', array( $frontend, 'frontend_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $frontend, 'frontend_scripts_logged' ) );
		add_filter( 'teeny_mce_buttons', array( $frontend, 'editor_teeny' ), 10, 2 );
		add_filter( 'quicktags_settings', array( $frontend, 'editor_qt' ), 10, 2 );
		add_filter( 'the_title', array( $frontend, 'title_append' ), 10, 2 );
		add_filter( 'template_redirect', array( $frontend, 'default_editor' ), 10, 2 );
		add_action( 'letsliveblogjob', array( $frontend, 'cron' ) );
		add_action( 'letsliveblogclean', array( $frontend, 'cron_clean' ) );
		$routes = new Lets_Live_Blog_Routes( $this->slug );
		add_action( 'rest_api_init', array( $routes, 'lets_live_blog_routes' ) );
	}

	/**
	 * Let's Live Blog Translation Loader
	 *
	 * @since 1.0.0
	 */
	public function lets_live_blog_locale() {

		$i18n = new Lets_Live_Blog_i18n( $this->dir_path );
		add_action( 'plugins_loaded', array( $i18n, 'lets_live_blog_textdomain' ) );

	}

}

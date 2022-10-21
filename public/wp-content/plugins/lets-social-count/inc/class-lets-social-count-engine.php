<?php
/**
 *
 * Let's Social Count Frontend Class
 *
 * @since      1.0.0
 *
 * @package    Lets Social Count
 * @subpackage lets-social-count/inc
 */

class Lets_Social_Count {

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	*/
	public function __construct() {

		$this->name     = "Let's Social Count";
		$this->version  = '1.0.0';
		$this->slug     = 'lets-social-count';
		$this->url      = plugin_dir_url( dirname( __FILE__ ) );
		$this->dir_path = plugin_dir_path( dirname( __FILE__ ) );
		$this->lets_social_count_loader();
		$this->lets_social_count_locale();

		add_action( 'widgets_init', array( $this, 'lets_social_count_widget' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'lets_social_count_enqueue_scripts_frontend' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'lets_social_count_enqueue_scripts_backend' ) );

	}


	/**
	 *  Loader
	 *
	 * @since 1.0.0
	 */
	private function lets_social_count_loader() {

		require $this->dir_path . 'inc/helpers.php';
		require $this->dir_path . 'inc/class-lets-social-count-widget.php';
		require $this->dir_path . 'inc/class-lets-social-count-i18n.php';

	}

	/**
	 *  Translation Loader
	 *
	 * @since 1.0.0
	 */
	public function lets_social_count_locale() {

		$i18n = new Lets_Social_Count_i18n( $this->dir_path );
		add_action( 'plugins_loaded', array( $i18n, 'lets_social_count_textdomain' ) );

	}

	/**
	 * Load scripts backend
	 *
	 * @since    1.0.0
	 */
	public function lets_social_count_enqueue_scripts_backend() {

		wp_enqueue_style( 'lets-social-count-admin', esc_url( $this->url . 'assets/admin/css/style.css' ), array(), $this->version, 'all' );
	}

	/**
	 * Load scripts frontend
	 *
	 * @since    1.0.0
	 */
	public function lets_social_count_enqueue_scripts_frontend() {
		wp_enqueue_style( 'lets-social-count', esc_url( $this->url . 'assets/css/style.css' ), array(), $this->version, 'all' );
	}

	/**
	 * Widget
	 *
	 * @since 1.0.0
	 */
	public function lets_social_count_widget() {

		return register_widget( 'LetsSocialCount' );

	}

}

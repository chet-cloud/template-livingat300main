<?php
/**
 * Let's Social Count i18n
 *
 * @since 1.0.0
 *
 * @see WP_Widget
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Lets_Social_Count_i18n {

	/**
	 * Var for URL.
	 *
	 * @since 1.0.0
	 */
	private $dir_path;

	/**
	 * Admin Constructor
	 *
	 * @since 1.0.0
	 *
	*/
	public function __construct( $dir_path ) {

		$this->dir_path = $dir_path;

	}

	/**
	 * Let's Social Count Translation
	 *
	 * @since    1.0.0
	 */
	public function lets_social_count_textdomain() {

		load_plugin_textdomain( 'lets-social-count', false, dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/');

	}

}

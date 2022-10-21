<?php
/**
 *
 * Let's Live Blog internationalization
 *
 * @since      1.0.0
 *
 * @package    Let's Live Blog
 * @subpackage lets-live-blog/includes
 */
namespace letsliveblog;
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
class Lets_Live_Blog_i18n {
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
	 * Let's Live Blog Translation
	 *
	 * @since    1.0.0
	 */
	public function lets_live_blog_textdomain() {

		load_plugin_textdomain( 'lets-live-blog', false, dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/');

	}

}
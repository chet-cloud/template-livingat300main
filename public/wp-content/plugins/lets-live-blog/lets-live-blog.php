<?php
/*!
Plugin Name: Let's Live Blog
Plugin URI: https://www.codetipi.com
Author: Codetipi
Author URI: https://www.codetipi.com
Description: The ultimate live blog plugin for WordPress
Version: 1.0.2
Text Domain: lets-live-blog
License: http://codecanyon.net/licenses/regular_extended
License URI: http://codecanyon.net/licenses/regular_extended
Requires at least: 4.8
Tested up to: 4.9
Domain Path: /languages/
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require plugin_dir_path( __FILE__ ) . 'inc/class-lets-live-blog.php';

/**
* Let's fire it up
*
* @since 1.0.0
*/
add_action( 'plugins_loaded', array( 'letsliveblog\Lets_Live_Blog', 'init' ) );

/**
* Deactivation cleanup
*
* @since 1.0.0
*/
register_deactivation_hook( __FILE__, 'lets_live_blog_deactivate' );

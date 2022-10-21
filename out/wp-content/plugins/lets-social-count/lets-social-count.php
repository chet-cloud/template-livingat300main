<?php
/*!
Plugin Name: Let's Social Count
Plugin URI: https://codetipi.com
Author: Codetipi
Author URI: https://codetipi.com
Description: Promote your social networks with their stats
Version: 1.0.2
Text Domain: lets-social-count
Requires at least: 4.8
Tested up to: 4.9
Domain Path: /languages/
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Core class
 */
require plugin_dir_path( __FILE__ ) . 'inc/class-lets-social-count-engine.php';

/**
* Initialize the class
*
* @since 1.0.0
*/
function lets_social_count_init() {
	new Lets_Social_Count;
}

lets_social_count_init();

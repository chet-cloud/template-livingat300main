/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.0.8
 */
(function( $, Zeen ) {
'use strict';
Zeen.bind( 'ready', function () {

	function headerBlockData( setting ) {
		Zeen.control( 'header_block_pids', ZeenControlStatus( setting, [ [ 'header_block_source', 'pids', '=' ] ], '=' ) );
		Zeen.control( 'header_block_categories', ZeenControlStatus( setting, [ [ 'header_block_source', 'categories', '=' ], [ 'header_block_sortby', 1, '!=int'  ] ], '=' ) );
		Zeen.control( 'header_block_tags', ZeenControlStatus( setting, [ [ 'header_block_source', 'tags', '=' ], [ 'header_block_sortby', 1, '!=int'  ] ], '=' ) );
	};

	function ZeenControlStatus( setting, toCheck, comparison, initialCheck ) {

	    return function( control ) {
	        var status = function() {

		        	if ( comparison === 'intarray' ) {
		            	return $.inArray( parseInt( setting.get() ), toCheck ) !== -1;
		            } else if ( comparison === '=' ) {
		            	return setting.get() === toCheck;
		            } else if ( comparison === '!=' ) {
		            	return setting.get() !== toCheck;
		            }  else if ( comparison === '!empty' ) {
		            	return setting.get() !== '';
		            }  else if ( comparison === '!=int' ) {
		            	return parseInt( setting.get() ) !== toCheck;
		            } else if ( comparison === 'gt' ) {
		            	return parseInt( setting.get() ) > toCheck;
		            } else if ( comparison === 'lt' ) {
		            	return parseInt( setting.get() ) < toCheck;
		            } else if ( comparison === 'true' ) {
		            	return ( setting.get() === true || setting.get() === 1 || setting.get() === 'true' )
		            } else if ( comparison === 'false' ) {
		            	return ( setting.get() !== true && setting.get() !== 1 && setting.get() !== 'true' )
		            } else if ( comparison === 'int' ) {
		            	if ( typeof( toCheck ) === 'object' ) {
		            		for (var i = 0; i < toCheck.length; i++) {
		            			if ( parseInt( setting.get() ) === toCheck[i] ) {
		            				return true;
		            			}
		            		}
		            		return false;
		            	} else {
		            		return ( parseInt( setting.get() ) === toCheck );
		            	}
		            } else if ( comparison === 'object' ) {
		            	var showIt = true;
		            	for ( var i = 0; i < toCheck.length; i++ ) {
		            		var valToCheck = Zeen.value( toCheck[i][0] )();
		        			if ( toCheck[i][2] === '=' ) {
			        			if ( valToCheck !== toCheck[i][1] ) {
			        				showIt = false;
			        			}
			        		} else if ( toCheck[i][2] === 'true' ) {
			        			if ( valToCheck !== true && valToCheck !== 1 && valToCheck !== 'true' ) {
			        				showIt = false;
			        			}
			        		} else if ( toCheck[i][2] === 'false' ) {
			        			if ( valToCheck === true || valToCheck === 1 || valToCheck === 'true' ) {
			        				showIt = false;
			        			}
			        		} else if ( toCheck[i][2] === '!empty' ) {
			        			if ( valToCheck === '' ) {
			        				showIt = false;
			        			}
			        		} else if ( toCheck[i][2] === 'gt' ) {

				            	if ( parseInt( valToCheck ) <= toCheck[i][1] ) {
				            		showIt = false;
				            	}
				            } else if ( toCheck[i][2] === 'lt' ) {
				            	if ( parseInt( valToCheck ) >= toCheck[i][1] ) {
				            		showIt = false;
				            	}
			        		} else if ( toCheck[i][2] === 'int' ) {
			        			if ( toCheck[i][1] !== parseInt( valToCheck ) ) {
			        				showIt = false;
			        			}
			        		}  else if ( toCheck[i][2] === '!=int' ) {
				            	if ( parseInt( valToCheck ) === toCheck[i][1] ) {
				            		showIt = false
				            	}
				            }
		        		}

		        		return showIt;
		            }
	        };
	        var changeStatus = function() {
	            control.active.set( status() );
	        };

	        control.active.validate = status;
	        if ( initialCheck !== 'off' ) {
	        	changeStatus();
	        }
	        setting.bind( changeStatus );
	    };
	}

	Zeen( 'header_block_source', function( setting ) {
		headerBlockData( setting );
	} );
	Zeen( 'header_block_sortby', function( setting ) {
		headerBlockData( setting );
	} );

	Zeen( 'footer_instagram', function( setting ) {
		Zeen.control( 'footer_instagram_location', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'instagram_ppp', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'instagram_block_user', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'footer_style', function( setting ) {
		Zeen.control( 'footer_upper_padding_top', ZeenControlStatus( setting, [3,4], 'intarray' ) );
		Zeen.control( 'footer_upper_padding_bottom', ZeenControlStatus( setting, [3,4], 'intarray' ) );
	} );

	Zeen( 'subscribe_on_leave', function( setting ) {
		Zeen.control( 'subscribe_leave_cookie', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'slider_args_autoplay', function( setting ) {
		Zeen.control( 'slider_args_delay', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'classic_post_ani_onoff', function( setting ) {
		Zeen.control( 'classic_post_ani', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'mobile_header_sticky_onoff', function( setting ) {
		Zeen.control( 'mobile_header_sticky', ZeenControlStatus( setting, [ [ 'mobile_header_style', 10, 'lt' ], [ 'mobile_header_sticky_onoff', 'true', 'true' ] ], 'object' ) );
	} );

	Zeen( 'mobile_header_style', function( setting ) {
		Zeen.control( 'title_mobile_sticky', ZeenControlStatus( setting, 10, 'lt' ) );
		Zeen.control( 'mobile_header_sticky_onoff', ZeenControlStatus( setting, 10, 'lt' ) );
		Zeen.control( 'mobile_header_sticky', ZeenControlStatus( setting, [ [ 'mobile_header_style', 10, 'lt' ], [ 'mobile_header_sticky_onoff', 'true', 'true' ] ], 'object' ) );

	});

	Zeen( 'mobile_bottom_sticky_onoff', function( setting ) {
		Zeen.control( 'mobile_bottom_sticky', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'mob_bot_share_tw', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'mob_bot_share_fb', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'mob_bot_share_msg', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'mob_bot_share_wa', ZeenControlStatus( setting, 'true', 'true' ) );

	} );



	Zeen( 'classic_bottom_border_onoff', function( setting ) {
		Zeen.control( 'classic_bottom_border_width', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'classic_bottom_border_padding', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'classic_cats', function( setting ) {
		Zeen.control( 'classic_cats_design', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'posts_cats', function( setting ) {
		Zeen.control( 'posts_cats_design', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'single_related_posts', function( setting ) {
		Zeen.control( 'single_related_posts_design', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'single_related_posts_ppp', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'amp_ad', function( setting ) {
		Zeen.control( 'amp_ad_footer', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'amp_ad_header', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'amp_ad_client', ZeenControlStatus( setting, [ [ 'amp_ad_type', 'true', 'true' ], [ 'amp_ad', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'amp_ad_slot', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'amp_ad_type', ZeenControlStatus( setting, 'true', 'true' ) );
	} );
	Zeen( 'amp_ad_type', function( setting ) {
		Zeen.control( 'amp_ad_client', ZeenControlStatus( setting, [ [ 'amp_ad_type', 0, 'int' ], [ 'amp_ad', 'true', 'true' ] ], 'object' ) );
	} );

	Zeen( 'footer_widgets_border_onoff', function( setting ) {
		Zeen.control( 'footer_widgets_border_width', ZeenControlStatus( setting, [ [ 'footer_widgets_border_onoff', 'true', 'true' ], [ 'footer_widgets_style', 1, 'gt' ] ], 'object' ) );
	} );

	Zeen( 'footer_top_border_onoff', function( setting ) {
		Zeen.control( 'footer_top_border_width', ZeenControlStatus( setting, 'true', 'true' ) );
	} );	

	Zeen( 'footer_widgets_style', function( setting ) {
		Zeen.control( 'footer_widgets_border_onoff', ZeenControlStatus( setting, 1, 'gt' ) );
		Zeen.control( 'footer_widgets_border_width', ZeenControlStatus( setting, [ [ 'footer_widgets_border_onoff', 'true', 'true' ], [ 'footer_widgets_style', 1, 'gt' ] ], 'object' ) );

	} );


	Zeen( 'sidebar_border_onoff', function( setting ) {
		Zeen.control( 'sidebar_border_width', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'sidebar_widgets_border_onoff', function( setting ) {
		Zeen.control( 'sidebar_widgets_border_bottom', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sidebar_widgets_border_width', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'sidebar_widgets_skin', function( setting ) {
		Zeen.control( 'sidebar_widgets_spacing', ZeenControlStatus( setting, 4, '!=int' ) );
	} );
	
	Zeen( 'to_top', function( setting ) {
		Zeen.control( 'to_top_icon_show', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'to_top_icon', ZeenControlStatus( setting, [ [ 'to_top', 'true', 'true' ], [ 'to_top_icon_show', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'to_top_text', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'to_top_icon_show', function( setting ) {
		Zeen.control( 'to_top_icon', ZeenControlStatus( setting, [ [ 'to_top', 'true', 'true' ], [ 'to_top_icon_show', 'true', 'true' ] ], 'object' ) );
	} );
	Zeen( 'secondary_menu_side_enable', function( setting ) {
		Zeen.control( 'floating_side_menu', ZeenControlStatus( setting, 'true', 'true' ) );
	} );
	

	Zeen( 'header_style', function( setting ) {
		Zeen.control( 'header_side_width', ZeenControlStatus( setting, 80, 'gt' ) );
		Zeen.control( 'floating_side_menu', ZeenControlStatus( setting, [ [ 'secondary_menu_side_enable', 'true', 'true' ], [ 'header_style', 81, '!=int' ], [ 'header_style', 82, '!=int' ], [ 'header_style', 70, 'gt' ] ], 'object' ) );
		Zeen.control( 'secondary_menu_side_enable', ZeenControlStatus( setting, [ [ 'header_style', 81, '!=int' ], [ 'header_style', 82, '!=int' ], [ 'header_style', 70, 'gt' ] ], 'object' ) );

		Zeen.control( 'secondary_menu_padding_bottom', ZeenControlStatus( setting, 20, 'lt' ) );
		Zeen.section( 'section_main_menu', ZeenControlStatus( setting, 80, 'lt' ) );
		Zeen.control( 'secondary_menu_padding_top', ZeenControlStatus( setting, 20, 'lt' ) );

		var lessthan80 = [ 'header_width', 'title_header_details', 'header_padding_top', 'header_padding_bottom', 'title_stickies_header', 'header_sticky_onoff', 'header_sticky', 'title_header_ad', 'header_pub' ];
		var lessthan72 = [ 'logo_main_menu_position', 'logo_main_menu_visible', 'logo_main_menu_retina', 'logo_main_menu', 'title_main_menu_logo', 'main_menu_top_border_width', 'main_menu_bottom_border_width', 'main_menu_skin', 'main_menu_width', 'main_menu_padding_bottom', 'main_menu_padding_top' ];
		var lessthan70 = [ 'secondary_menu_skin_color', 'secondary_menu_skin', 'secondary_menu_width', 'secondary_date', 'current_date_color', 'secondary_menu_trending_inline', 'secondary_menu_padding_sides' ];
		var secondaryMix = [ 'secondary_menu_skin_color', 'secondary_menu_skin', 'secondary_menu_width', 'secondary_date', 'current_date_color', 'secondary_menu_padding_top', 'secondary_menu_padding_bottom' ];

		for (var i = 0; i < lessthan70.length; i++) {
			Zeen.control( lessthan70[i], ZeenControlStatus( setting, 70, 'lt' ) );
		}
		for (var i = 0; i < lessthan80.length; i++) {
			Zeen.control( lessthan80[i], ZeenControlStatus( setting, 80, 'lt' ) );
		}
		for (var i = 0; i < lessthan72.length; i++) {
			Zeen.control( lessthan72[i], ZeenControlStatus( setting, 72, 'lt' ) );
		}
		for (var i = 0; i < secondaryMix.length; i++) {
			Zeen.control( secondaryMix[i], ZeenControlStatus( setting, [ [ 'header_style', 11, '!=int' ], [ 'header_style', 5, '!=int' ], [ 'header_style', 70, 'lt' ] ], 'object' ) );
		}
	} );

	Zeen( 'pages_hero_design', function( setting ) {
		Zeen.control( 'pages_cover_height', ZeenControlStatus( setting, [ [ 'pages_hero_design', 21, 'gt' ], [ 'pages_hero_design', 29, 'lt' ] ], 'object' ) );
	} );

	Zeen( 'header_sticky_onoff', function( setting ) {
		Zeen.control( 'header_sticky', ZeenControlStatus( setting, [ [ 'header_style', 80, 'lt' ], [ 'header_sticky_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'sticky_menu_post_name', ZeenControlStatus( setting, [ [ 'header_style', 80, 'lt' ], [ 'header_sticky_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'reading_mode', ZeenControlStatus( setting, [ [ 'header_style', 80, 'lt' ], [ 'header_sticky_onoff', 'true', 'true' ], [ 'sticky_menu_post_name', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'sticky_menu_share', ZeenControlStatus( setting, [ [ 'header_style', 80, 'lt' ], [ 'header_sticky_onoff', 'true', 'true' ], [ 'sticky_menu_post_name', 'true', 'true' ] ], 'object' ) );
	} );

	Zeen( 'sticky_menu_post_name', function( setting ) {
		Zeen.control( 'reading_mode', ZeenControlStatus( setting, [ [ 'header_style', 80, 'lt' ], [ 'sticky_menu_post_name', 'true', 'true' ], [ 'header_sticky_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'sticky_menu_share', ZeenControlStatus( setting, [ [ 'header_style', 80, 'lt' ], [ 'sticky_menu_post_name', 'true', 'true' ], [ 'header_sticky_onoff', 'true', 'true' ] ], 'object' ) );
	} );

	Zeen( 'hero_design', function( setting ) {
		Zeen.control( 'cover_height', ZeenControlStatus( setting, [ [ 'hero_design', 21, 'gt' ], [ 'hero_design', 29, 'lt' ] ], 'object' ) );
	} );

	Zeen( 'classic_read_more', function( setting ) {
		Zeen.control( 'classic_read_more_text', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'masonry_design', function( setting ) {
		Zeen.control( 'masonry_text_color', ZeenControlStatus( setting, 2, 'int' ) );
		Zeen.control( 'masonry_background_color', ZeenControlStatus( setting, 2, 'int' ) );
		Zeen.control( 'masonry_whitespace', ZeenControlStatus( setting, 2, 'int' ) );
	} );

	Zeen( 'masonry_borders', function( setting ) {
		Zeen.control( 'masonry_border_color', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'main_menu_icon_search', function( setting ) {
		Zeen.control( 'main_menu_icon_search_type', ZeenControlStatus( setting, [ [ 'main_menu_icon_search', 'true', 'true' ], [ 'header_style', 80, 'lt' ] ], 'object' ) );
	} );

	Zeen( 'secondary_menu_icon_search', function( setting ) {
		Zeen.control( 'secondary_menu_icon_search_type', ZeenControlStatus( setting, [ [ 'secondary_menu_icon_search', 'true', 'true' ], [ 'header_style', 80, 'lt' ] ], 'object' ) );
	} );

	Zeen( 'logo_main_menu', function( setting ) {
		Zeen.control( 'logo_main_menu_retina', ZeenControlStatus( setting, [ [ 'logo_main_menu', 'true', '!empty' ], [ 'header_style', 72, 'lt' ] ], 'object' ) );
		Zeen.control( 'logo_main_menu_visible', ZeenControlStatus( setting, [ [ 'logo_main_menu', 'true', '!empty' ], [ 'header_style', 72, 'lt' ] ], 'object' ) );
		Zeen.control( 'logo_main_menu_position', ZeenControlStatus( setting, [ [ 'logo_main_menu', 'true', '!empty' ], [ 'header_style', 72, 'lt' ] ], 'object' ) );
	} );

	Zeen( 'category_layout', function( setting ) {
		Zeen.control( 'category_fs', ZeenControlStatus( setting, 80, 'gt' ) );
	} );

	Zeen( 'tags_layout', function( setting ) {
		Zeen.control( 'tags_fs', ZeenControlStatus( setting, 80, 'gt' ) );
	} );

	Zeen( 'author_layout', function( setting ) {
		Zeen.control( 'author_fs', ZeenControlStatus( setting, 80, 'gt' ) );
	} );

	Zeen( 'search_layout', function( setting ) {
		Zeen.control( 'search_fs', ZeenControlStatus( setting, 80, 'gt' ) );
	} );

	Zeen( 'blog_page_layout', function( setting ) {
		Zeen.control( 'blog_page_fs', ZeenControlStatus( setting, 80, 'gt' ) );
	} );

	Zeen( 'blog_page_cat_exclude', function( setting ) {
		Zeen.control( 'blog_page_cat_excluded', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'global_background_img', function( setting ) {
		Zeen.control( 'global_background_img_repeat', ZeenControlStatus( setting, '', '!empty' ) );
	} );

	Zeen( 'bg_ad', function( setting ) {
		Zeen.control( 'bg_ad_url', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'bg_ad_img', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'bg_ad_spacing', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'bg_ad_only_hp', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'ipl', function( setting ) {
		Zeen.control( 'ipl_source', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'ipl_coms', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'ipl_mobile', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'ipl_separation', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'bbpress_layout', function( setting ) {
		Zeen.control( 'bbpress_sidebar', ZeenControlStatus( setting, 50, 'lt' ) );
	} );

	Zeen( 'buddypress_layout', function( setting ) {
		Zeen.control( 'buddypress_sidebar', ZeenControlStatus( setting, 50, 'lt' ) );
	} );

	Zeen( 'woo_product_layout', function( setting ) {
		Zeen.control( 'woo_product_sidebar', ZeenControlStatus( setting, 1, 'int' ) );
	} );

	Zeen( 'woo_qv', function( setting ) {
		Zeen.control( 'woo_qv_price', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'woo_layout', function( setting ) {
		Zeen.control( 'woo_shop_sidebar', ZeenControlStatus( setting, 10, 'gt' ) );
	} );

	Zeen( 'sliding_global', function( setting ) {
		Zeen.control( 'sliding_box_location', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_cookie', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_subtitle', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_smallprint', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_code', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_title', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_url', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_bg', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_global_font_color', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'sliding_post', function( setting ) {
		Zeen.control( 'sliding_post_source', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_post_date', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_post_title', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'sliding_post_cookie', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'post_mid_inline', function( setting ) {
		Zeen.control( 'post_mid_inline_date', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	

	Zeen( 'header_block_featured_title_onoff', function( setting ) {
		Zeen.control( 'header_block_featured_title', ZeenControlStatus( setting, [ [ 'header_block_featured_title_onoff', 'true', 'true' ], [ 'header_block_hp_onoff', 'true', 'true' ] ], 'object') );
	} );
	Zeen( 'classic_title_line_onoff', function( setting ) {
		Zeen.control( 'classic_title_line_width', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'megamenu_animation_onoff', function( setting ) {
		Zeen.control( 'megamenu_animation', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'megamenu_submenu_color', function( setting ) {
		Zeen.control( 'dropdown_top_bar_height', ZeenControlStatus( setting, 2, 'int' ) );
	} );

	Zeen( 'classic_title_top_border_onoff', function( setting ) {
		Zeen.control( 'classic_title_top_border_width', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'classic_title_bottom_border_onoff', function( setting ) {
		Zeen.control( 'classic_title_bottom_border_width', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'og_meta', function( setting ) {
		Zeen.control( 'og_meta_img', ZeenControlStatus( setting, 'true', 'true' ) );
	} );

	Zeen( 'header_block_design', function( setting ) {
		Zeen.control( 'header_block_parallax', ZeenControlStatus( setting, [ [ 'header_block_hp_onoff', 'true', 'true' ], [ 'header_block_design', 90, 'lt' ] ], 'object') );
	} );
	Zeen( 'header_block_hp_onoff', function( setting ) {
		Zeen.control( 'header_block_featured_title', ZeenControlStatus( setting, [ [ 'header_block_featured_title_onoff', 'true', 'true' ], [ 'header_block_hp_onoff', 'true', 'true' ] ], 'object') );
		Zeen.control( 'header_block_featured_title_onoff', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'header_block_design', ZeenControlStatus( setting, 'true', 'true' ) );

		Zeen.control( 'header_block_parallax', ZeenControlStatus( setting, [ [ 'header_block_hp_onoff', 'true', 'true' ], [ 'header_block_design', 90, 'lt' ] ], 'object') );
		Zeen.control( 'header_block_hp', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'header_block_mobile', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'header_block_source', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'header_block_sortby', ZeenControlStatus( setting, 'true', 'true' ) );

		Zeen.control( 'header_block_pids', ZeenControlStatus( setting, [ [ 'header_block_hp_onoff', 'true', 'true' ], [ 'header_block_source', 'pids', '=' ] ], 'object') );
		Zeen.control( 'header_block_categories', ZeenControlStatus( setting, [ [ 'header_block_hp_onoff', 'true', 'true' ], [ 'header_block_source', 'categories', '=' ], [ 'header_block_sortby', 1, '!=int' ] ], 'object') );
		Zeen.control( 'header_block_tags', ZeenControlStatus( setting, [ [ 'header_block_hp_onoff', 'true', 'true' ], [ 'header_block_source', 'tags', '=' ], [ 'header_block_sortby', 1, '!=int' ] ], 'object') );
		Zeen.control( 'header_top_pub', ZeenControlStatus( setting, 'true', 'false' ) );
		Zeen.control( 'title_header_base_design_above_ad', ZeenControlStatus( setting, 'true', 'false' ) );
		Zeen.control( 'header_block_instagram', ZeenControlStatus( setting, 'true', 'false' ) );
		Zeen.control( 'header_block_instagram_user', ZeenControlStatus( setting, [ [ 'header_block_hp_onoff', 'true', 'false' ], [ 'header_block_instagram', 'true', 'true' ] ], 'object') );
		Zeen.control( 'header_block_instagram_ppp', ZeenControlStatus( setting, [ [ 'header_block_hp_onoff', 'true', 'false' ], [ 'header_block_instagram', 'true', 'true' ] ], 'object') );
	} );

	Zeen( 'header_block_instagram', function( setting ) {
		Zeen.control( 'header_block_instagram_user', ZeenControlStatus( setting, [ [ 'header_block_instagram', 'true', 'true' ], [ 'header_block_hp_onoff', 'true', 'false' ] ], 'object') );
		Zeen.control( 'header_block_instagram_ppp', ZeenControlStatus( setting, [ [ 'header_block_instagram', 'true', 'true' ], [ 'header_block_hp_onoff', 'true', 'false' ] ], 'object') );
	});


	var skins = [ 'subscribe', 'popup', 'footer', 'footer_widgets', 'header', 'sidebar', 'mobile_header', 'mobile_menu', 'slide', 'lwa' ];

	for ( var i = 0; i < skins.length; i++ ) {
		Zeen( skins[i] + '_skin', function( setting ) {
			Zeen.control( skins[i] + '_color', ZeenControlStatus( setting, [3,4], 'int' ) );
			Zeen.control( skins[i] + '_skin_color', ZeenControlStatus( setting, 3, 'int' ) );
			Zeen.control( skins[i] + '_skin_color_b', ZeenControlStatus( setting, 3, 'int' ) );
			Zeen.control( skins[i] + '_skin_img', ZeenControlStatus( setting, 3, 'int' ) );
			Zeen.control( skins[i] + '_skin_img_repeat', ZeenControlStatus( setting, [ [ skins[i] + '_skin', 3, 'int' ], [skins[i] + '_skin_img', '', '!empty' ] ], 'object') );
			Zeen.control( skins[i] + '_skin_img_transparency', ZeenControlStatus( setting, [ [ skins[i] + '_skin', 3, 'int' ], [skins[i] + '_skin_img', '', '!empty' ] ], 'object') );
		} );
		Zeen( skins[i] + '_skin_img', function( setting ) {
			Zeen.control( skins[i] + '_skin_img_transparency', ZeenControlStatus( setting, [ [ skins[i] + '_skin', 3, 'int' ], [skins[i] + '_skin_img', '', '!empty' ] ], 'object') );
			Zeen.control( skins[i] + '_skin_img_repeat', ZeenControlStatus( setting, [ [ skins[i] + '_skin', 3, 'int' ], [skins[i] + '_skin_img', '', '!empty' ] ], 'object') );
		} );
	}

	var skin_color = [ 'main_menu', 'footer_lower', 'secondary_menu' ];

	for ( var i = 0; i < skin_color.length; i++ ) {
		Zeen( skin_color[i] + '_skin', function( setting ) {
			Zeen.control( skin_color[i] + '_skin_color', ZeenControlStatus( setting, 3, 'int' ) );
			Zeen.control( skin_color[i] + '_skin_color_b', ZeenControlStatus( setting, 3, 'int' ) );
		} );
	}

	Zeen( 'logo_subtitle_footer' , function( setting ) {
		Zeen.control( 'logo_subtitle_footer_color', ZeenControlStatus( setting, '', '!=' ) );
	} );



	Zeen( 'logo_main', function( setting ) {
		Zeen.control( 'logo_subtitle_main_color', ZeenControlStatus( setting, [ [  'logo_subtitle_main', '', '!empty' ], [ 'logo_main', '', '!empty' ] ], 'object') );
		Zeen.control( 'logo_subtitle_main', ZeenControlStatus( setting, 'true', '!empty' ) );
		Zeen.control( 'logo_main_retina', ZeenControlStatus( setting, 'true', '!empty' ) );

	} );

	Zeen( 'logo_subtitle_main' , function( setting ) {
		Zeen.control( 'logo_subtitle_main_color', ZeenControlStatus( setting, [ [  'logo_subtitle_main', '', '!empty' ], [ 'logo_main', '', '!empty' ] ], 'object') );
	} );

	Zeen( 'logo_subtitle_slide' , function( setting ) {
		Zeen.control( 'logo_subtitle_slide_color', ZeenControlStatus( setting, '', '!=' ) );
	} );

	Zeen( 'font_3_onoff', function( setting ) {
		Zeen.control( 'font_3_source', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'font_3_letter_spacing', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'font_3_color', ZeenControlStatus( setting, 'true', 'true' ) );

		Zeen.control( 'font_3_google', ZeenControlStatus( setting, [ [ 'font_3_source', 1, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_weight_custom', ZeenControlStatus( setting, [ [ 'font_3_source', 1, '!=int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_typekit', ZeenControlStatus( setting, [ [ 'font_3_source', 2, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_typekit_custom', ZeenControlStatus( setting, [ [ 'font_3_source', 2, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_typekit_fallback', ZeenControlStatus( setting, [ [ 'font_3_source', 2, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_custom', ZeenControlStatus( setting, [ [ 'font_3_source', 3, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
	} );

	Zeen( 'font_3_source', function( setting ) {
		Zeen.control( 'font_3_google', ZeenControlStatus( setting, [ [ 'font_3_source', 1, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_weight_custom', ZeenControlStatus( setting, [ [ 'font_3_source', 1, '!=int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_typekit', ZeenControlStatus( setting, [ [ 'font_3_source', 2, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_typekit_custom', ZeenControlStatus( setting, [ [ 'font_3_source', 2, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_typekit_fallback', ZeenControlStatus( setting, [ [ 'font_3_source', 2, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
		Zeen.control( 'font_3_custom', ZeenControlStatus( setting, [ [ 'font_3_source', 3, 'int' ], [ 'font_3_onoff', 'true', 'true' ] ], 'object' ) );
	} );


   var fonts = [ 1, 2 ];

   for ( var i = 0; i < fonts.length; i++ ) {
   		Zeen( 'font_' + fonts[i] + '_source', function( setting ) {
			Zeen.control( 'font_' + fonts[i] + '_google', ZeenControlStatus( setting, 1, 'int' ) );
			Zeen.control( 'font_' + fonts[i] + '_weight_custom', ZeenControlStatus( setting, 1, 'gt' ) );
			Zeen.control( 'font_' + fonts[i] + '_typekit', ZeenControlStatus( setting, 2, 'int' ) );
			Zeen.control( 'font_' + fonts[i] + '_typekit_fallback', ZeenControlStatus( setting, 2, 'int' ) );
			Zeen.control( 'font_' + fonts[i] + '_typekit_custom', ZeenControlStatus( setting, 2, 'int' ) );
			Zeen.control( 'font_' + fonts[i] + '_custom', ZeenControlStatus( setting, 3, 'int' ) );

		} );
   }

   var bylines = [ 'posts' ];

	for ( var i = 0; i < bylines.length; i++ ) {
		Zeen( bylines[i] + '_byline', function( setting ) {
			Zeen.control( bylines[i] + '_byline_comments', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( bylines[i] + '_byline_cats', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( bylines[i] + '_byline_author', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( bylines[i] + '_byline_author_avatar', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( bylines[i] + '_byline_read_time', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( bylines[i] + '_byline_like_count', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( bylines[i] + '_byline_date', ZeenControlStatus( setting, 'true', 'true' ) );
		} );
	}

	var tileTypes = [ 'grid', 'slider' ];

	for ( var i = 0; i < tileTypes.length; i++ ) {

		Zeen( tileTypes[i] + '_ani_onoff', function( setting ) {
			Zeen.control( tileTypes[i] + '_ani', ZeenControlStatus( setting, 'true', 'true' ) );
		} );

		Zeen( tileTypes[i] + '_title_ani_onoff', function( setting ) {
			Zeen.control( tileTypes[i] + '_title_ani', ZeenControlStatus( setting, 'true', 'true' ) );
		} );

		Zeen( tileTypes[i] + '_cats', function( setting ) {
			Zeen.control( tileTypes[i] + '_cats_design', ZeenControlStatus( setting, 'true', 'true' ) );
		} );

		Zeen( tileTypes[i] + '_title_bg_onoff', function( setting ) {
			Zeen.control( tileTypes[i] + '_title_bg', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( tileTypes[i] + '_title_bg_edge', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( tileTypes[i] + '_title_solid', ZeenControlStatus( setting, [ [ tileTypes[i] + '_title_bg_onoff', 'true', 'true' ], [tileTypes[i] + '_title_bg', 1, 'int' ] ], 'object' ) );
			Zeen.control( tileTypes[i] + '_title_gradient_a', ZeenControlStatus( setting, [ [ tileTypes[i] + '_title_bg_onoff', 'true', 'true' ], [tileTypes[i] + '_title_bg', 2, 'int' ] ], 'object' ) );
		} );

		Zeen( tileTypes[i] + '_title_bg', function( setting ) {
			Zeen.control( tileTypes[i] + '_title_solid', ZeenControlStatus( setting, [ [ tileTypes[i] + '_title_bg_onoff', 'true', 'true' ], [tileTypes[i] + '_title_bg', 1, 'int' ] ], 'object' ) );
			Zeen.control( tileTypes[i] + '_title_gradient_a', ZeenControlStatus( setting, [ [ tileTypes[i] + '_title_bg_onoff', 'true', 'true' ], [tileTypes[i] + '_title_bg', 2, 'int' ] ], 'object' ) );
		} );

		Zeen( tileTypes[i] + '_img_overlay_onoff', function( setting ) {

			Zeen.control( tileTypes[i] + '_img_overlay_opacity', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( tileTypes[i] + '_img_overlay_opacity_hover', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( tileTypes[i] + '_img_overlay', ZeenControlStatus( setting, 'true', 'true' ) );
			Zeen.control( tileTypes[i] + '_img_overlay_solid', ZeenControlStatus( setting, [ [ tileTypes[i] + '_img_overlay_onoff', 'true', 'true' ], [tileTypes[i] + '_img_overlay', 1, 'int' ] ], 'object' ) );
			for ( var n = 0; n < 7; n++ ) {
				Zeen.control( tileTypes[i] + '_gradient_' + n + '_a', ZeenControlStatus( setting, [ [ tileTypes[i] + '_img_overlay_onoff', 'true', 'true' ], [tileTypes[i] + '_img_overlay', 2, 'int' ] ], 'object' ) );
				if ( n === 1 && tileTypes[i] === 'slider' ) {
					break;
				}
			}
		} );

		Zeen( tileTypes[i] + '_img_overlay', function( setting ) {
			Zeen.control( tileTypes[i] + '_img_overlay_solid', ZeenControlStatus( setting, [ [ tileTypes[i] + '_img_overlay_onoff', 'true', 'true' ], [tileTypes[i] + '_img_overlay', 1, 'int' ] ], 'object' ) );
			for ( var n = 0; n < 7; n++ ) {
				Zeen.control( tileTypes[i] + '_gradient_' + n + '_a', ZeenControlStatus( setting, [ [ tileTypes[i] + '_img_overlay_onoff', 'true', 'true' ], [tileTypes[i] + '_img_overlay', 2, 'int' ] ], 'object' ) );
				if ( n === 1 && tileTypes[i] === 'slider' ) {
					break;
				}
			}
		} );

	}

	Zeen( 'top_bar_message', function( setting ) {
		Zeen.control( 'top_bar_message_content_spacing', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'top_bar_message_content', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'top_bar_message_font_color', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'top_bar_message_content_font_size', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'top_bar_message_link', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'top_bar_message_bg', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'top_bar_cookie', ZeenControlStatus( setting, 'true', 'true' ) );
	});

	Zeen( 'timed_popup', function( setting ) {
		Zeen.control( 'timed_popup_timer', ZeenControlStatus( setting, 'true', 'true' ) );
		Zeen.control( 'timed_popup_cookie', ZeenControlStatus( setting, 'true', 'true' ) );
	});

	Zeen( 'grid_cats', function( setting ) {
		Zeen.control( 'grid_cat_design', ZeenControlStatus( setting, 'true', 'true' ) );
	});

	Zeen( 'slider_cats', function( setting ) {
		Zeen.control( 'slider_cat_design', ZeenControlStatus( setting, 'true', 'true' ) );
	});

	Zeen( 'classic_cats', function( setting ) {
		Zeen.control( 'classic_cat_design', ZeenControlStatus( setting, 'true', 'true' ) );
	});

	$('.tipi-tip').on( 'mouseenter', function(){
		var $tipOutput, $current;
		$current = $(this);
		$current.addClass( 'tipi-tipped' );
		var output = '<div class="tipi-tip-wrap">' +
			'<div class="inner">' +
				$current.data( 'title' ) +
			'</div>' +
			'<div class="detail"></div>' +
			'</div>';
		$('body').append( output );
		$tipOutput = $('body').find( '> .tipi-tip-wrap' );
		var offset = $current[0].getBoundingClientRect();
		var top = offset.top;
		top = top + offset.height;
		$tipOutput.css('top', top + 'px').addClass( 'tipi-tip-wrap-visible' );
		var left = offset.left;
		left = left - ( offset.width / 2 ) + 6;
		$tipOutput.find('.detail').css('left', left + 'px' );
		$current.on( 'mouseleave', function() {
			$tipOutput.remove();
			$current.off( 'mouseleave mousemove' );
		});
	} );


    Zeen.section( 'section_amp', function( section ) {
        section.expanded.bind( function( isExpanded ) {
            if ( isExpanded ) {
            } else {
            }
        } );
    } );


});

} )( jQuery, wp.customize );
<?php
/**
 * Let's Live Blog meta box Class
 *
 * @package 	Lets_Live_Blog
 * @copyright   Copyright Codetipi
 * @since 		1.0.0
 */
namespace letsliveblog;
class Lets_Live_Blog_Metabox {

	/**
	 * Var for setup.
	 *
	 * @since    1.0.0
	 */
	private $lets_live_blog_setup;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	*/
	public function __construct( $lets_live_blog_setup ) {
		$this->src_uri = empty( $lets_live_blog_setup['src_uri'] ) ? get_parent_theme_file_uri( 'assets/admin/img/' ) : $lets_live_blog_setup['src_uri'];
		$this->lets_live_blog_post_type = isset( $lets_live_blog_setup['post_type'] ) ? $lets_live_blog_setup['post_type'] : array( 'post' );
		$this->lets_live_blog_title = $lets_live_blog_setup['title'];
		$this->lets_live_blog_id = $lets_live_blog_setup['id'];
		$this->lets_live_blog_args = isset( $lets_live_blog_setup['args'] ) ? $lets_live_blog_setup['args'] : array();
		$this->lets_live_blog_sections = isset( $lets_live_blog_setup['sections'] ) ? $lets_live_blog_setup['sections'] : '';

		add_action( 'add_meta_boxes', array( $this, 'lets_live_blog_metabox_add' ) );
		add_action( 'save_post', array( $this, 'lets_live_blog_save' ) );
	}

	/**
	 * Meta Box Constructor
	 *
	 * @since 1.0.0
	 * @param WP_Post $post The post object.
	 */
	public function lets_live_blog_metabox_add( $post ) {

		add_meta_box(
			$this->lets_live_blog_id,
			$this->lets_live_blog_title,
			array( $this, 'lets_live_blog_metabox_callback' ),
			$this->lets_live_blog_post_type,
			'advanced',
			'high'
		);

	}

	/**
	 * Meta Box Save
	 *
	 * @since 1.0.0
	 * @param int $post_id The ID of the post being saved.
	 */
	public function lets_live_blog_save( $post_id ) {

		// Important checks before saving
		// 1. Check if nonce exists 2. Verify nonce 3. Check if post is autosaving 4. Check quick edit doesn't affect custom fields 5. Check user has right permissions
		if (
			( ! isset( $_POST['lets_live_blog_metabox_nonce'] ) )
			|| ( ! wp_verify_nonce( $_POST['lets_live_blog_metabox_nonce'], 'lets_live_blog_metabox' ) )
			|| ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
			|| ( defined( 'DOING_AJAX' ) && DOING_AJAX )
			|| ( ! current_user_can( 'edit_posts' ) )
			) {
			return;
		}

		foreach ( $this->lets_live_blog_metabox_callback( $post_id, false ) as $option ) {
			$control        = $option['control'];
			$id             = $option['id'];
			$class          = isset( $option['class'] ) ? $option['class'] : '';
			$title          = isset( $option['title'] ) ? $option['title'] : '';
			$description    = isset( $option['description'] ) ? $option['description'] : '';
			$default        = isset( $option['default'] ) ? $option['default'] : '';
			$required       = isset( $option['required'] ) ? $option['required'] : '';
			$choices        = isset( $option['choices'] ) ? $option['choices'] : array();
			$global         = isset( $option['global'] ) ? $option['global'] : '';
			$global_removal = isset( $option['global_removal'] ) ? $option['global_removal'] : '';
			$name           = str_replace( '-', '_', $id );
			$sanitized_value = '';

			switch ( $control ) {
				case 'on-off':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? 'on' : 'off';
				break;
				case 'text':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? lets_live_blog_sanitize_wp_kses( $_POST["lets_live_blog_$name"] ) : '';
				break;
				case 'textarea':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? lets_live_blog_sanitize_wp_kses( $_POST["lets_live_blog_$name"] ) : '';
				break;
				case 'radio-images':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? esc_attr( $_POST["lets_live_blog_$name"] ) : '';
				break;
				case 'select':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? esc_attr( $_POST["lets_live_blog_$name"] ) : '';
				break;
				case 'color':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? esc_attr( $_POST["lets_live_blog_$name"] ) : '';
				break;
				case 'color-a':
					$rgba = isset( $_POST["lets_live_blog_$name"] ) ? str_replace( ' ', '', $_POST["lets_live_blog_$name"] )  : '';

					if ( !empty( $rgba ) && strtolower( mb_substr( $rgba, 0, 4) ) == 'rgba' ) {
						preg_match( '#\((.*?)\)#', $rgba, $matches );
						$rgba = explode( ',', $matches[1] );
						$sanitized_value = 'rgba( ' . intval($rgba[0]) . ',' . intval($rgba[1]) . ',' . intval($rgba[2]) . ',' . floatval($rgba[3]) . ' )';
					} else {
						$sanitized_value = esc_attr( $rgba );
					}

				break;
				case 'slider':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? intval( $_POST["lets_live_blog_$name"] ) : '';
				break;
				case 'image':
					$id_or_src = isset( $choices['type'] ) &&  $choices['type'] == 'id' ? 'id' : 'src';
					if ( $id_or_src == 'id' ) {
						$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? intval( $_POST["lets_live_blog_$name"] ) : '';
					} else {
						$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ? esc_url( $_POST["lets_live_blog_$name"] ) : '';
					}
				break;
				case 'gallery':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ?  $_POST["lets_live_blog_$name"] : '';
				break;
				case 'background':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ?  $_POST["lets_live_blog_$name"] : '';
				break;
				case 'drag':
					$sanitized_value = isset( $_POST["lets_live_blog_$name"] ) ?  $_POST["lets_live_blog_$name"] : '';
				break;

			}

			update_post_meta( $post_id, "lets_live_blog_$name", $sanitized_value );
			if ( ! empty( $global ) ) {
				$current_value = get_post_meta( $post_id, "lets_live_blog_$name", true );
				if ( $current_value != $global ) {
					if ( ! empty( $global_removal ) ) {
						if ( isset( Lets_Live_BlogOptions::$lets_live_blog_options[ "lets_live_blog_$name" ] ) ) {
							$key = array_search( $post_id, Lets_Live_BlogOptions::$lets_live_blog_options[ "lets_live_blog_$name" ] );
							if ( false !== $key ) {
								unset( Lets_Live_BlogOptions::$lets_live_blog_options[ "lets_live_blog_$name" ][ $key ] );
								Lets_Live_BlogOptions::lets_live_blog_update_option();
							}
						}
					}
					continue;
				}

				if ( isset( Lets_Live_BlogOptions::$lets_live_blog_options[ "lets_live_blog_$name" ] ) ) {
					if ( ! in_array( $post_id, Lets_Live_BlogOptions::$lets_live_blog_options[ "lets_live_blog_$name" ] ) ) {
						Lets_Live_BlogOptions::$lets_live_blog_options[ "lets_live_blog_$name" ][] = $post_id;
					}
				} else {
					Lets_Live_BlogOptions::$lets_live_blog_options[ "lets_live_blog_$name" ] = array( $post_id );
				}

				Lets_Live_BlogOptions::lets_live_blog_update_option();
			}
		}
		if ( get_theme_support( 'lets_live_blog_subtitles' ) ) {
			$sanitized_subtitle = isset( $_POST['lets_live_blog_subtitle'] ) ? lets_live_blog_sanitize_wp_kses( $_POST['lets_live_blog_subtitle'] ) : '';
			update_post_meta( $post_id, "lets_live_blog_subtitle", $sanitized_subtitle );
		}

	}

	 /**
	 * Page Meta Box Callback
	 *
	 * @since 1.0.0
	 *
	 * @param WP_Post $post The post object.
	 *
	 */
	public function lets_live_blog_metabox_callback( $post, $echo = true ) {

		if ( $echo == true ) {
			$this->lets_live_blog_metabox_options( $post, $this->lets_live_blog_args, $this->lets_live_blog_sections );
		} else {
			return $this->lets_live_blog_args;
		}

	}

	public function lets_live_blog_metabox_options( $post, $lets_live_blog_options ) {
		$j = 1;
		$closer = false;

		?>
		<div id="<?php echo esc_attr( $this->lets_live_blog_id ); ?>" class="lets-live-blog-metabox-wrap tipi-metabox-wrap lets-live-blog-cf">

			<?php if ( ! empty( $this->lets_live_blog_sections ) ) { ?>
			<div class="lets-live-blog-metabox-sections lets-live-blog-cf">

			<?php foreach ( $this->lets_live_blog_sections as $section ) { ?>
				<a href="#" class="lets-live-blog-trig<?php if ( $j == 1 ) { echo ' lets-live-blog-active'; } ?> lets-live-blog-trig-<?php echo esc_attr( $section['id'] ); ?>" data-section="lets-live-blog-trig-<?php echo esc_attr( $section['id'] ); ?>"><?php echo ( $section['title'] ) ? $section['title'] : ''; ?></a>
			<?php $j++; } ?>

			</div>

			<?php } ?>

			<div class="lets-live-blog-metabox-controls">

			<?php
			wp_nonce_field( 'lets_live_blog_metabox', 'lets_live_blog_metabox_nonce' );

			foreach ( $lets_live_blog_options as $option ) {

				$control        = $option['control'];
				$id             = $option['id'];
				$class          = isset( $option['class'] ) ? $option['class'] : '';
				$title          = isset( $option['title'] ) ? $option['title'] : '';
				$description    = isset( $option['description'] ) ? $option['description'] : '';
				$default        = isset( $option['default'] ) ? $option['default'] : '';
				$required       = isset( $option['required'] ) ? $option['required'] : '';
				$choices        = isset( $option['choices'] ) ? $option['choices'] : array();
				$name           = str_replace( '-', '_', $id );

				if ( $control == 'section' ) {
					$closer = true;
					if ( $choices['count'] > 1 ) {
						echo '</div><div id="lets-live-blog-trig-' . $id . '" class="lets-live-blog-hide">';
					} else {
						echo '<div id="lets-live-blog-trig-' . $id . '">';
					}

					continue;
				}

				if ( $control == 'slider' ) {
					$meta = get_post_meta( $post->ID, 'lets_live_blog_' . $name, true );
					$current_value = isset( $meta ) && $meta != '' ? $meta : $default;
				} else {
					$current_value = get_post_meta( $post->ID, 'lets_live_blog_' . $name, true ) ? get_post_meta( $post->ID, 'lets_live_blog_' . $name, true ) : $default;
				}

				$bg_repeat_args = array(
					1 => esc_html__( 'Stretch', 'lets-live-blog' ),
					2 => esc_html__( 'Repeat', 'lets-live-blog' ),
					3 => esc_html__( 'Repeat Horizontal', 'lets-live-blog' ),
					4 => esc_html__( 'Repeat Vertical', 'lets-live-blog' ),
					5 => esc_html__( 'No Repeat', 'lets-live-blog' ),
				);

				$lets_live_blog_vis = empty( $required ) ? '' : 'display: none;';
				$lets_live_blog_req = empty( $required ) ? '' : 'lets-live-blog-req';
				$req_id = empty( $required ) ? '' : $required['id'];
				$req_value = empty( $required ) ? '' : $required['value'];
				$req_value = is_array( $req_value ) ? wp_json_encode( $req_value ) : $req_value;
				$req_id_2 = empty( $required['id_2'] ) ? '' : $required['id_2'];
				$req_value_2 = empty( $required['value_2'] ) ? '' : $required['value_2'];
				$req_value_2 = is_array( $req_value_2 ) ? wp_json_encode( $req_value_2 ) : $req_value_2;

				if ( $req_value == $current_value ) {
					$lets_live_blog_vis = '';
				}
				?>
				<div id="lets-live-blog-meta-control-<?php echo esc_attr( $id ); ?>" class="lets-live-blog-control lets-live-blog-meta-control lets-live-blog-<?php echo esc_attr( $control ); echo '-wrap ' . esc_attr( $class ) . ' ' . esc_attr( $lets_live_blog_req ); ?> lets-live-blog-cf"<?php echo 'style="' . esc_attr( $lets_live_blog_vis ) . '"'; ?> data-req="<?php echo esc_attr( 'lets-live-blog-meta-control-' . $req_id ); ?>" data-req-val="<?php echo esc_attr( $req_value ); ?>" data-req-2="<?php echo esc_attr( 'lets-live-blog-meta-control-' . $req_id_2 ); ?>" data-req-val-2="<?php echo esc_attr( $req_value_2 ); ?>" data-control="<?php echo esc_attr( $control ); ?>">

					<div class="lets-live-blog-meta">
						<div class="lets-live-blog-title"><?php echo lets_live_blog_sanitize_wp_kses( $title ); ?></div>
						<?php if ( ! empty( $description ) ) { ?>
							<div class="lets-live-blog-description"><?php echo lets_live_blog_sanitize_wp_kses( $description ); ?></div>
						<?php } ?>
					</div>

					<?php

					switch ( $control ) {
						case 'text':
						?>
						<div class="lets-live-blog-control-only">
							<input name="lets_live_blog_<?php echo esc_attr( $name ); ?>" type="text" value="<?php echo esc_attr( $current_value ); ?>" class="lets-live-blog-input-val" id="lets-live-blog-<?php echo esc_attr( $id ); ?>">
						</div>
						<?php
							break;
						case 'textarea':
						?>
							<div class="lets-live-blog-control-only">
							<textarea class="lets-live-blog-input-val" rows="4" cols="40" name="lets_live_blog_<?php echo esc_attr( $name ); ?>" id="lets-live-blog-<?php echo esc_attr( $id ); ?>"><?php echo esc_attr( $current_value ); ?></textarea>

							</div>
						<?php
							break;
						case 'on-off':
						?>
							<div class="lets-live-blog-control-only">
								<span class="lets-live-blog-on-off">
									<input id="lets-live-blog-<?php echo esc_attr( $id ); ?>" type="checkbox" value="<?php echo esc_attr( $current_value ); ?>" <?php checked( $current_value, 'on' ); ?> name="lets_live_blog_<?php echo esc_attr( $name ); ?>" class="lets-live-blog-input-val">
									<label for="lets-live-blog-<?php echo esc_attr( $id ); ?>">
										<span class="lets-live-blog-on-off-ux"></span>
									</label>
								</span>
							</div>
						<?php
							break;
						case 'drag':
							$count = 1;
							if ( ! empty( $current_value ) ) {
								$count = count( $current_value );
							}
						?>
							<div class="lets-live-blog-control-only">
								<div class="lets-live-blog-drag-wrap lets-live-blog-drag-drop" data-count="<?php echo intval( $count ); ?>">
									<?php $this->drag_field( array( 'choices' => $choices, 'current_value' => $current_value, 'name' => $name ) ); ?>
								</div>
								<div class="lets-live-blog-drag-el-dummy">
									 <?php $this->drag_field( array( 'choices' => $choices, 'name' => $name, 'dummy' => true ) ); ?>
								</div>
								<a href="#" class="lets-live-blog-drag-add"><span class="lets-live-blog-drag-plus"></span> <?php esc_attr_e( 'Add', 'lets-live-blog' ); ?></a>
							</div>
						<?php
							break;
						case 'radio-images':
						?>
							<span class="lets-live-blog-radio-images lets-live-blog-cf">
								<?php foreach ( $choices as $key => $value ) {

								$value['url']  = rtrim( $value['url'] , '/' );
								$ext = substr( $value['url'] , -3 );
								$retina = $ext == 'png'  ? substr_replace( $value[ 'url' ], '@2x', -4, 0) : '';
								?>

									<span class="lets-live-blog-radio-image">
										<input type="radio" id="<?php echo esc_attr( $id ) . '-' . $key; ?>" value="<?php echo esc_attr( $key );?>" <?php checked( $current_value, $key ); ?> name="lets_live_blog_<?php echo esc_attr( $name ); ?>" class="lets-live-blog-input-val">
										<label for="<?php echo esc_attr( $id . '-' . $key ); ?>">
											<?php if ( isset( $value['title'] ) ) { ?>
											<div class="lets-live-blog-label"><?php echo lets_live_blog_sanitize_wp_kses( $value['title'] ); ?></div>
											<?php } ?>
											<img class="<?php if ( !empty( $value['alt'] ) ) { ?>radio-image-alt radio-image-alt-1 <?php } ?>" src="<?php echo esc_url( $this->src_uri . $value['url'] ); ?>" <?php if ( ! empty ( $retina ) ) { ?>srcset="<?php echo esc_url( $this->src_uri . $retina ); ?> 2x" <?php } ?> alt="">
											<?php if ( !empty( $value['alt'] ) ) {

												$value['alt']  = rtrim( $value['alt'] , '/' );
												$ext = substr( $value['alt'] , -3 );
												$retina_alt =  $ext == 'png'  ? substr_replace( $value[ 'alt' ], '@2x', -4, 0) : '';
											?>
											<img class="radio-image-alt radio-image-alt-2" src="<?php echo esc_url( $this->src_uri . $value['alt'] ); ?>" <?php if ( ! empty ( $retina_alt ) ) { ?>srcset="<?php echo esc_url( $this->src_uri . $retina_alt ); ?> 2x" <?php } ?> alt="">
											<?php } ?>
										</label>
									</span>

								<?php } ?>
							</span>
						<?php
						break;
						case 'select':
						?>
							<div class="lets-live-blog-control-only">
								<select name="lets_live_blog_<?php echo esc_attr( $name ); ?>" class="lets-live-blog-input-val"  id="lets-live-blog-<?php echo esc_attr( $id ); ?>">
									<?php foreach ( $choices as $key => $value ) { ?>
										<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $current_value, $key ); ?>><?php echo lets_live_blog_sanitize_wp_kses( $value ); ?></option>
									<?php } ?>
								 </select>
							</div>
						<?php
						break;
						case 'color':
						?>
							<div class="lets-live-blog-control-only">
								<input type="text" class="lets-live-blog-color-pick lets-live-blog-input-val" value="<?php echo esc_attr( $current_value ); ?>" name="lets_live_blog_<?php echo esc_attr( $name ); ?>">
							</div>
						<?php
						break;
						case 'color-a':
						?>
							<div class="lets-live-blog-control-only">
								<input type="text" data-palette="false" class="lets-live-blog-color-pick-a lets-live-blog-input-val" value="<?php echo esc_attr( $current_value ); ?>" name="lets_live_blog_<?php echo esc_attr( $name ); ?>">
							</div>
						<?php
						break;
						case 'slider':
						?>
							<div class="lets-live-blog-control-only">
								<div class="lets-live-blog-slider" data-value="<?php echo esc_attr( $current_value ); ?>" data-min="<?php echo esc_attr( $choices['min'] ); ?>" data-max="<?php echo esc_attr( $choices['max'] ); ?>" data-step="<?php echo esc_attr( $choices['step'] ); ?>" data-default="<?php echo esc_attr( $default ); ?>"></div>
								<input name="lets_live_blog_<?php echo esc_attr( $name ); ?>" type="text" value="<?php echo esc_attr( $current_value ); ?>" class="lets-live-blog-input-val">
								<span class="lets-live-blog-data"><span class="lets-live-blog-val"><?php echo esc_attr( $current_value ); ?></span><span class="dashicons dashicons-backup lets-live-blog-reset" title="<?php esc_html_e( 'Reset to default', 'lets-live-blog' ); ?>"></span></span>
							</div>
						<?php
						break;
						case 'image':
							$id_or_src = isset( $choices['type'] ) && $choices['type'] == 'id' ? 'id' : 'src';
							$file_type = isset( $choices['file_type'] ) ? $choices['file_type'] : 'img';
						?>
							<div class="lets-live-blog-control-only<?php if ( $id_or_src == 'id' ) { ?> lets-live-blog-single-img-id<?php } ?>">
								<input <?php if ( $id_or_src == 'id' ) { ?>type="hidden"<?php } else { ?>type="text"<?php } ?> value="<?php if ( ! empty( $current_value ) ) { if ( $id_or_src == 'id' ) { echo intval( $current_value ); } else { echo esc_url( $current_value); } } ?>" name="lets_live_blog_<?php echo esc_attr( $name ); ?>" class="lets-live-blog-img-input lets-live-blog-input-val">
								<a href="#" class="lets-live-blog-upload" data-dest="lets-live-blog-meta-control-<?php echo esc_attr( $id ); ?>" data-output="<?php echo esc_attr( $id_or_src ); ?>" data-file-type="<?php echo esc_attr( $file_type ); ?>" data-name="lets_live_blog_<?php echo esc_attr( $name ); ?>"><i class="fa fa-upload" aria-hidden="true"></i> <?php esc_html_e( 'Upload', 'lets-live-blog' ); ?></a>
								<?php if ( ! empty( $current_value ) && $file_type == 'img' ) { ?>
									<span class="lets-live-blog-img">
										<?php
										if ( $id_or_src == 'id' ) {
											$current_value_img = wp_get_attachment_image_src ( $current_value, 'lets-live-blog-293-293' );
											$current_value_img = $current_value_img[0];
										} else {
											$current_value_img = $current_value;
										}
										?>
										<a href="#" class="lets-live-blog-remove lets-live-blog--x"></a>
										<img src="<?php echo esc_url( $current_value_img ); ?>" alt="">
									</span>

								<?php } ?>
							</div>

						<?php
						break;
						case 'gallery':
						$i = 1;
						?>
							<div class="lets-live-blog-control-only">
								<a href="#" class="lets-live-blog-gallery" data-dest="lets-live-blog-meta-control-<?php echo esc_attr( $id ); ?>" data-counter="<?php if ( !empty ( $current_value ) ) { echo intval( count( $current_value ) ); } else { echo intval( $i ); } ?>" data-name="lets_live_blog_<?php echo esc_attr( $name ); ?>"><i class="fa fa-picture-o" aria-hidden="true"></i> <?php esc_html_e( 'Edit Gallery', 'lets-live-blog' ); ?></a>
								<span class="lets-live-blog-gallery-images-wrap lets-live-blog-drag-drop">
									<?php if ( ! empty( $current_value ) ) { ?>

										<?php foreach ( $current_value as $key => $value) { ?>
											<span class="lets-live-blog-img">
												<?php $current_value_img = wp_get_attachment_image_src ( $value, 'lets-live-blog-293-293' ); ?>
												<a href="#" class="lets-live-blog-remove-gallery lets-live-blog--x"></a>
												<img src="<?php echo esc_url( $current_value_img[0] ); ?>" alt="">
												<input type="hidden" value="<?php echo ( $value ); ?>" name="lets_live_blog_<?php echo esc_attr( $name ); ?>[]" class="lets-live-blog-input-val">
											</span>
											<?php $i++; ?>
										<?php } ?>

									<?php } ?>
								</span>
							</div>
						<?php
						break;
						case 'background':
							$current_bg_repeat = isset( $current_value ['repeat'] ) ? $current_value ['repeat'] : 1;
							$current_bg_src = isset( $current_value ['src'] ) ? $current_value ['src'] : '';
							$current_bg_color = isset( $current_value ['color'] ) ? $current_value ['color'] : '';
							$current_bg_select = isset( $current_value ['src'] ) && ! empty( $current_value ['src'] ) ? '' : 'lets-live-blog-hide';
							?>
							<div class="lets-live-blog-control-only">
								<input class="lets-live-blog-color-pick lets-live-blog-input-val" name="lets_live_blog_<?php echo esc_attr( $name ); ?>[color]" type="text" value="<?php echo esc_attr( $current_bg_color ); ?>">
								<span class="tipi-img-input-wrap">
									<input type="text" value="<?php echo esc_url( $current_bg_src ); ?>" name="lets_live_blog_<?php echo esc_attr( $name ); ?>[src]" class="lets-live-blog-img-input lets-live-blog-input-val">
									<a href="#" class="lets-live-blog-upload" data-dest="lets-live-blog-meta-control-<?php echo esc_attr( $id ); ?>" data-output="src" data-name="lets_live_blog_<?php echo esc_attr( $name ); ?>"><i class="fa fa-upload" aria-hidden="true"></i> <?php esc_html_e( 'Upload', 'lets-live-blog' ); ?></a>
								</span>

								<select name="lets_live_blog_<?php echo esc_attr( $name ); ?>[repeat]" class="lets-live-blog-vis-switch <?php echo esc_attr( $current_bg_select ); ?>">
									<?php foreach ( $bg_repeat_args as $key => $value ) { ?>
										<option value="<?php echo intval( $key ); ?>" <?php selected( $current_bg_repeat, $key ); ?>><?php echo lets_live_blog_sanitize_wp_kses( $value ); ?></option>
									<?php } ?>
								</select>

								<?php if  ( ! empty( $current_bg_src ) ) { ?>
									<span class="lets-live-blog-img">
										<a href="#" class="lets-live-blog-remove lets-live-blog--x"></a>
										<img src="<?php echo esc_url( $current_bg_src ); ?>" alt="">
									</span>
								<?php } ?>
							</div>
						<?php
						break;
					}
					?>
				</div>

			<?php } ?>
			<?php if ( $closer == true ) { ?></div><?php } ?>
			</div>
		</div>
	<?php
	}
	public function drag_field( $args = array() ) {

		if ( empty( $args['current_value']) ) {
			$allvals = array();
			foreach ( $args['choices'] as $choice ) {
				$allvals[0][$choice['name']] =  '';
			}
		} else {
			$allvals = $args['current_value'];
		}

		$count = count( $args['choices'] );
		$i = 1;
		$j = 1;
		foreach ( $allvals as $key ) {
			?>
			<div class="lets-live-blog-drag-el">
				<div class="lets-live-blog-drag-x"></div>
				<?php foreach ( $args['choices'] as $choice ) {
					echo '<div class="drag-item-title">' . $choice['title'] . '</div>';
					if ( $choice['type'] == 'text' ) {
						?>
						<div class="lets-live-blog-text-wrap">
						<input <?php $this->drag_name( $args, $choice, $j ); ?> type="text" value="<?php echo esc_attr( $key[$choice['name']] ); ?>" class="lets-live-blog-input-val<?php if ( ! empty( $args['dummy'] ) ) { ?> lets-live-blog-data<?php } ?>">
						</div>
						<?php
					}
				}
				if ( $i = $count + 1 ) {
					$i = 1;
					$j++;
				}
				$i++;
				?>
			</div>
		<?php
		}

	}

	public function drag_name( $args, $choice, $j ) {
		if ( empty( $args['dummy'] ) ) { ?>
			name="lets_live_blog_<?php echo esc_attr( $args['name'] ) . '[' . intval( $j ) . '][' .  $choice['name'] . ']' ; ?>"
	<?php } else { ?>
		data-name="lets_live_blog_<?php echo esc_attr( $args['name'] ); ?>"
		data-choice="<?php echo esc_attr( $choice['name'] ); ?>"
	<?php }
}

}

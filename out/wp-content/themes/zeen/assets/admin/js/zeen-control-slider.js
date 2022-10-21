/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.0.8
 */
 (function( $ ) {

    'use strict';
    wp.customize.controlConstructor['zeen-slider'] = wp.customize.Control.extend({

        ready: function() {
            var control = this,
                value = undefined !== control.setting._value ? control.setting._value : '';

            control.container.find( '.zeen-slider' ).slider({
                min: control.params.choices.min,
                max: control.params.choices.max,
                step: control.params.choices.step,
                range: 'min',
                value: value,
                slide: function( event, ui ) {
                	var current = $(this).closest( '.zeen-control' );
                	current.find('.zeen-val-input').val( ui.value );
                	current.find('.zeen-val-show').html( ui.value );
                	if ( control.params.detection === 'stop' ) {
                		return;
                	}
                    control.setting.set( ui.value );
                },
                create: function( event, ui ) {
                	var current = $(this).closest( '.zeen-control' ),
                		tip = current.find('.zeen-tip'),
                		handle = current.find('.ui-slider-handle');
						handle.append(tip);
                },
                stop:  function( event, ui ) {
                	if ( control.params.detection !== 'stop' ) {
                		return;
                	}
                	var current = $(this).closest( '.zeen-control' );
                	current.find('.zeen-val-input').val( ui.value );
                	current.find('.zeen-val-show').html( ui.value );
                	control.setting.set( ui.value );
                }
            });

			control.container.on( 'input keyup', '.zeen-val-input', function() {
				 var slider = $(this).closest( '.zeen-control' ).find( '.zeen-slider' );
				 var newVal = $(this).val();
	                slider.slider({
	                    value: newVal,
	                });
	                control.setting.set( newVal );
	                slider.find('.zeen-val-show').html( newVal );
			});

            control.container.on( 'click', '.zeen-reset', function( event, ui ) {
            	var theContainer = $(this).closest( '.zeen-control' );
                var slider = theContainer.find( '.zeen-slider' ),
                    defaultVal = control.params.choices.default;
                slider.slider({
                    value: defaultVal,
                });
                theContainer.find('.zeen-val-input').val( defaultVal );
                theContainer.find('.zeen-val-show').html( defaultVal );
                control.setting.set( defaultVal );

            });

        }

    });

} )( jQuery );
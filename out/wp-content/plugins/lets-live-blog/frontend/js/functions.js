/**
 * Copyright: Codetipi
 * Plugin: Let's Live Blog
 * Version: 1.0.2
 */
 (function( $ ) {
	var Lets_Live_BlogScripts = {
		init: function() {
			this.cacheDom();
			this.cacheData();
			this.bindEvents();
			this.ajaxCheck( 'init' );
		},
		cacheDom: function() {
			this.$doc				= $( document );
			this.$win 				= $( window );
			this.$body				= $( 'body' );
			this.$entry 			= $( '.lets-live-blog-wrap' );
			this.$hls               = $( '#lets-live-blog-highlights' );
			this.$hlsa              = this.$hls.find( 'a' );
			this.$entryWrap			= this.$entry.find( '.lets-live-blog-entry-wrap' );
			this.$entryHl			= this.$entry.find( '.lets-live-blog-entry-hl-wrap' );
			this.$broadcasting		= this.$entry.data('status');
			this.higlightTitleLdd	= false;
			this.$entryCount		= '';
			this.todoList			= '';
		},
		cacheData: function() {
			this.$winWidth			= this.$win.width();
		},
		bindEvents: function() {
			this.$win.on( 'resize', this.resize.bind(this) );
			this.$hlsa.on( 'click', this.jumphl );
		},
		ajaxCheck: function( timing ) {
			if ( this.$broadcasting != 2 ) {
				return;
			}
			var vm = this;
			$.ajax({
		    	method: "GET",
			    url: letsLiveBlogJs.root_full + 'history',
			    data: 'pid=' + letsLiveBlogJs.data.pid,
			    beforeSend: function ( xhr ) {
			        xhr.setRequestHeader( 'X-WP-Nonce', letsLiveBlogJs.nonce );
			    },
			    success : function( response ) {
			    	if ( timing === 'init' ) {
			    		vm.$entryCount = response.length;
			    		vm.ajaxUpdate();
			    	}
			    	if ( response.length !== vm.$entryCount ) {
			    		vm.todoList = response.slice( - ( response.length - vm.$entryCount ) )
			    		vm.theQueue();
			    		vm.$entryCount = response.length;
			    	}
			    },
			    fail : function( response ) {
			        console.log( 'ERROR: T : 138' );
			    }
			});
		},
		theQueue: function() {
			var item = this.todoList.shift();
			if ( typeof item === 'undefined' ) {
				return;
			}
			if ( item[0] === 'add' ) {
				this.ajaxAdd( {item: item[1], hl: item[3] } );
			} else if ( item[0] === 'del' ){
				this.ajaxRemove( item[1] );
			} else {
				this.ajaxUpdates( item );
			}
		},
		ajaxAdd: function( args ) {
			var vm = this;
			$.ajax({
		    	method: "GET",
			    url: letsLiveBlogJs.root_full + 'entry',
			    data: { add: args['item'] },
			    beforeSend: function ( xhr ) {
			        xhr.setRequestHeader( 'X-WP-Nonce', letsLiveBlogJs.nonce );
			    },
			    success : function( response ) {
			    	if ( typeof( args['pos'] ) === 'undefined' ) {
						vm.$entryWrap.prepend( response[0].rendered );
						if ( args['hl'] !== false ) {
							vm.checkHlTitle();
							vm.$entryHl.prepend( response[0].renderedHl );
						}

					} else {
						vm.$entryWrap.children(':eq(' + args['pos']  + ')').attr('id', args['item'] ).replaceWith( response[0].rendered );
						var oldHl = $( '#live-feed-hl-' + args['oldItem'] );
						if ( args['hl'] !== false ) {
							vm.checkHlTitle();
							if ( oldHl.length > 0 ) {
								oldHl.replaceWith( response[0].renderedHl );
							} else {
								vm.$entryHl.prepend( response[0].renderedHl );
							}
						} else {
							if ( typeof( args['oldItem'] ) !== 'undefined' ) {
								oldHl.remove();
							}
						}
					}
					vm.theQueue();
			    },
			    fail : function( response ) {
			        console.log( 'ERROR: T : 138' );
			    }
			});
		},
		jumphl: function(e) {
			e.preventDefault();
			var anchor = $(this).attr('href');
			$( anchor )[0].scrollIntoView({block: 'start', behavior: 'smooth'});
		},
		checkHlTitle: function() {
			if ( this.higlightTitleLdd !== true ) {

				if ( ! this.$entryHl.prev().hasClass('box-pre-title') ) {
					this.$entryHl.before('<div class="box-pre-title">' + letsLiveBlogJs.data.i18n.jumphl + '</div>');
				}
				this.higlightTitleLdd = true;
			}
		},
		ajaxUpdates: function( item ) {
			this.ajaxAdd( {item: item[1], pos: item[2], hl: item[3], oldItem: item[4] } ); 
		},
		ajaxRemove: function( item ) {
			$( '#live-feed-' + item ).remove();
			$( '#live-feed-hl-' + item ).remove();
			this.theQueue();
		},
		ajaxUpdate: function() {
			var vm = this;
			setInterval(function() {
				vm.ajaxCheck();
			}, letsLiveBlogJs.data.timeInterval );
		},
		resize: function( el, value ) {
			this.cacheData();
		},

	};

	Lets_Live_BlogScripts.init();

} )( jQuery );

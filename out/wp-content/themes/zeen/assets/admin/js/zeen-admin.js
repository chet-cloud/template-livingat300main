"use strict";

/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.4
 */

/* global jQuery, zeenJS*/
(function ($) {
  'use strict';

  var zeenAdmin = {
    init: function init() {
      this.domInit();
      this.cache();
      this.bind();
      this.postInit();
      this.taxOptions();
      this.mediaOptions();
      this.menuState();
    },
    postInit: function postInit() {
      if (parseInt(zeenJS.args.builderActive) === 1) {
        this.builderButtonClasses();
      }
    },
    domInit: function domInit() {
      if (this.builderCheck() === false) {
        return;
      }

      var builderStatus = '';

      if (parseInt(zeenJS.args.builderActive) === 1) {
        builderStatus += zeenJS.i18n.textStatus + ': <span class="zeen-builder-active-text">' + zeenJS.i18n.textActive + '</span>';
      } else {
        builderStatus += zeenJS.i18n.textStatus + ': <span class="zeen-builder-inactive-text">' + zeenJS.i18n.textInactive + '</span>';
      }

      $('#poststuff .wp-editor-tabs').append('<button type="button" id="content-tipi-builder" class="wp-switch-editor switch-tipi-builder" data-wp-editor-id="builderr">Tipi Builder</button>');
      $('#wp-content-editor-tools').after('<div class="tipi-builder-area tipi-builder-loading"><div class="tipi-builder-area-inner">' + zeenJS.args.buttonLink + '</div></div>');
      $('.tipi-builder-area').find('a').wrapInner('<span></span>').prepend('<img src="' + zeenJS.args.tipiBuilderLogo[0] + '" srcset="' + zeenJS.args.tipiBuilderLogo[1] + ' 2x">');
      $('.tipi-builder-area').append('<span class="tipi-builder-bg"><p class="tipi-builder-status">' + builderStatus + '</p></span>');
    },
    cache: function cache() {
      this.$doc = $(document);
      this.$body = $('body');
      this.$builder = $('#tipi-builder-term');
      this.$mediaOptions = $('#zeen-media-options');
      this.$mediaOptionsV = this.$mediaOptions.find('.post-format-video');
      this.$mediaOptionsG = this.$mediaOptions.find('.post-format-gallery');
      this.$mediaOptionsA = this.$mediaOptions.find('.post-format-audio');
      this.$mediaVideo = $('#post-format-video');
      this.$mediaGallery = $('#post-format-gallery');
      this.$mediaAudio = $('#post-format-audio');
      this.$mediaOptionSource = $('#zeen-engine-source');
      this.$gutenberg = this.$body.hasClass('gutenberg-editor-page');
      this.wpContentWrap = $('#wp-content-wrap');
      this.builderButton = $('#content-tipi-builder');
      this.editorButtons = $('#content-html').add($('#content-tmce'));
    },
    mediaOptions: function mediaOptions() {
      if (!this.$mediaOptions.hasClass('moved-box') && !this.$gutenberg) {
        this.$mediaOptions.insertAfter($('#titlediv')).addClass('moved-box').hide();
        this.mediaOptionSource();
      }

      if (this.$mediaAudio.is(':checked') || this.$mediaVideo.is(':checked') || this.$mediaGallery.is(':checked')) {
        this.mediaOptionSource();
        this.$mediaOptions.show();

        if (this.$mediaAudio.is(':checked')) {
          this.$mediaOptions.addClass('show-media-a').removeClass('show-media-v show-media-g');
        }

        if (this.$mediaVideo.is(':checked')) {
          this.$mediaOptions.addClass('show-media-v').removeClass('show-media-a show-media-g');
        }

        if (this.$mediaGallery.is(':checked')) {
          this.$mediaOptions.addClass('show-media-g').removeClass('show-media-v show-media-a');
        }

        if (this.$gutenberg) {
          $('#zeen-engine-trig-section-media').addClass('show-media-v show-media-g show-media-a');
        }
      } else {
        this.$mediaOptions.removeClass('show-media-v show-media-g show-media-a').hide();
      }
    },
    mediaOptionSource: function mediaOptionSource() {
      this.$mediaOptions.removeClass('zeen-source-is-1 zeen-source-is-2');
      this.$mediaOptions.addClass('zeen-source-is-' + this.$mediaOptionSource.val());
    },
    bind: function bind() {
      this.$body.on('change', this.$mediaVideo, this.mediaOptions.bind(this));
      this.$body.on('change', this.$mediaAudio, this.mediaOptions.bind(this));
      this.$body.on('change', this.$mediaGallery, this.mediaOptions.bind(this));
      this.$doc.on('sortdeactivate sortstop', '#menu-to-edit', this.menuChange);
      this.$doc.on('focus click', '.submit-add-to-menu', this.menuChange);
      this.$doc.on('change keyup click', '.zeen-mm-quantity', this.menuChangeQuantity);
      this.$doc.on('click', '.zeen-mm-radio-image', this.menuChange);
      this.$doc.on('change', '.zeen-mm-order', this.menuChangeOrder);
      $(window).load(function () {
        zeenAdmin.taxOptions();
      });
      this.editorButtons.on('click', this.editorButtonClasses.bind(this));
      this.builderButton.on('click', this.builderButtonTr.bind(this));
    },
    builderButtonTr: function builderButtonTr() {
      $('.wp-editor-area').html();
      var wpeditorarea = $('.wp-editor-area').html();
      var vm = this;

      if (wpeditorarea !== '' && parseInt(zeenJS.tipiBuilderActive) !== 1) {
        var tipiModalWrap = $('#tipi-modal-wrap');

        if (tipiModalWrap.length === 0) {
          $('body').append('<div id="tipi-modal-wrap" class="tipi-modal-wrap"><div id="tipi-modal-inner" class="tipi-modal-inner tipi-modal-wrap-ani"></div></div>');
          var tipiModalInnerWrap = $('#tipi-modal-inner');
          tipiModalWrap = $('#tipi-modal-wrap');
          tipiModalInnerWrap.append('<div class="tipi-modal-header"><div class="tipi-modal-title">' + zeenJS.i18n.titleWarning + '</div><div class="zeen--x"></div></div>');
          tipiModalInnerWrap.append('<div class="tipi-modal-content">' + zeenJS.i18n.tipiModalContent + '</div>');
          tipiModalInnerWrap.append('<div class="tipi-modal-buttons"><div class="tipi-modal-cancel">' + zeenJS.i18n.titleCancel + '</div><div class="tipi-modal-ok">' + zeenJS.i18n.titleContinue + '</div></div>');
          tipiModalInnerWrap.find('.zeen--x, .tipi-modal-cancel').on('click', function () {
            tipiModalWrap.addClass('tipi-modal-wrap-inactive');
          });
          tipiModalInnerWrap.find('.tipi-modal-ok').on('click', function () {
            vm.builderButtonClasses();
            tipiModalWrap.addClass('tipi-modal-wrap-inactive');
          });
        } else {
          tipiModalWrap.removeClass('tipi-modal-wrap-inactive');
        }

        return;
      }

      this.builderButtonClasses();
    },
    builderButtonClasses: function builderButtonClasses() {
      if (this.builderCheck() === false) {
        return;
      }

      this.wpContentWrap.addClass('tipi-active').removeClass('tmce-active html-active');
      $('#zeen-options').hide();
      $('#lets-review-metabox').hide();
    },
    editorButtonClasses: function editorButtonClasses() {
      if (this.builderCheck() === false) {
        return;
      }

      this.wpContentWrap.removeClass('tipi-active');
      $('#zeen-options').show();
      $('#lets-review-metabox').show();
    },
    builderCheck: function builderCheck() {
      if (zeenJS.args.postType === 'page') {
        return true;
      } else {
        return false;
      }
    },
    taxOptions: function taxOptions() {
      if (this.$builder.data('builder') === 'on') {
        $('#zeen-engine-meta-control-layout, #zeen-engine-meta-control-background, #zeen-engine-meta-control-pagination, #zeen-engine-meta-control-sidebar-tids, #zeen-engine-meta-control-sidebar').hide();
      }
    },
    menuState: function menuState(e, ui) {
      if (this.$body.hasClass('wp-customizer')) {
        return;
      }

      $('.menu-item-depth-0').each(function (index, elem) {
        var $elem = $(elem);
        var $checked = $elem.find('input:checked').val();
        var $elemQuantity = $elem.find('.zeen-mm-quantity').val();
        var $elemOrder = $elem.find('.zeen-mm-order option:selected').val();
        $elem.removeClass('zeen-mm-type-1 zeen-mm-type-2 zeen-mm-type-11 zeen-mm-type-21 zeen-mm-type-31 zeen-mm-type-51 zeen-num-2 zeen-num-3 zeen-num-4 zeen-num-5 zeen-order-1 zeen-order-2 zeen-order-3').addClass('zeen-mm-type-' + $checked + ' zeen-num-' + $elemQuantity + ' zeen-order-' + $elemOrder);

        if ($elem.next().hasClass('menu-item-depth-1')) {
          $elem.addClass('alt-mm');
        } else {
          $elem.removeClass('alt-mm');
        }
      });
    },
    menuChangeOrder: function menuChangeOrder() {
      var theVal = $(this).val();
      $(this).closest('.menu-item').removeClass('zeen-order-1 zeen-order-2 zeen-order-3').addClass('zeen-order-' + theVal);
    },
    menuChangeQuantity: function menuChangeQuantity() {
      var theVal = $(this).val();
      $(this).closest('.menu-item').removeClass('zeen-num-2 zeen-num-3 zeen-num-4 zeen-num-5').addClass('zeen-num-' + theVal);
    },
    menuChange: function menuChange() {
      setTimeout(function () {
        zeenAdmin.menuState();
      }, 150);
    }
  };
  zeenAdmin.init();
})(jQuery);
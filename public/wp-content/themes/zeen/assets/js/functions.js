"use strict";

/**
 * Copyright: Codetipi
 * Theme: Zeen
 * Version: 1.4
 */

/* global jQuery, ScrollMagic, zeenJS, IntersectionObserver, imagesLoaded, TweenLite, Power2, Cookies, Linear, Power0, ga, _gaq, zeen */
var zeen = function ($) {
  "use strict";

  var zeenPrv = {
    init: function init() {
      this.dom();
      this.data();
      this.bind();
      this.anis();
      this.sticky();
      this.cta();
      this.sliderInit();
      this.lightboxClasses();
      this.lightboxInit();
      this.sidebars();
      this.infScr();
      this.fillRunner();
      this.mobileMenuClass();
      this.masonryInit();
      this.topBlock();
      this.anchorTouch();
      this.parallax3s();
      this.parallaxIt();
      this.noPar();
      this.hero31();
      this.ipl();
      this.imgControl();
      this.postTracks();
      this.qtyArrows();
      this.topBarMsg();
      this.videoWrap();
      this.woo();
      this.stickyCheck();
      this.stickyEl();
      this.twitchLoad();
    },
    loaded: function loaded() {
      this.slideInP();
      this.$topBarMsg.slideDown();
      this.subL();
      this.timedPup();
      this.verticalMenus();
    },
    woo: function woo() {
      if (this.wooArchive === true) {
        this.$products.imagesLoaded().progress(function (instance, image) {
          image.img.parentNode.parentNode.parentNode.classList.add('article-window');
        });
      }
    },
    dom: function dom() {
      this.$win = $(window);
      this.$doc = $(document);
      this.$body = $('body');
      this.$page = $('#page');
      this.$rtl = this.$body.hasClass('rtl');
      this.$content = $('#content');
      this.$timedPup = $('#timed-pup');
      this.$modal = $('#modal');
      this.$baseOverlay = $('#tipi-overlay');
      this.$skinMode = $('#mode__wrap');
      this.$modalCustom = this.$modal.find('.content-custom');
      this.$modalSearch = this.$modal.find('.content-search');
      this.$modalSearchField = this.$modalSearch.find('.search-field');
      this.$modalSearchFound = this.$modalSearch.find('.content-found');
      this.$dropSearch = $('.drop-search');
      this.$dropSearchFound = this.$dropSearch.find('.content-found');
      this.$dropSearchField = this.$dropSearch.find('.search-field');
      this.$searchResults = $('.search-all-results');
      this.resizing = false;
      this.$stickyOff = true;
      this.$header = $('#masthead');
      this.$trendingSecondary = $('#trending-secondary');
      this.$siteNav = $('#site-navigation');
      this.$secondaryWrap = $('#secondary-wrap');
      this.$stickyP2 = $('#sticky-p2-share');
      this.$dropper = this.$siteNav.find('.horizontal-menu > .dropper').add(this.$secondaryWrap.find('.horizontal-menu > .dropper')).add(this.$header.find('.horizontal-menu > .dropper'));
      this.$dropperChild = this.$dropper.find('.block-mm-changer');
      this.$lightbox = $('.tipi-lightbox');
      this.$toolTip = $('.tipi-tip');
      this.$toolTipOutput = '';
      this.$toolTipCurrent = '';
      this.headerOne = this.$header.hasClass('main-menu-inline');
      this.$wpAdminBar = $('#wpadminbar');
      this.$primary = $('#primary');
      this.$verticalMenu = $('#site-header-side-70s');
      this.$entryContentWrap = this.$primary.find('.entry-content-wrap');
      this.$entryContent = this.$primary.find('.entry-content');
      this.$parentAnimation = this.$primary.find('.parent-animation:not(.loaded)');
      this.$toTop = $('#to-top');
      this.$progress = $('#progress');
      this.$mobBotShare = $('#mob-bot-share');
      this.$iplTitle = $('#sticky-title');
      this.$slideIn = $('#slide-in-box');
      this.$slideInX = this.$slideIn.find('> .tipi-closer');
      this.$slideForm = this.$slideIn.find('form');
      this.slideInScene = '';
      this.mobMenuClearTO = '';
      this.resizeTo = '';
      this.pubTimer = '';
      this.qvWrapCache = '';
      this.$sorter = $('.sorter');
      this.$topBarMsg = $('#top-bar-message');
      this.$topBlock = $('#zeen-top-block');
      this.imgAni = document.getElementsByClassName('article-ani');
      this.$footer = $('#colophon');
      this.$footerBgArea = this.$footer.find('.bg-area');
      this.stickyVertical = false;
      this.$stickyMenu = $('.sticky-menu');
      this.stickyMenu = false;
      this.stickyMobMenu = false;
      this.$hero31 = $('.hero-31 > .hero');
      this.$controller = new ScrollMagic.Controller();
      this.$parallaxItCont = new ScrollMagic.Controller();
      this.$parallax3sController = new ScrollMagic.Controller();
      this.$main = $('#main');
      this.ignoreCodes = [9, 13, 16, 17, 18, 20, 32, 45, 116, 224, 93, 91];
      this.timer = 0;
      this.$slideInMenu = $('#slide-in-menu');
      this.$slideMenuOpen = $('.slide-menu-tr-open');
      this.$mobMenuOpen = $('.mob-tr-open');
      this.$mobMenuClose = $('.mob-tr-close');
      this.$mobHead = $('#mobhead');
      this.$mobMenu = this.$mobHead.find('.mobile-navigation').add($('#mob-menu-wrap').find('.mobile-navigation'));
      this.$mobMenuChildren = this.$mobMenu.find('.menu-item-has-children');
      this.thePaged = zeenJS.qry.paged;
      this.audio = new Audio();
      this.video = document.createElement('video');
      this.ajaxCall = '';
      this.ajaxData = {};
      this.wooArchive = '';
      this.$products = '';
      this.headAreaHeight = 0;
    },
    verticalMenus: function verticalMenus() {
      if (this.$verticalMenu.length === 0) {
        return;
      }

      this.$verticalMenu.addClass('v-70-vis');
    },
    data: function data() {
      this.$docHeight = this.$doc.height();
      this.$winWidth = this.$win.width();
      this.$winHeight = this.$win.height() + 1;
      this.$headerHeight = this.$header.outerHeight(true);
      this.$wpAdminBarHeight = 0;
      this.$wpAdminBarHeightNeg = 0;

      if (this.$body.hasClass('admin-bar') && !this.$body.hasClass('tipi-builder-frame-inner')) {
        this.$wpAdminBarHeight = this.$winWidth > 783 ? 32 : 46;
        this.$wpAdminBarHeightNeg = '-' + this.$wpAdminBarHeight;
      }

      this.mmAni = 0;

      if (this.$body.hasClass('mm-ani-3')) {
        this.mmAni = 3;
      }

      if (this.$body.hasClass('term-woocategory') || this.$body.hasClass('post-type-archive-product') || this.$body.hasClass('woocommerce-page')) {
        this.wooArchive = true;
        this.$products = this.$entryContentWrap.find('.products');
      }

      if (zeenPrv.$winWidth < 767) {
        this.headAreaHeight = this.$mobHead.outerHeight();
      } else {
        if (this.$header.hasClass('sticky-menu-1') || this.$header.hasClass('sticky-menu-3')) {
          this.headAreaHeight = this.$headerHeight;
        }

        if (this.$siteNav.hasClass('sticky-menu-1') || this.$siteNav.hasClass('sticky-menu-3')) {
          this.headAreaHeight = this.$siteNav.outerHeight();
        }
      }

      var passiveSupported = false;

      try {
        var options = Object.defineProperty({}, "passive", {
          get: function get() {
            passiveSupported = true;
          }
        });
        window.addEventListener("zeen", options, options);
        window.removeEventListener("zeen", options, options);
      } catch (err) {
        passiveSupported = false;
      }

      this.$listener = passiveSupported ? {
        passive: true
      } : false;
    },
    bind: function bind() {
      this.$win.on('resize', this.resize.bind(this));
      this.$win.on('orientationchange', this.orientationchange.bind(this));
      this.$toTop.on('click', this.toTopInit);
      this.$doc.on('keyup', this.keyUp.bind(this));
      this.$body.on('click touchstart', '.block-more', this.blockMore);
      this.$body.on('click', '.inf-load-more', this.loadMoreButton);
      this.$body.on('click', '.media-tr, .modal-tr', this.modalOn);
      this.$body.on('click', '.close, .tipi-overlay', this.modalOff);

      if (this.$modalSearchFound.length > 0) {
        this.$modalSearchField.on('keyup', this.liveSearch);
      }

      if (this.$skinMode.length > 0) {
        this.$skinMode.on('click', this.skinMode);
      }

      if (this.$dropSearchFound.length > 0) {
        this.$dropSearchField.on('keyup', function (event) {
          var wrapper = $(this).parent().parent();
          var args = {
            'field': $(this),
            'wrapper': wrapper,
            'ppp': 2,
            'results': wrapper.find('.content-found')
          };
          zeenPrv.liveSearch(event, args);
        });
      }

      if (this.$dropSearchFound.length > 0 || this.$modalSearchFound.length) {
        this.$searchResults.on('click', this.liveSearchTr);
      }

      this.$body.on('click', '.trending-op', this.trending);
      this.$mobMenuClose.on('click', this.closeMobMenu.bind(this));
      this.$mobMenuOpen.on('click', this.openMobMenu.bind(this));
      this.$mobMenu.on('click', '.open-child', this.verticalMenuShow);
      this.$slideMenuOpen.on('click', this.openSlideMenu.bind(this));
      this.$toolTip.on('mouseenter', this.toolTipInit);
      this.$body.on('click', '.tipi-like-count', this.likes);
      this.$slideInX.on('click', this.slideInPX.bind(this));
      this.$slideForm.on('submit', this.slideInSubmit.bind(this));
      this.$sorter.on('click', this.sorter);
      this.$body.on('click', '.tipi-basket-remove', this.removeBasket);
      this.$body.on('click', '#qty-plus', this.qtyArrowChange);
      this.$body.on('click', '#qty-minus', this.qtyArrowChange);
      this.$doc.on('updated_wc_div', function () {
        zeenPrv.qtyArrows();
      });
      this.$win.load(function () {
        zeenPrv.loaded();
      });
      this.$dropperChild.hoverIntent(this.blockMore);
      this.$dropper.hoverIntent(function (e) {
        var drop = $(this);
        drop.addClass('active active-1');

        if (zeenPrv.mmAni === 3) {
          var trigger = drop.find('> .menu');

          if (trigger.hasClass('mm-1')) {
            trigger = trigger.find('> .menu-wrap > .sub-menu');
          }

          trigger.css({
            'visibility': 'visible',
            'opacity': '1'
          }).hide().stop().slideDown(200);
        }
      }, function () {
        var drop = $(this);
        drop.removeClass('active');

        if (zeenPrv.mmAni === 3) {
          var trigger = drop.find('> .menu');

          if (trigger.hasClass('mm-1')) {
            trigger = trigger.find('> .menu-wrap > .sub-menu');
          }

          trigger.stop().slideUp(200);
        }
      });
    },
    trending: function trending(e) {
      var $selected = $(this);
      var $uid = $selected.parent().data('uid');
      var $blockData = $('#block-wrap-' + $uid);
      var $blockLoading = $blockData.find(' > div');

      if ($blockLoading.hasClass('loading')) {
        return;
      }

      var paged = $selected.data('r'),
          trendingName = 'now';

      if (paged === 1) {
        paged = 2;
      } else if (paged === 2) {
        paged = 7;
        trendingName = 'week';
      } else {
        paged = 30;
        trendingName = 'month';
      }

      $selected.siblings().removeClass('trending-selected');
      $selected.addClass('trending-selected');
      var setter = 'zeen_' + $uid;
      var blockData = window[setter];
      var args = {
        blockData: blockData,
        $blockData: $blockData,
        changer: false,
        append: 2,
        manual: true,
        response: ''
      };
      $.ajax({
        method: "GET",
        data: {
          uid: $uid,
          mm: true,
          excerpt_off: true,
          counter: true,
          counter_class: 'border',
          byline_off: true,
          review_off: true,
          data: blockData,
          trending: ['zeen-trending-' + trendingName, paged]
        },
        dataType: 'html',
        url: zeenJS.root + 'block',
        beforeSend: function beforeSend(xhr) {
          $blockLoading.addClass('loading');
          xhr.setRequestHeader('X-WP-Nonce', zeenJS.nonce);

          if (zeenPrv.ajaxChecker(setter + '_' + paged)) {
            args.response = zeenPrv.ajaxGetter(setter + '_' + paged);
            zeenPrv.ajaxLoadMore(args);
            $blockData.addClass('loaded');
            return false;
          }
        },
        success: function success(response) {
          response = JSON.parse(response);
          args.response = response;
          zeenPrv.ajaxLoadMore(args);
          zeenPrv.ajaxSetter(setter + '_' + paged, response);
          $blockData.addClass('loaded');
        },
        fail: function fail(response) {
          console.log('ERROR', response);
        }
      });
    },
    anchorTouch: function anchorTouch() {
      var touch = 'ontouchstart' in document.documentElement ? true : false;
      this.$dropper.each(function (index, elem) {
        var dropper = $(this),
            dropperA = dropper.find('> a'),
            href = dropperA.attr('href');

        if (typeof href !== 'undefined' && href.length > 1 && href.substring(0, 1) === '#') {
          dropperA.on('click.anchor', function (e) {
            e.preventDefault();
            var elemPos = $(href).offset().top;
            TweenLite.to(window, 1, {
              ease: Power2.easeInOut,
              scrollTo: elemPos - zeenPrv.headAreaHeight - zeenPrv.$wpAdminBarHeight
            });
          });
        }

        if (touch === false) {
          return true;
        }

        if (dropper.find('> .menu').length > 0) {
          dropperA.on('click', function (e) {
            var current = $(this);
            dropper.siblings('.tapped').removeClass('tapped');

            if ((dropper.find('.menu').length === 0 && dropper.find('.sub-menu').length === 0 || dropper.hasClass('tapped')) && current.attr('href') !== '#') {
              return true;
            } else {
              e.preventDefault();
              dropper.addClass('tapped');
            }
          });
        }
      });
    },
    topBlock: function topBlock() {
      if (this.$topBlock.length === 0 || this.$topBlock.hasClass('standard-ani') || this.$topBlock.hasClass('loaded')) {
        return;
      }

      var _this = this;

      this.$topBlock.imagesLoaded().always(function (instance) {
        var duration = _this.$topBlock.outerHeight(true);

        var args = {
          y: 100,
          opacity: 0.3
        };

        if (_this.$winWidth > 767) {
          if (_this.$topBlock.hasClass('zeen-top-block-92') || _this.$topBlock.hasClass('zeen-top-block-94')) {
            args = {
              opacity: 0.3
            };
          }
        }

        new ScrollMagic.Scene({
          triggerElement: 'body',
          offset: 0,
          duration: duration,
          triggerHook: 0
        }).setTween(_this.$topBlock.find('img'), args).addTo(zeenPrv.$controller);

        _this.$topBlock.addClass('loaded');
      });
    },
    anis: function anis(e) {
      this.tempAni();
      this.loopAni();
      this.blockAni();
    },
    tempAni: function tempAni() {
      var ani = document.getElementsByClassName('ani-base'),
          observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            imagesLoaded(entry.target, function (instance) {
              entry.target.classList.add('article-window');
            });
            entry.target.classList.remove('article-ani');
            var revs = entry.target.getElementsByClassName('lets-review-api-wrap');

            if (revs.length > 0 && (entry.target.parentElement.classList.contains('preview-review-bot') || entry.target.parentElement.parentElement.classList.contains('preview-review-bot'))) {
              setTimeout(function () {
                entry.target.classList.add('review-ani-done');
                TweenLite.fromTo(revs[0], 1, {
                  width: '0'
                }, {
                  width: revs[0].getAttribute('data-api-100') + '%',
                  ease: Power2.easeOut
                });
              }, 300);
            }

            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: [0]
      });

      for (var i = ani.length - 1; i >= 0; i--) {
        if (!ani[i].classList.contains('article-window')) {
          observer.observe(ani[i]);
        }
      }

      var cta = document.getElementsByClassName('block-wrap-cta'),
          ctaObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('cta-seen');
            ctaObs.unobserve(entry.target);
          }
        });
      }, {
        threshold: [0],
        rootMargin: '-100px 0px'
      });

      for (var i = cta.length - 1; i >= 0; i--) {
        if (!cta[i].classList.contains('cta-seen')) {
          ctaObs.observe(cta[i]);
        }
      }

      if (zeenJS.args.lazy !== true) {
        return;
      }

      var lazy = document.getElementsByClassName('zeen-lazy-load'),
          lazyObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = $(entry.target);
            img.attr('src', img.attr('data-zeen-src')).removeAttr('data-zeen-src').attr('srcset', img.attr('data-zeen-srcset')).removeAttr('data-zeen-srcset').attr('sizes', img.attr('data-zeen-sizes')).removeAttr('data-zeen-sizes');
            img.imagesLoaded(function () {
              img.removeClass('zeen-lazy-load').addClass('zeen-lazy-loaded');
              var imgArticle = img.closest('article');

              if (imgArticle.hasClass('masonry-child')) {
                var msnry = imgArticle.closest('.block-masonry');
                var $hasMasonry = msnry.data('masonry') ? true : false;

                if ($hasMasonry === true) {
                  msnry.masonry('layout');
                } else {
                  zeenPrv.masonryInit();
                }
              }
            });
            lazyObs.unobserve(entry.target);
          }
        });
      }, {
        threshold: [0],
        rootMargin: '300px 0px'
      });

      for (var i = lazy.length - 1; i >= 0; i--) {
        if (!lazy[i].classList.contains('zeen-lazy-loaded')) {
          lazyObs.observe(lazy[i]);
        }
      }
    },
    loopAni: function loopAni(e) {
      if (this.$winWidth < 1200) {
        return;
      }

      this.$primary.find('> .post-wrap').each(function () {
        var current = $(this);

        if (current.hasClass('loop-ani-checked')) {
          return true;
        }

        if (current.hasClass('align-fade-up') || current.hasClass('align-fade-up-done')) {
          var effect = current.hasClass('align-fade-up') ? 'fade-up' : 'fade-up-done';
          var ani = current.find('.alignleft, .alignright'),
              observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.boundingClientRect.top > 0) {
                entry.target.classList.add('tipi-seen');

                if (effect === 'fade-up-done') {
                  observer.unobserve(entry.target);
                }

                if (entry.isIntersecting === false) {
                  entry.target.classList.remove('tipi-seen');
                }
              }
            });
          }, {
            threshold: [0],
            rootMargin: '500px 0px 0px 0px'
          });

          for (var i = ani.length - 1; i >= 0; i--) {
            observer.observe(ani[i]);
          }
        }

        current.addClass('loop-ani-checked');
      });
    },
    blockAni: function blockAni() {
      var ani = document.getElementsByClassName('block-ani');

      if (ani.length === 0) {
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: [0]
      });

      for (var i = ani.length - 1; i >= 0; i--) {
        if (!ani[i].classList.contains('loaded')) {
          observer.observe(ani[i]);
        }
      }
    },
    twitchLoad: function twitchLoad() {
      var ani = document.getElementsByClassName('twitch');

      if (ani.length === 0) {
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var tw = $(entry.target);
            tw.append('<iframe width="1280" height="720" scrolling="no" frameborder="0" class="twitch-frame" src="' + tw.data('src') + '" frameborder="0" seamless="seamless" allowfullscreen="true"></iframe>');
            tw.find('iframe').load(function () {
              tw.addClass('ani-in loaded');
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: [0]
      });

      for (var i = ani.length - 1; i >= 0; i--) {
        if (!ani[i].classList.contains('loaded')) {
          observer.observe(ani[i]);
        }
      }
    },
    sorter: function sorter() {
      var $sorter = $(this);

      if ($sorter.hasClass('load-more-wrap')) {
        return;
      }

      zeenPrv.activeFocus($sorter);
    },
    activeFocus: function activeFocus(el) {
      if (el.hasClass('active')) {
        el.blur();
        el.removeClass('active');
        return;
      }

      el.addClass('active');

      if ('ontouchstart' in document.documentElement) {
        zeenPrv.$doc.on('touchstart', function (e) {
          el.removeClass('active');
          zeenPrv.$doc.off('touchstart');
          el.off('touchstart');
        });
        el.on('touchstart', function (e) {
          e.stopPropagation();
        });
      } else {
        el.focus();
        el.on({
          focusout: function focusout() {
            el.data('timer', setTimeout(function () {
              el.removeClass('active');
              el.off('focusin focusout');
            }, 0));
          },
          focusin: function focusin() {
            clearTimeout(el.data('timer'));
          }
        });
      }
    },
    loading: function loading(el, status) {
      if (status === 'on') {
        el.addClass('loading');
      } else {
        el.removeClass('loading');
      }
    },
    slideInP: function slideInP() {
      if (this.$slideIn.length === 0 || this.$winWidth < 767) {
        return;
      }

      var trigger = this.$content,
          offset = this.$winHeight * 2;

      if (this.$slideIn.hasClass('slide-in-2')) {
        // Wrap used for vertical galleries and sticky gets shifted
        if (this.$entryContentWrap.length > 0) {
          trigger = this.$entryContentWrap;
          offset = trigger.outerHeight(true);
        }
      }

      if (offset + trigger.offset().top > this.$docHeight) {
        offset = trigger.offset().top;
      }

      this.slideInScene = new ScrollMagic.Scene({
        triggerElement: trigger,
        offset: offset,
        triggerHook: 0.75
      }).addTo(zeenPrv.$controller).setClassToggle(this.$body, 'slide-in-active').setClassToggle(this.$slideIn, 'active');
    },
    slideInPX: function slideInPX() {
      this.$body.removeClass('slide-in-active');

      if (this.$slideIn.hasClass('slide-in-1')) {
        this.turnItOff(1);
      }

      if (this.$slideIn.hasClass('slide-in-2')) {
        this.turnItOff(2);
      }

      this.slideInScene.destroy(true);
    },
    slideInSubmit: function slideInSubmit() {
      this.turnItOff(1);
    },
    turnItOff: function turnItOff(arg) {
      if (arg === 1) {
        Cookies.set('wp_sliding_box', 'off', {
          expires: 60
        });
      } else if (arg === 2) {
        Cookies.set('wp_sliding_box_p', 'off', {
          expires: 7
        });
      } else if (arg === 3) {
        Cookies.set('wp_timed_pp', 'off', {
          expires: 90
        });
      } else if (arg === 4) {
        Cookies.set('wp_top_bar', 'off', {
          expires: 90
        });
      } else if (arg === 5) {
        Cookies.set('subL', 'off', {
          expires: 90
        });
      }
    },
    topBarMsg: function topBarMsg() {
      if (this.$topBarMsg.length === 0) {
        return;
      }

      $('#top-bar-message-close').on('click', function () {
        var closer = $(this);
        zeenPrv.$topBarMsg.slideUp();
        closer.off('click');
        zeenPrv.turnItOff(4);
      });
    },
    timedPup: function timedPup() {
      if (this.$timedPup.length === 0) {
        return;
      }

      var timer = this.$timedPup.data('t'),
          disable = this.$timedPup.data('d'),
          _this = this;

      if (typeof timer === 'undefined') {
        timer = 15000;
      } else {
        timer = timer * 1000;
      }

      setTimeout(function () {
        _this.modalOff();

        _this.$body.addClass('modal-active');

        _this.$baseOverlay.addClass('active');

        _this.$timedPup.addClass('active');

        if (disable === 1) {
          _this.$baseOverlay.on('click', function () {
            _this.turnItOff(3);

            _this.$baseOverlay.off('click');
          });
        }
      }, timer);
    },
    postTracks: function postTracks() {
      if (this.$progress.length === 0 && this.$mobBotShare.length === 0) {
        return;
      }

      this.$entryContent.each(function (index, elem) {
        var $elem = $(elem);

        if ($elem.hasClass('sticky-el')) {
          return true;
        }

        $elem.addClass('progresson');
        $elem.find('img').imagesLoaded(function () {
          var $elemOuter = $elem.outerHeight(true);
          var progressScene = new ScrollMagic.Scene({
            triggerElement: $elem,
            duration: $elemOuter,
            triggerHook: 0.5
          }).addTo(zeenPrv.$controller).on("enter leave", function (e) {
            if (e.type === 'leave') {
              zeenPrv.$progress.add(zeenPrv.$mobBotShare).addClass('inactive').removeClass('active');
            } else {
              zeenPrv.$progress.add(zeenPrv.$mobBotShare).removeClass('inactive').addClass('active');
            }
          });

          if (zeenPrv.$progress.length !== 0) {
            if (zeenPrv.$winHeight < $elemOuter + 50 || zeenPrv.$body.hasClass('ipl-done')) {
              progressScene.setTween(TweenLite.fromTo(zeenPrv.$progress, 3, {
                width: '0'
              }, {
                width: '100%',
                ease: Power0.easeNone
              }));
            }
          }
        });
      });
    },
    keyUp: function keyUp(e) {
      if (this.$modal.hasClass('inactive') && !this.$body.hasClass('slide-menu-open')) {
        return;
      }

      var keyCheck = false;

      if ('key' in e) {
        keyCheck = e.key === 'Escape' || e.key === 'Esc';
      } else {
        keyCheck = e.keyCode === 27;
      }

      if (keyCheck !== false) {
        this.closeSlideMenu(e);
        this.modalOff();
      }
    },
    masonryInit: function masonryInit() {
      $('.block-masonry').each(function () {
        var masonry = $(this);
        var $hasMasonry = masonry.data('masonry') ? true : false;
        masonry.removeClass('loaded');

        if ($hasMasonry === true) {
          masonry.masonry('destroy');
        }

        zeenPrv.masonry(masonry);
      });
    },
    masonry: function masonry(target) {
      if (target.length === 0) {
        return;
      }

      var $mas = target.imagesLoaded().always(function (instance) {
        $(instance.elements).find('article').addClass('fully-loaded');
        $mas.masonry({
          itemSelector: 'article',
          percentPosition: true,
          hiddenStyle: {
            transform: 'translateY(60px)',
            opacity: 0
          },
          visibleStyle: {
            transform: 'translateY(0px)',
            opacity: 1
          }
        });
        $mas.one('layoutComplete', function (event, items) {
          $(this).addClass('loaded');
        });
      });
    },
    mobileMenuClass: function mobileMenuClass() {
      this.$mobMenuChildren.find('> a').after('<a href="#" class="open-child"><i class="tipi-i-chevron-down"></i></a>');
    },
    verticalMenuShow: function verticalMenuShow(e) {
      e.preventDefault();
      var currentVerticalMenu = $(this);
      var currentParent = currentVerticalMenu.parent();
      var currentSiblings = currentParent.siblings('.menu-item-has-children');
      currentSiblings.find('> .opened-child').removeClass('opened-child');
      currentSiblings.find('> .child-is-open').removeClass('child-is-open');
      var currentVerticalSubMenu = currentParent.find('> .sub-menu');

      if (currentVerticalMenu.hasClass('child-is-open')) {
        currentVerticalMenu.removeClass('child-is-open');
        currentVerticalSubMenu.removeClass('opened-child');
      } else {
        currentVerticalMenu.addClass('child-is-open');
        currentVerticalSubMenu.addClass('opened-child');
      }
    },
    secondaryImgs: function secondaryImgs(event) {
      var hovered = $(this);

      if (event.type === 'mouseenter') {
        hovered.addClass('hovering');
      } else {
        hovered.removeClass('hovering');
      }
    },
    stickyCheck: function stickyCheck() {
      var el = document.createElement('a'),
          check = el.style;
      check.cssText = "position:sticky;position:-webkit-sticky;";
      this.$stickyOff = check.position.indexOf('sticky') !== -1;

      if (this.$stickyOff === false) {
        this.$body.addClass('sticky-disabled');
      }
    },
    stickyEl: function stickyEl() {
      var spacing;

      if (this.headAreaHeight === 0 || this.$stickyOff === false) {
        return;
      }

      $('.sticky-el').each(function (index, elem) {
        var $elem = $(this);

        if ($elem.hasClass('block-wrap') && parseInt($elem.find('> .tipi-row-inner-style').css('padding-top')) > 0) {
          spacing = 0;
        } else {
          spacing = 30;
        }

        if (zeenPrv.$winWidth < 767) {
          spacing = 15;
        }

        $elem.css('top', zeenPrv.headAreaHeight + zeenPrv.$wpAdminBarHeight + spacing);
      });
    },
    sticky: function sticky() {
      if (this.$stickyMenu.length === 0) {
        return;
      }

      this.$stickyMenu.each(function (index, elem) {
        var stickyElem = $(elem);

        if ((stickyElem.hasClass('site-header') || stickyElem.hasClass('stickied')) && zeenPrv.$winWidth < 768) {
          return;
        }

        if ((stickyElem.hasClass('site-mob-header') || stickyElem.hasClass('stickied')) && zeenPrv.$winWidth > 767) {
          return;
        }

        stickyElem.addClass('stickied');
        var lineSpacer = $('#header-line');
        var offset = 120,
            extras,
            stickyMenuType;

        if (stickyElem.hasClass('site-mob-header')) {
          offset = zeenPrv.$winHeight;
          lineSpacer = $('#mob-line');
        }

        var stickyElemHeight = stickyElem.outerHeight(true);
        var scene;

        if (stickyElem.hasClass('sticky-menu-2')) {
          stickyMenuType = 2;
          stickyElem.addClass('still');
          scene = new ScrollMagic.Scene({
            triggerElement: lineSpacer,
            triggerHook: 0
          }).addTo(zeenPrv.$controller).on('update', function (event) {
            if (event.scrollPos > event.startPos + 1) {
              if (zeenPrv.$controller.info('scrollDirection') === 'FORWARD') {
                stickyElem.removeClass('active');
              } else if (zeenPrv.$controller.info('scrollDirection') === 'REVERSE') {
                stickyElem.addClass('active').removeClass('still');
              }
            }

            var cutoff = zeenPrv.headerOne === true ? 1 : parseInt(event.startPos - stickyElemHeight - zeenPrv.$wpAdminBarHeight + 1);

            if (event.scrollPos < cutoff) {
              stickyElem.removeClass('stuck active').addClass('still');
            }
          }).on('enter', function (event) {
            stickyElem.addClass('stuck');
          });
        } else if (stickyElem.hasClass('sticky-menu-3')) {
          stickyMenuType = 3;
          scene = new ScrollMagic.Scene({
            triggerElement: lineSpacer,
            triggerHook: 0,
            offset: offset
          }).addTo(zeenPrv.$controller).on('update', function (event) {
            if (event.scrollPos > event.startPos) {
              stickyElem.addClass('slidedown stuck');
            } else if (event.scrollPos < event.startPos - stickyElemHeight - zeenPrv.$wpAdminBarHeight - offset + 1) {
              stickyElem.removeClass('slidedown stuck');
            }
          });

          if (zeenPrv.$body.hasClass('single-post') && stickyElem.hasClass('main-navigation')) {
            extras = true;
          }
        } else if (stickyElem.hasClass('sticky-menu-1') && !stickyElem.hasClass('site-mob-header')) {
          stickyMenuType = 1;
          scene = new ScrollMagic.Scene({
            triggerElement: lineSpacer,
            triggerHook: 0,
            offset: zeenPrv.$wpAdminBarHeight * -1
          }).addTo(zeenPrv.$controller);

          if (zeenPrv.$body.hasClass('single-post') && stickyElem.hasClass('main-navigation')) {
            extras = true;
          }
        }

        if (extras === true) {
          scene.on('update', function (event) {
            if (event.scrollPos > event.startPos) {
              stickyElem.addClass('stuck');
            }

            if (event.scrollPos > event.startPos + zeenPrv.$winHeight / 2) {
              stickyElem.addClass('stuck-full');

              if (zeenPrv.$controller.info('scrollDirection') === 'FORWARD') {
                stickyElem.removeClass('stuck-up');
              } else if (zeenPrv.$controller.info('scrollDirection') === 'REVERSE') {
                stickyElem.addClass('stuck-up');
              }
            }
          });
          scene.on('leave', function (event) {
            stickyElem.removeClass('stuck-up stuck-full stuck');
          });
        } else if (stickyMenuType !== 2) {
          scene.on('update', function (event) {
            if (event.scrollPos > event.startPos) {
              stickyElem.addClass('stuck');
            } else {
              stickyElem.removeClass('stuck');
            }
          });
        }

        if (stickyElem.hasClass('site-mob-header')) {
          zeenPrv.stickyMobMenu = scene;
        } else {
          zeenPrv.stickyMenu = scene;
        }
      });
    },
    liveSearchTr: function liveSearchTr(e) {
      e.preventDefault();
      $(this).closest('.search-form-wrap').find('> form').trigger('submit');
    },
    liveSearch: function liveSearch(e, args) {
      if (typeof args === 'undefined') {
        args = {
          'field': zeenPrv.$modalSearchField,
          'wrapper': zeenPrv.$modalSearch,
          'results': zeenPrv.$modalSearchFound
        };
      }

      if (zeenPrv.timer) {
        clearTimeout(zeenPrv.timer);
      }

      if ($.inArray(e.keyCode, zeenPrv.ignoreCodes) === -1) {
        zeenPrv.timer = setTimeout(zeenPrv.searchAjax(args), 700);
      }
    },
    searchAjax: function searchAjax(args) {
      var typing = args.field.val();
      args.wrapper.removeClass('with-results');

      if (typing.length < 2) {
        args.wrapper.addClass('zero-typo');
        return;
      }

      var ppp = 3;
      var child = 0;

      if (typeof args.ppp !== 'undefined') {
        ppp = args.ppp;
        child = 1;
      }

      $.ajax({
        method: "GET",
        url: zeenJS.root + 's?kw=' + typing + '&ppp=' + ppp,
        dataType: 'html',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', zeenJS.nonce);
          args.wrapper.css('height', args.wrapper.height());
        },
        success: function success(response) {
          args.results.empty();
          args.results.append(response);
          args.wrapper.removeClass('zero-typo');
          var articles = args.results.find('article');

          if (articles.length === 0) {
            args.wrapper.addClass('no-results-found');
          } else {
            args.wrapper.removeClass('no-results-found');

            if ((articles.length + 1) % 3 === 0) {
              args.results.find('.block').append('<article></article>');
            }
          }

          articles.imagesLoaded(function () {
            zeenPrv.blockAni();
            args.wrapper.css('height', 'auto');
          });
          args.wrapper.addClass('with-results with-results-cache');
        },
        fail: function fail(response) {
          console.log('ERROR', response);
        }
      });
    },
    mediaPlay: function mediaPlay() {
      zeenPrv.video.play();
      zeenPrv.audio.play();
    },
    mediaStop: function mediaStop() {
      zeenPrv.audio.pause();
      zeenPrv.video.pause();
    },
    subL: function subL() {
      if (zeenJS.args.subL === false || Cookies.get('subL') === 'off') {
        return;
      }

      document.documentElement.addEventListener('mouseleave', zeenPrv.subE, zeenPrv.$listener);
    },
    modalSubscribe: function modalSubscribe() {
      zeenPrv.$modal.addClass('active active-4').removeClass('inactive');
      zeenPrv.$body.addClass('modal-active');
      setTimeout(function () {
        zeenPrv.$modal.find('.content-subscribe input[type=email]').focus();
      }, 400);
    },
    modalOn: function modalOn(e) {
      e.preventDefault();
      var trigger = $(this),
          modalData = trigger.data(),
          modalOutput;

      if (modalData.type == 'frame' || modalData.type == 'qv' || modalData.type == 'embed' || modalData.type == '46') {
        zeenPrv.$modal.addClass('dark-overlay').removeClass('light-overlay');
      } else {
        zeenPrv.$modal.addClass('light-overlay').removeClass('dark-overlay');
      }

      if (modalData.type == 'frame' || modalData.type == 'embed' || modalData.type == '46') {
        if (modalData.source == 'ext') {
          if (modalData.src === '') {
            modalOutput = '<span class="embed-error">' + zeenJS.i18n.embedError + '</span>';
          } else {
            modalOutput = '<iframe width="560" height="315"  class="frame" src="' + modalData.src + '" frameborder="0" seamless="seamless" allowfullscreen></iframe>';
          }
        } else {
          if (modalData.format === 'audio') {
            if (zeenPrv.audio.canPlayType('audio/mpeg;')) {
              zeenPrv.audio.type = 'audio/mpeg';

              if (modalData.srcA !== '') {
                zeenPrv.audio.src = modalData.srcA;
              }
            } else {
              zeenPrv.audio.type = 'audio/ogg';

              if (modalData.srcB !== '') {
                zeenPrv.audio.src = modalData.srcB;
              }
            }

            zeenPrv.audio.controls = true;
            modalOutput = zeenPrv.audio;
            zeenPrv.mediaPlay();
          }

          if (modalData.format === 'video') {
            if (zeenPrv.video.canPlayType('video/mp4;')) {
              zeenPrv.video.type = 'video/mp4';

              if (modalData.srcA !== '') {
                zeenPrv.video.src = modalData.srcA;
              }
            } else {
              zeenPrv.video.type = 'video/ogg';

              if (modalData.srcB !== '') {
                zeenPrv.video.src = modalData.srcB;
              }
            }

            zeenPrv.video.setAttribute('controls', 'controls');
            zeenPrv.video.setAttribute('controlsList', 'nodownload');
            zeenPrv.mediaPlay();
            modalOutput = zeenPrv.video;
          }

          setTimeout(function () {
            zeenPrv.$modalCustom.addClass('ani-in');
          }, 350);
        }
      }

      if (modalData.type == 'frame') {
        zeenPrv.audio = new Audio();
        zeenPrv.video = document.createElement('video');
        zeenPrv.$modalCustom.addClass('is-' + modalData.format).append(modalOutput);
        zeenPrv.$modal.addClass('active active-1').removeClass('inactive');
        zeenPrv.$body.addClass('modal-active');
        zeenPrv.$modalCustom.addClass('tipi-spin ani-in');

        if (modalData.source == 'ext') {
          zeenPrv.$modalCustom.find('iframe').load(function () {
            zeenPrv.$modalCustom.addClass('frame-ldd').removeClass('tipi-spin');
          });
        } else {
          var obj = zeenPrv.$modalCustom.find('audio, video');
          obj.on('loadstart', function () {
            zeenPrv.$modalCustom.addClass('frame-ldd').removeClass('tipi-spin');
          });
        }
      }

      if (modalData.type == 'embed') {
        var embedTarget = $('.' + modalData.target);

        if (embedTarget.hasClass('active-embed')) {
          return;
        }

        embedTarget.append('<div id="frame-wrap" class="frame-wrap"></div>').addClass('active-embed is-' + modalData.format).removeClass('inactive-embed');
        $('#frame-wrap').append(modalOutput);
      }

      if (modalData.type == '46') {
        var triggerArticle = trigger.closest('article');

        if (triggerArticle.hasClass('playing')) {
          return;
        }

        var targetBlockWrap = $('#block-wrap-' + modalData.target);
        var targetBlockPiece1 = targetBlockWrap.find('.block-piece-1');
        var target = targetBlockPiece1.find('.mask');
        targetBlockPiece1.addClass('loading-embed').removeClass('active-embed');
        target.html('<div class="frame-wrap-46-pad"><div id="frame-wrap-' + modalData.target + '" class="frame-wrap tipi-spin frame-wrap-46"></div></div>');
        $('#frame-wrap-' + modalData.target).append(modalOutput);
        setTimeout(function () {
          targetBlockPiece1.addClass('active-embed embed-ldd-once');
        }, 150);

        if (trigger.hasClass('icon-size-s')) {
          triggerArticle.addClass('playing').siblings().removeClass('playing');
        }
      }

      if (modalData.type == 'search') {
        zeenPrv.$modal.addClass('active active-3').removeClass('inactive');
        zeenPrv.$body.addClass('modal-active');

        if (zeenPrv.$winWidth > 1024) {
          setTimeout(function () {
            zeenPrv.$modalSearchField.focus();
          }, 500);
        }
      }

      if (modalData.type == 'subscribe') {
        zeenPrv.modalSubscribe();
      }

      if (modalData.type == 'lwa') {
        zeenPrv.$modal.addClass('active active-2').removeClass('inactive');
        zeenPrv.$body.addClass('modal-active');
        setTimeout(function () {
          zeenPrv.$modal.find('.lwa-username > input').focus();
        }, 700);
      }

      if (modalData.type == 'search-drop') {
        zeenPrv.activeFocus(trigger.closest('.drop-search-wrap'));
        setTimeout(function () {
          trigger.parent().find('.search-field').focus();
        }, 250);
      }

      if (modalData.type == 'qv') {
        zeenPrv.$modal.addClass('active active-qv').removeClass('inactive');
        zeenPrv.$body.addClass('modal-active');
        zeenPrv.ajaxCall = $.ajax({
          method: "GET",
          dataType: 'html',
          url: zeenJS.root + 'qv?id=' + modalData.pid,
          beforeSend: function beforeSend(xhr) {
            zeenPrv.$modal.addClass('tipi-spin');
            zeenPrv.$modalCustom.empty().removeClass('is-video is-audio');
          },
          success: function success(response) {
            zeenPrv.$modalCustom.html(response);
            zeenPrv.qtyArrows();
            zeenPrv.$modalCustom.find('img').imagesLoaded().always(function (instance) {
              zeenPrv.$modal.removeClass('tipi-spin');
              setTimeout(function () {
                zeenPrv.$modalCustom.addClass('ani-in');
              }, 50);
            });
          },
          fail: function fail(response) {
            console.log('ERROR', response);
          }
        });
      }

      return false;
    },
    modalOff: function modalOff(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      zeenPrv.closeSlideMenu(e);
      zeenPrv.mediaStop();
      var to = 0;

      if (zeenPrv.$modalCustom.hasClass('ani-in')) {
        zeenPrv.$modalCustom.removeClass('ani-in');
        to = 220;
      }

      zeenPrv.$modal.removeClass('active active-qv active-4 active-3 active-2 active-1').addClass('inactive');
      zeenPrv.$body.removeClass('modal-active');
      zeenPrv.$timedPup.removeClass('active');
      setTimeout(function () {
        zeenPrv.$modalCustom.empty().removeClass('is-video is-audio');
      }, to);
      setTimeout(function () {
        zeenPrv.$modalSearch.removeClass('with-results-cache with-results');
        zeenPrv.$modalSearchField.val('');
      }, 600);

      if (zeenPrv.$body.hasClass('sub-l')) {
        zeenPrv.turnItOff(5);
      }
    },
    parallax3s: function parallax3s(override) {
      if (this.$body.hasClass('tipi-builder-frame-inner') && override !== true) {
        return;
      }

      var $parallax3s = $('.block-65');

      if ($parallax3s.length === 0 || this.$winWidth < 480) {
        return;
      }

      $parallax3s.find('> article').each(function (index, elem) {
        var $elem = $(elem);

        if ($elem.hasClass('parallaxed3s')) {
          return true;
        }

        $elem.addClass('parallaxed3s');
        $elem.imagesLoaded(function () {
          var elemOH = $elem.outerHeight(true);
          var $yData = $elem.hasClass('odd') ? elemOH * 0.35 : elemOH * 0.15;
          new ScrollMagic.Scene({
            triggerElement: $elem,
            triggerHook: 1,
            offset: 0,
            duration: zeenPrv.$winHeight + elemOH
          }).setTween(TweenLite.fromTo($elem.find('> .preview-mini-wrap'), 1, {
            y: $yData,
            ease: Linear.easeNone,
            force3D: true
          }, {
            y: "-" + $yData,
            ease: Linear.easeNone,
            force3D: true
          })).addTo(zeenPrv.$parallax3sController);
        });
      });
    },
    cta: function cta() {
      var $cta = $('.block-wrap-cta');

      if ($cta.length === 0) {
        return;
      }

      $cta.each(function (index, element) {
        var $elem = $(this);
        var $imgTag = $elem.find('.img-tag-bg');
        $imgTag.imagesLoaded({
          background: true
        }, function () {
          if ($imgTag.hasClass('cta-parallax') && !$elem.hasClass('parallaxed')) {
            var duration = $imgTag.outerHeight() + zeenPrv.$winHeight;
            new ScrollMagic.Scene({
              triggerElement: $imgTag,
              triggerHook: 1,
              duration: duration
            }).setTween(TweenLite.fromTo($imgTag.find('.bg'), 1, {
              y: '-20%',
              scale: 1,
              ease: Linear.easeNone
            }, {
              y: '20%',
              scale: 1.15,
              ease: Linear.easeNone
            })).addTo(zeenPrv.$parallaxItCont);
            $elem.addClass('parallaxed');
          }

          setTimeout(function () {
            $elem.addClass('cta-img-ldd');
          }, 200);
        });
      });
    },
    noPar: function noPar(override) {
      var $noPar = $('.no-par');

      if ($noPar.length === 0) {
        return;
      }

      $noPar.imagesLoaded(function () {
        $noPar.addClass('mask-loaded');
      });
    },
    parallaxIt: function parallaxIt(override) {
      var $parallaxIt = $('.parallax');

      if ($parallaxIt.length === 0 || this.$body.hasClass('tipi-builder-frame-inner') && override !== true) {
        return;
      }

      $parallaxIt.each(function (index, element) {
        var $elem = $(this);

        if ($elem.hasClass('parallaxed')) {
          return;
        }

        $elem.addClass('parallaxed');
        var isHero = '',
            scaleEnd = 1.1,
            $parallaxImg = $elem.find('img:not(.avatar)');
        $parallaxImg.imagesLoaded(function () {
          var $parallaximgheight = $parallaxImg.height(),
              parallaxQty = $parallaximgheight * 0.2 + 'px',
              duration = $parallaximgheight + zeenPrv.$winHeight,
              orientation = 1,
              imgOrientation = 1;

          if (zeenPrv.$winHeight > zeenPrv.$winWidth) {
            parallaxQty = $parallaximgheight * 0.125 + 'px';
            orientation = 2;
          }

          if ($elem.hasClass('hero-wrap')) {
            isHero = true;
            scaleEnd = 1.05;
            var parallaximgheight = parseInt($parallaxImg.attr('height'));
            var $parallaxImgWidth = parseInt($parallaxImg.attr('width'));
            var $elemWidth = $elem.width();

            if ($elemWidth < $parallaxImgWidth) {
              parallaximgheight = Math.floor(parallaximgheight / ($parallaxImgWidth / $elemWidth));
            }

            var $postWrap = $elem.closest('.post-wrap');
            var level = 0.9;

            if ($postWrap.hasClass('hero-m')) {
              scaleEnd = 1.1;
            } else if ($postWrap.hasClass('hero-l')) {
              scaleEnd = 1.15;
              level = 0.95;
            }

            if ($parallaxImgWidth < parallaximgheight) {
              $elem.addClass('is-portrait');
              imgOrientation = 2;
            } else if (orientation === 2) {
              level = 0.9;
            }

            if ($elem.hasClass('cover-11') || $postWrap.hasClass('hero-s')) {
              var height = $parallaximgheight * level,
                  diff = zeenPrv.$winHeight - zeenPrv.$headerHeight - zeenPrv.$wpAdminBarHeight - zeenPrv.$siteNav.outerHeight() - zeenPrv.$secondaryWrap.outerHeight();
              TweenLite.to($elem, 0.5, {
                height: height
              });
            }
          }

          new ScrollMagic.Scene({
            triggerElement: $elem,
            triggerHook: 1,
            duration: duration
          }).setTween(TweenLite.fromTo($parallaxImg, 1, {
            y: '-' + parallaxQty,
            scale: 1,
            ease: Linear.easeNone
          }, {
            y: parallaxQty,
            scale: scaleEnd,
            ease: Linear.easeNone
          })).addTo(zeenPrv.$parallaxItCont);
          setTimeout(function () {
            $elem.addClass('mask-loaded');
          }, 450);
        });
      });
    },
    hero31: function hero31() {
      if (this.$hero31.length === 0) {
        return;
      }

      var $figure = '';

      if (this.$hero31.closest('.post-wrap').hasClass('format-gallery')) {
        $figure = this.$hero31.find('> .slider');
        this.doHero31($figure);
      } else {
        $figure = this.$hero31.find('.fi-bg');
        $figure.imagesLoaded({
          background: true
        }, function () {
          $figure.addClass('fi-bg-ldd');
          TweenLite.to($figure, 0.3, {
            opacity: 1
          });
          setTimeout(function () {
            zeenPrv.doHero31($figure);
          }, 300);
        });
      }
    },
    doHero31: function doHero31($figure) {
      var hero31Controller = new ScrollMagic.Controller(),
          height = this.$winHeight - this.$wpAdminBarHeight;

      if (zeenPrv.$winWidth > 767) {
        height -= this.$headerHeight - this.$siteNav.outerHeight() - this.$secondaryWrap.outerHeight();
      } else {
        height -= this.$mobHead.outerHeight();
      }

      height -= this.$winHeight * 0.1;
      this.$hero31.parent().height(height);
      new ScrollMagic.Scene({
        triggerElement: this.$body,
        triggerHook: 0,
        offset: 0,
        duration: this.$winHeight * 0.1
      }).setTween($figure, {
        opacity: zeenJS.args.heroFade
      }).addTo(hero31Controller);
      new ScrollMagic.Scene({
        triggerElement: this.$body,
        triggerHook: 0,
        offset: 0,
        duration: this.$winHeight * 0.1
      }).setTween(this.$hero31.find('.mask-overlay'), {
        opacity: 1
      }).addTo(hero31Controller);
    },
    loadMoreButton: function loadMoreButton(e) {
      e.preventDefault();
      var $elem = $(this),
          $elemData = $elem.data();

      if ($elem.hasClass('loaded')) {
        return;
      }

      zeenPrv.loadMore($elem, $elemData);
    },
    infScr: function infScr() {
      var infScr = $('.inf-scr');

      if (infScr.length === 0) {
        return;
      }

      var $elem, $elemData;
      var mnp = infScr.first().data('mnp');
      infScr.each(function (index, elem) {
        $elem = $(elem);
        var $block = $elem.closest('.block-wrap');

        if ($elem.hasClass('loaded') || $elem.hasClass('inf-load-more') || $elem.hasClass('inf-scr-masonry') || $block.hasClass('dt-off') && zeenPrv.$winWidth > 767 || $block.hasClass('mob-off') && zeenPrv.$winWidth < 768) {
          return;
        }

        $elemData = $elem.data();
        $elemData.mnp = mnp;
        var scene = new ScrollMagic.Scene({
          triggerElement: $elem,
          triggerHook: 1,
          offset: -500
        }).addTo(zeenPrv.$controller).on('enter', function (e) {
          if ($elem.hasClass('loaded')) {
            scene.destroy();
            return;
          }

          zeenPrv.loadMore($elem, $elemData);
          $elem.addClass('loaded');
        });
      });
    },
    likes: function likes(e) {
      e.preventDefault();
      var elem = $(this);

      if (elem.hasClass('liking') || elem.hasClass('liked')) {
        return;
      }

      var data = elem.data();
      $.ajax({
        method: "POST",
        data: {
          'pid': data.pid
        },
        url: zeenJS.root + 'lk',
        beforeSend: function beforeSend(xhr) {
          elem.addClass('liking');
          xhr.setRequestHeader('X-WP-Nonce', zeenJS.nonce);
        },
        success: function success(response) {
          elem.removeClass('liking').addClass('liked');
          elem.find('.tipi-value').html(response[0]);
          Cookies.set('wp_liked_articles', response[1], {
            expires: 28
          });
        },
        fail: function fail(response) {
          console.log('ERROR', response);
        }
      });
    },
    ipl: function ipl() {
      var $ipl = $('.ipl');

      if ($ipl.length === 0 || zeenJS.args.iplMob !== true && zeenPrv.$winWidth < 768) {
        return;
      }

      $ipl.each(function (index, elem) {
        elem = $(this);
        var data = elem.data();

        if (elem.hasClass('loaded')) {
          return;
        }

        var scene = new ScrollMagic.Scene({
          triggerElement: $(elem),
          triggerHook: 1,
          offset: zeenPrv.$winHeight * -2
        }).addTo(zeenPrv.$controller).on('enter', function (e) {
          if (!elem.hasClass('loaded')) {
            zeenPrv.runIpl(elem, data);
            elem.addClass('loaded');
            setTimeout(function () {
              scene.destroy(true);
            }, 1000);
          }
        });
      });
    },
    updateHref: function updateHref(title, url) {
      window.history.pushState('', title, url);

      if (title !== '') {
        document.title = title;
      }
    },
    GA: function GA(url) {
      if (typeof _gaq !== 'undefined' && _gaq !== null) {
        _gaq.push(['_trackPageview', url]);
      }

      if (typeof ga !== 'undefined' && ga !== null) {
        ga('send', 'pageview', url);
      }
    },
    subE: function subE(e) {
      if (Cookies.get('subL') === 'off' && zeenJS.args.subCookie === true) {
        document.documentElement.removeEventListener('mouseleave', zeenPrv.subE, zeenPrv.$listener);
        return;
      }

      if (zeenPrv.$body.hasClass('modal-active') || e.clientY > 0) {
        return;
      }

      zeenPrv.$body.addClass('sub-l');
      zeenPrv.modalSubscribe();
    },
    runIpl: function runIpl(elem, data) {
      if (typeof data === 'undefined') {
        elem = $(this);
        data = elem.data();
      }

      $.ajax({
        method: "GET",
        data: {
          'pid': data.pid,
          ipl: true
        },
        dataType: 'html',
        url: zeenJS.root + 'ipl',
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', zeenJS.nonce);
        },
        success: function success(response) {
          zeenPrv.$primary.append(response);
          var $currentPost = zeenPrv.$primary.find('> .post-' + data.pid);
          var rect = $currentPost[0].getBoundingClientRect(),
              scrollTop = window.pageYOffset || document.documentElement.scrollTop,
              height = rect.top + scrollTop;

          if (zeenPrv.$winWidth > 767) {
            height -= 180;

            if (zeenPrv.$header.hasClass('sticky-menu-1') || zeenPrv.$header.hasClass('sticky-menu-3')) {
              height -= zeenPrv.$headerHeight;
            }

            if (zeenPrv.$siteNav.hasClass('sticky-menu-1') || zeenPrv.$siteNav.hasClass('sticky-menu-3')) {
              height -= zeenPrv.$siteNav.outerHeight();
            }
          }

          if (scrollTop > height) {
            window.scrollTo(0, height);
          }

          zeenPrv.sliderInit();
          zeenPrv.blockAni();
          zeenPrv.tempAni();

          for (var i = zeenJS.args.ipl.length - 1; i >= 0; i--) {
            $.get(zeenJS.args.pluginsUrl + '/' + zeenJS.args.ipl[i]);
          }

          if (zeenJS.args.fbComs === true && zeenJS.args.iplComs === true) {
            FB.XFBML.parse($currentPost[0]);
          }

          new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: 0.5,
            offset: 0
          }).addTo(zeenPrv.$controller).on('enter leave', function (e) {
            if (e.progress === 1) {
              if (zeenPrv.$progress.length > 0) {
                zeenPrv.$progress.css('background-color', data.nextHex);
              }

              zeenPrv.updateHref(data.titleNext, data.next);
              zeenPrv.GA(data.next);
              zeenPrv.$iplTitle.html(data.titleNext);

              if (zeenPrv.$stickyP2.length > 0) {
                zeenPrv.$stickyP2.find('.share-button-tw').attr('href', 'https://twitter.com/share?url=' + encodeURIComponent(data.next));
                zeenPrv.$stickyP2.find('.share-button-fb').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.next));
              }

              if (zeenPrv.$mobBotShare.length > 0) {
                zeenPrv.$mobBotShare.find('.share-button-tw').attr('href', 'https://twitter.com/share?url=' + encodeURIComponent(data.next));
                zeenPrv.$mobBotShare.find('.share-button-fb').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.next));
                zeenPrv.$mobBotShare.find('.share-button-msg').attr('href', 'fb-messenger://share/?link=' + encodeURIComponent(data.next));
                zeenPrv.$mobBotShare.find('.share-button-wa').attr('href', 'whatsapp://send?text=' + data.titleNext + ' – ' + encodeURIComponent(data.next));
              }

              if (zeenJS.args.disqus !== false) {
                var asr = $currentPost.find('.disqus-replace');

                if (asr.length > 0) {
                  $('#disqus_thread').attr('id', '').addClass('disqus-replace');
                  asr.attr('id', 'disqus_thread');
                  setTimeout(function () {
                    DISQUS.reset({
                      reload: true,
                      config: function config() {
                        this.page.identifier = data.pid;
                        this.page.url = data.next;
                        this.page.title = data.titleNext;
                      }
                    });
                  }, 50);
                }
              }
            } else {
              if (zeenJS.args.disqus !== false) {
                var asr = zeenPrv.$primary.find('> .post-' + data.pidori + ' .disqus-replace');

                if (asr.length > 0) {
                  $('#disqus_thread').attr('id', '').addClass('disqus-replace');
                  asr.attr('id', 'disqus_thread');
                  setTimeout(function () {
                    DISQUS.reset({
                      reload: true,
                      config: function config() {
                        this.page.identifier = data.pidori;
                        this.page.url = data.prev;
                        this.page.title = data.titlePrev;
                      }
                    });
                  }, 50);
                }
              }

              if (zeenPrv.$progress.length > 0) {
                zeenPrv.$progress.css('background-color', data.prevHex);
              }

              zeenPrv.updateHref(data.titlePrev, data.prev);
              zeenPrv.GA(data.prev);
              zeenPrv.$iplTitle.html(data.titlePrev);

              if (zeenPrv.$stickyP2.length > 0) {
                zeenPrv.$stickyP2.find('.share-button-tw').attr('href', 'https://twitter.com/share?url=' + encodeURIComponent(data.prev));
                zeenPrv.$stickyP2.find('.share-button-fb').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.prev));
              }

              if (zeenPrv.$mobBotShare.length > 0) {
                zeenPrv.$mobBotShare.find('.share-button-tw').attr('href', 'https://twitter.com/share?url=' + encodeURIComponent(data.prev));
                zeenPrv.$mobBotShare.find('.share-button-fb').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.prev));
                zeenPrv.$mobBotShare.find('.share-button-msg').attr('href', 'fb-messenger://share/?link=' + encodeURIComponent(data.prev));
                zeenPrv.$mobBotShare.find('.share-button-wa').attr('href', 'whatsapp://send?text=' + data.titlePrev + ' – ' + encodeURIComponent(data.prev));
              }
            }
          });
          var iplScene = new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: 1,
            offset: 0
          }).addTo(zeenPrv.$controller).on('enter', function (e) {
            zeenPrv.$body.addClass('ipl-done');
            $currentPost.removeClass('ipl-loading');
            $currentPost.prev().addClass('ipl-bg');
            zeenPrv.parallaxIt();
            zeenPrv.noPar();
            setTimeout(function () {
              zeenPrv.sidebars();
              zeenPrv.reSidebars();
              zeenPrv.stickyEl();
              zeenPrv.imgControl();
              iplScene.destroy(true);
            }, 750);
            setTimeout(function () {
              zeenPrv.postTracks();
            }, 900);
          });
          zeenPrv.$entryContent = $('.entry-content:not(.progresson)');
          zeenPrv.videoWrap();
          zeenPrv.stickyEl();
          zeenPrv.loopAni();
          zeenPrv.ipl();

          if (zeenPrv.$primary.find('.no-more-articles-wrap').length > 0) {
            $('#ipl-loader').addClass('ipl-end');
          }

          if (zeenPrv.$skinMode.length > 0 && zeenPrv.$skinMode.hasClass('triggered')) {
            if (zeenPrv.$skinMode.hasClass('mode--dark')) {
              $currentPost.removeClass('article-layout-skin-1').addClass('article-layout-skin-2');
            } else {
              $currentPost.removeClass('article-layout-skin-2').addClass('article-layout-skin-1');
            }
          }
        },
        fail: function fail(response) {
          console.log('ERROR', response);
        }
      });
      $('.inf-scr').removeClass("active");
    },
    blockMore: function blockMore(e) {
      var $elem = $(this);

      if (!($elem.hasClass('block-mm-changer') && e.type === 'click')) {
        e.preventDefault();
      }

      if ($elem.hasClass('no-more') || $elem.hasClass('active')) {
        return;
      }

      var $elemPa, $elemMenu, mm, mmChanger;

      if ($elem.hasClass('block-mm-changer')) {
        $elemMenu = $elem.closest('.menu');

        if (parseInt($elemMenu.data('mm')) < 10 || parseInt($elemMenu.data('mm')) > 50) {
          return;
        }

        $elemPa = $elemMenu.find('.block-wrap');
        mm = true;
        mmChanger = true;
      } else {
        $elemPa = $elem.closest('.block-wrap');

        if ($elemPa.parent().hasClass('menu-wrap')) {
          mm = true;
        }
      }

      var data = $elem.data(),
          parentData = $elemPa.data();
      var $blockData = $('#block-wrap-' + parentData.id);
      var $blockLoading = $blockData.find('> div');

      if ($blockLoading.hasClass('loading')) {
        return;
      }

      var changer = $elem.hasClass('block-changer') ? true : false,
          dataDir = typeof data.dir !== 'undefined' && data.dir === 1 ? 1 : 2,
          trigger_type = typeof data.dir === 'undefined' ? 1 : 2,
          append = trigger_type,
          paged,
          loaders,
          term = {
        term: data.term,
        id: data.tid
      },
          setter = 'zeen_' + parentData.id;

      if (window[setter].target !== 0 && (typeof data.tid === 'undefined' || data.tid === 0)) {
        setter = setter + '_' + window[setter].target;
      }

      if (data.tid > 0) {
        setter = setter + '_' + data.tid;

        if (typeof window[setter] === 'undefined') {
          window[setter] = $.extend(true, {}, window['zeen_' + parentData.id]);
          window[setter].args.cat = '';
          window[setter].args.tag__in = '';
          window[setter].args.post__in = '';
          window[setter].term = '';

          if (data.term === 'category') {
            window[setter].args.cat = data.tid;
          } else if (data.term === 'post_tag') {
            window[setter].args.tag__in = data.tid;
          } else {
            window[setter].args.tax_query = {
              taxonomy: term.term,
              field: 'term_id',
              'terms': term.id
            };
            window[setter].term = term;
          }
        }

        window['zeen_' + parentData.id].target = data.tid;
      }

      if (data.reset === 1) {
        setter = 'zeen_' + parentData.id;
        window[setter].target = 0;
      }

      var title = data.title,
          reset = data.reset,
          subtitle = data.subtitle,
          newUrl = data.ur,
          $elemN = $elemPa.find('.block-more-2'),
          $elemP = $elemPa.find('.block-more-1'),
          mnp;

      if ($elemN.length === 0) {
        $elemN = $elemPa.find('.block-more-3');
      } else {
        if (typeof data.term !== 'undefined') {
          $elemN.data({
            term: data.term,
            tid: data.tid
          });
          $elemP.data({
            term: data.term,
            tid: data.tid
          });
        } else {
          $elemN.removeData('term').removeData('tid');
          $elemP.removeData('term').removeData('tid');
        }
      }

      if (changer === true) {
        paged = 1;
        append = 2;

        if ($elem.hasClass('block-mm-changer')) {
          $elemMenu.find('.active').removeClass('active');
        } else {
          var $sorter = $elem.closest('.sorter');
          $sorter.find('.block-changer').removeClass('active');
          $sorter.find('.current-txt').html(data.sorttitle + zeenJS.args.iconSorter);
        }

        if ($elem.hasClass('block-mm-init')) {
          $elemMenu.find('.block-mm-init').removeClass('block-mm-init');
        }

        $elem.addClass('active');
        window[setter].next = 2;
        window[setter].prev = 0;
        mnp = data.mnp;

        if (mnp === 1) {
          loaders = 'off';
        }
      } else {
        mnp = window[setter].mnp;

        if (dataDir === 1) {
          paged = window[setter].prev;
          window[setter].prev = parseInt(window[setter].prev) - 1;
          window[setter].next = parseInt(window[setter].next) - 1;
        } else {
          paged = window[setter].next;
          window[setter].prev = parseInt(window[setter].prev) + 1;
          window[setter].next = parseInt(window[setter].next) + 1;
        }
      }

      var blockData = window[setter],
          args = {
        blockData: blockData,
        $blockData: $blockData,
        $elemN: $elemN,
        $elemP: $elemP,
        dir: data.dir,
        changer: changer,
        trigger_type: trigger_type,
        append: append,
        loaders: loaders,
        title: title,
        newUrl: newUrl,
        reset: reset,
        subtitle: subtitle,
        response: ''
      };
      $.ajax({
        method: "GET",
        data: {
          paged: paged,
          type: trigger_type,
          mm: mm,
          term: term,
          data: blockData
        },
        dataType: 'html',
        url: zeenJS.root + 'block',
        beforeSend: function beforeSend(xhr) {
          if (mmChanger === true) {
            if ($elemMenu.parent().find('> a').data('ppp') >= data.count) {
              args.loaders = 'off';
            }
          }

          $blockLoading.addClass('loading tipi-spin');
          xhr.setRequestHeader('X-WP-Nonce', zeenJS.nonce);

          if (zeenPrv.ajaxChecker(setter + '_' + paged)) {
            args.response = zeenPrv.ajaxGetter(setter + '_' + paged);
            zeenPrv.ajaxLoadMore(args);

            if (mmChanger === true) {
              $elemPa.closest('.mm-wrap').addClass('active-1');
            } else if (mm === true) {
              $elemPa.closest('.mm-wrap').removeClass('active-1');
            }

            if (append === 2) {
              if (dataDir === 1) {
                $elemPa.removeClass('loaded block-ani-r').addClass('block-ani-l');
              } else {
                $elemPa.removeClass('loaded block-ani-l').addClass('block-ani-r');
              }
            }

            zeenPrv.reSidebars();
            $elemPa.addClass('loaded');
            return false;
          }
        },
        success: function success(response) {
          response = JSON.parse(response);
          args.response = response;
          zeenPrv.ajaxLoadMore(args);

          if (mmChanger === true) {
            $elemPa.closest('.mm-wrap').addClass('active-1');
          } else if (mm === true) {
            $elemPa.closest('.mm-wrap').removeClass('active-1');
          }

          zeenPrv.ajaxSetter(setter + '_' + paged, response);
          $elemPa.addClass('loaded');
          zeenPrv.parallax3s();

          if (append === 2) {
            if (dataDir === 1) {
              $elemPa.removeClass('block-ani-r').addClass('block-ani-l');
            } else {
              $elemPa.removeClass('block-ani-l').addClass('block-ani-r');
            }
          }
        },
        fail: function fail(response) {
          console.log('ERROR', response);
        }
      });
      return false;
    },
    ajaxLoadMore: function ajaxLoadMore(args) {
      var $items = $(args.response[1]);

      if (typeof args.title !== 'undefined' || typeof args.subtitle !== 'undefined') {
        var titleTarget = args.$blockData.find('.block-title-wrap');

        if (typeof args.title !== 'undefined') {
          if (typeof args.newUrl !== 'undefined') {
            titleTarget.find('.block-title-url').attr('href', args.newUrl).html(args.title);
          } else {
            titleTarget.find('.block-title').html(args.title);
          }
        }

        if (typeof args.subtitle !== 'undefined') {
          titleTarget.find('.block-subtitle').html(args.subtitle);
        }
      }

      var target = args.$blockData.find('.block');
      var masonryTarget = target.find('> .block-masonry');

      if (masonryTarget.length > 0) {
        target = masonryTarget;
        target.addClass('masonry-ajax');
      }

      if (args.append === 1) {
        if (args.$blockData.hasClass('block-wrap-grid')) {
          target.last().after($items);
        } else {
          target.append($items);
        }

        if (masonryTarget.length > 0) {
          target.imagesLoaded(function () {
            target.append($items);
            zeenPrv.tempAni();
            target.find('article').addClass('fully-loaded');
            args.$blockData.find('> div').removeClass('loading tipi-spin');
            target.masonry('appended', $items);
            zeenPrv.reSidebars();
          });
        } else {
          zeenPrv.reSidebars();
        }
      } else {
        if (args.$blockData.hasClass('block-wrap-grid')) {
          args.$blockData.css('height', args.$blockData.height());

          if (target.length === 1) {
            target.replaceWith($items);
          } else {
            $items = $items.filter(function () {
              return this.nodeType === 1;
            });

            for (var i = 0; i < target.length; i++) {
              target[i].replaceWith($items[i]);
            }
          }

          target.imagesLoaded(function () {
            args.$blockData.css('height', 'auto');
          });
        } else {
          target.css('height', target.height());
          target.html($items);
          target.imagesLoaded(function () {
            target.css('height', 'auto');
          });
        }

        if (masonryTarget.length > 0) {
          target.masonry('destroy');
          zeenPrv.masonry(target);
          target.imagesLoaded(function () {
            zeenPrv.tempAni();
            target.find('article').addClass('fully-loaded');
            args.$blockData.find('> div').removeClass('loading tipi-spin');
          });
        }
      }

      if (args.manual !== true) {
        if (args.changer === true) {
          if (args.loaders === 'off') {
            args.$elemN.addClass('no-more');
            args.$elemP.addClass('no-more');

            if (args.$elemN.hasClass('block-more-3')) {
              args.$elemN.html(zeenJS.i18n.noMore);
            }
          } else {
            args.$elemN.removeClass('no-more');
            args.$elemP.addClass('no-more');

            if (args.$elemN.hasClass('block-more-3')) {
              args.$elemN.html(zeenJS.i18n.loadMore);
            }
          }
        } else {
          if (args.trigger_type === 1) {
            if (args.blockData !== '' && args.blockData.next > args.response[0]) {
              args.$elemP.html(zeenJS.i18n.noMore).addClass('no-more');
            }
          } else {
            args.$elemN.removeClass('no-more');
            args.$elemP.removeClass('no-more');

            if (args.blockData !== '' && args.blockData.prev === 0) {
              args.$elemP.addClass('no-more');
              args.$elemN.removeClass('no-more');
            }

            if (args.blockData !== '' && args.response[0] < args.blockData.next) {
              if (args.blockData.prev !== 0) {
                args.$elemP.removeClass('no-more');
              }

              args.$elemN.addClass('no-more');
            }
          }
        }
      }

      if (masonryTarget.length === 0) {
        args.$blockData.find('> div').removeClass('loading tipi-spin');
        zeenPrv.fillRunner();
        zeenPrv.tempAni();
      }
    },
    ajaxGetter: function ajaxGetter(ajaxCall) {
      return zeenPrv.ajaxData[ajaxCall];
    },
    ajaxSetter: function ajaxSetter(ajaxCall, ajaxData) {
      zeenPrv.ajaxDeleter(ajaxCall);
      zeenPrv.ajaxData[ajaxCall] = ajaxData;
    },
    videoWrap: function videoWrap() {
      $('iframe[src*="youtube"], iframe[src*="vimeo.com"], iframe[src*="dailymotion"]').each(function () {
        var $this = $(this),
            thisParent = $this.parent();

        if (!thisParent.hasClass('video-wrap') && !thisParent.hasClass('content-custom') && !$this.hasClass('elementor-video-iframe')) {
          $this.wrap('<div class="video-wrap"></div>');
        }
      });
    },
    skinMode: function skinMode(e) {
      e.preventDefault();
      zeenPrv.$skinMode.addClass('triggered');

      if (zeenPrv.$skinMode.hasClass('mode--dark')) {
        zeenPrv.$skinMode.removeClass('mode--dark');
        zeenPrv.$primary.find('> .article-layout-skin-2').removeClass('article-layout-skin-2').addClass('article-layout-skin-1');
      } else {
        zeenPrv.$skinMode.addClass('mode--dark');
        zeenPrv.$primary.find('> .article-layout-skin-1').removeClass('article-layout-skin-1').addClass('article-layout-skin-2');
      }
    },
    removeBasket: function removeBasket(e) {
      e.preventDefault();
      var trigger = $(this);
      var pid = trigger.data('pid');
      zeenPrv.ajaxCall = $.ajax({
        method: "POST",
        url: zeenJS.root + 'remove?pid=' + pid,
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', zeenJS.nonce);
          trigger.parent().addClass('loading');
        },
        success: function success(response) {
          zeenPrv.$body.trigger('wc_fragment_refresh');
        },
        fail: function fail(response) {
          console.log('ERROR', response);
        }
      });
    },
    imgControl: function imgControl(resize) {
      this.$primary.find('> .post-wrap').each(function () {
        var current = $(this);
        var element = current.find('.entry-content .alignnone');
        var img = element.add(current.find('.entry-content .aligncenter'));

        if (img.length > 0) {
          var imgObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('embed-vis');
                imgObs.unobserve(entry.target);
              }
            });
          }, {
            threshold: [0],
            rootMargin: '-100px 0px'
          });
          var currentImg;
          img.each(function (index, elem) {
            currentImg = $(this);

            if (!currentImg.hasClass('embed-vis')) {
              imgObs.observe(currentImg[0]);
            }
          });
        }
      });
    },
    ajaxDeleter: function ajaxDeleter(ajaxCall, target) {
      if (target === true) {
        for (var el in zeenPrv.ajaxData) {
          if (el.indexOf(ajaxCall) === 0) {
            delete zeenPrv.ajaxData[el];
          }
        }

        if (typeof window[ajaxCall + '_2'] !== 'undefined') {
          window[ajaxCall + '_2'] = '';
        }
      } else {
        delete zeenPrv.ajaxData[ajaxCall];
      }
    },
    ajaxChecker: function ajaxChecker(ajaxCall) {
      if (typeof window[ajaxCall] !== 'undefined' && window[ajaxCall] !== '') {
        zeenPrv.ajaxData[ajaxCall] = window[ajaxCall];
        return true;
      }

      if (typeof zeenPrv.ajaxData[ajaxCall] !== 'undefined') {
        return true;
      }
    },
    loadMore: function loadMore(elem, data) {
      elem.addClass('loaded');

      if (typeof zeenPrv.thePaged === 'undefined' || zeenPrv.thePaged === 0) {
        zeenPrv.thePaged = 1;
      }

      if (typeof data === 'undefined') {
        elem = $(this);
        data = elem.data();
      }

      var elemBlockWrap = elem.closest('.block-wrap');
      var type = data.type;

      if (type === 4) {
        type = 3;
      }

      var target = elemBlockWrap,
          masonry;

      if (elemBlockWrap.hasClass('block-masonry-wrap')) {
        target = target.find('.block > .block-masonry');
        masonry = true;
      } else if (elemBlockWrap.hasClass('block-wrap-65')) {
        target = target.find('.block');
        masonry = 65;
      } else {
        target = target.find('> .tipi-row-inner-style > .tipi-row-inner-box');
      }

      var currentLoader;
      $.ajax({
        method: "POST",
        data: {
          preview: data.preview,
          mnp: data.mnp,
          qry: zeenJS.qry,
          paged: zeenPrv.thePaged,
          frontpage: zeenJS.args.frontpage,
          basePagi: window.location.pathname,
          type: type
        },
        url: zeenJS.root + 'pagi',
        dataType: 'html',
        beforeSend: function beforeSend(xhr) {
          zeenPrv.thePaged = parseInt(zeenPrv.thePaged) + 1;
          xhr.setRequestHeader('X-WP-Nonce', zeenJS.nonce);
          currentLoader = elemBlockWrap.find('.inf-load-more-wrap:not(.inf-loaded)').addClass('tipi-spin inf-loading');
        },
        success: function success(response) {
          var $items = $(response),
              item;
          var masonryAppend = $items,
              offset;

          if (masonry === true) {
            offset = zeenPrv.getDetails(target);
            elemBlockWrap.find('.inf-scr:not(.inf-scr-masonry)').css('top', offset.height - 200);
            elemBlockWrap.find('.inf-scr').addClass('inf-scr-masonry');
            target.addClass('masonry-ajax');
            target.append(masonryAppend);
            target.imagesLoaded(function () {
              zeenPrv.tempAni();
              target.find('article').addClass('fully-loaded');
              target.masonry('appended', masonryAppend);
              $items.each(function () {
                item = $(this);

                if (item.hasClass('pagination') || item.hasClass('inf-scr')) {
                  elemBlockWrap.find(' > .tipi-row-inner-style > .tipi-row-inner-box').append(item);
                }
              });
              currentLoader.addClass('inf-scr-masonry').css('top', offset.height - 200);
              zeenPrv.infPagi(elem, data);
              currentLoader.removeClass('tipi-spin inf-loading').addClass('inf-loaded');
              zeenPrv.infScr();
            });
          } else {
            if (masonry === 65) {
              offset = zeenPrv.getDetails(target);
              elemBlockWrap.find('.inf-scr:not(.inf-scr-masonry)').css('top', offset.height - 200).addClass('inf-scr-masonry');
              currentLoader.addClass('inf-scr-masonry').css('top', offset.height - 200);
              $items.each(function () {
                item = $(this);

                if (item.hasClass('pagination') || item.hasClass('inf-scr')) {
                  elemBlockWrap.append(item);
                } else {
                  target.append(item);
                }
              });
            } else {
              target.append($items);
            }

            currentLoader.removeClass('tipi-spin inf-loading').addClass('inf-loaded');
            zeenPrv.tempAni();
            zeenPrv.parallax3s();
            zeenPrv.infScr();
            zeenPrv.fillRunner();
            zeenPrv.infPagi(elem, data);
          }
        },
        fail: function fail(response) {
          console.log('ERROR', response);
        }
      });
      $('.inf-scr').removeClass("active");
    },
    infPagi: function infPagi(elem, data) {
      new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 1,
        offset: '100px'
      }).addTo(zeenPrv.$controller).on("enter leave", function (e) {
        if (e.progress === 1) {
          zeenPrv.updateHref(data.titleNext, data.next);
          zeenPrv.GA(data.next);
        } else {
          zeenPrv.updateHref(data.titlePrev, data.prev);
          zeenPrv.GA(data.prev);
        }
      });
      this.reSidebars();
    },
    reSidebars: function reSidebars() {
      $('.sticky-on').each(function () {
        $(this).data('hcSticky').refresh();
      });
    },
    sidebars: function sidebars() {
      var builder = '';

      if (this.$body.hasClass('tipi-builder-frame-inner')) {
        builder = true;
      }

      var _this = this,
          stickies;

      if (zeenPrv.$winWidth < 1020) {
        stickies = $('.sticky-sb-on:not(.sidebar-wrap)');
      } else {
        stickies = $('.sticky-sb-on');
      }

      stickies.each(function () {
        var sb = $(this),
            heightCheck,
            isSb = false;
        sb.imagesLoaded(function () {
          if (sb.hasClass('sidebar-wrap')) {
            isSb = true;
            heightCheck = sb.find('> .sidebar').outerHeight(true);
          } else {
            heightCheck = sb.outerHeight(true);
          }

          var navH = 0;

          if (_this.$siteNav.hasClass('sticky-menu')) {
            if (!_this.$siteNav.hasClass('sticky-menu-2')) {
              navH = _this.$siteNav.outerHeight();
            }
          } else {
            var navP = _this.$siteNav.closest('site-header');

            if (navP.length > 0 && !navP.hasClass('sticky-menu-2')) {
              navH = _this.$siteNav.outerHeight();
            }
          }

          var top = 30 + zeenPrv.$wpAdminBarHeight + navH;

          if (_this.$winWidth < 1020 && isSb === true || _this.$winWidth < 767) {
            top = 0;
          }

          if (_this.$winHeight < heightCheck + top) {
            if (sb.hasClass('sticky-on') || builder === true) {
              sb.removeClass('sticky-sb sticky-el');
              return;
            }

            sb.addClass('sticky-on').hcSticky({
              top: top,
              resizeDebounce: 300
            });
          } else {
            sb.addClass('sticky-sb sticky-el');
            sb.css('top', top);
          }
        });
      });
    },
    sliderInit: function sliderInit() {
      var sliders = $('.slider');

      if (sliders.length === 0) {
        return;
      }

      sliders.each(function () {
        var $slider = $(this),
            $sliderData = $slider.data(),
            arrows = true,
            artArrows = false,
            run = true,
            art,
            fh = 0,
            hideMeta,
            $sliderToArrow = $slider;
        var args = {
          wrapAround: true,
          imagesLoaded: true,
          draggable: false,
          pageDots: false,
          setGallerySize: false,
          prevNextButtons: false,
          cellSelector: '.slide',
          contain: true,
          rightToLeft: zeenPrv.$rtl
        };

        if (zeenPrv.$winWidth < 768 === true) {
          args.draggable = true;
        }

        if ($slider.hasClass('flickity-enabled')) {
          run = false;
        }

        if ($sliderData.s === 10) {
          hideMeta = true;

          if ($sliderData.fh === 1) {
            fh = 1;
          }

          if ($sliderData.fs === 's' || $sliderData.fs === 'm') {
            args.fullscreen = true;
          }
        }

        if ($sliderData.s > 50 && $sliderData.s < 60) {
          art = true;
          args.setGallerySize = true;
          args.adaptiveHeight = true;
          args.selectedAttraction = 0.0925;
          args.friction = 0.725;

          if ($sliderData.s !== 51 && $sliderData.s !== 55) {
            args.autoPlay = zeenJS.args.sDelay;
          }
        }

        if ($sliderData.s === 51 || $sliderData.s === 55) {
          artArrows = true;
          arrows = false;
          args.selectedAttraction = 0.2;
          args.friction = 0.8;
        }

        if (zeenPrv.$winWidth > 768) {
          if ($sliderData.s === 52) {
            args.groupCells = 2;
          } else if ($sliderData.s === 53) {
            args.groupCells = 3;
          } else if ($sliderData.s === 54) {
            args.groupCells = 4;
          }
        }

        if ($sliderData.s === 15) {
          arrows = false;
          args.wrapAround = false;
        }

        if ($sliderData.s === 16) {
          args.wrapAround = false;
          args.cellAlign = 'left';
          $sliderToArrow = $slider.prev();
          args.asNavFor = $sliderToArrow[0];
        }

        if ($sliderData.s === 21) {
          args.setGallerySize = true;
          args.wrapAround = false;
          args.adaptiveHeight = true;
        }

        if (run === true) {
          $slider.on('ready.flickity', function () {
            $slider.addClass('slider-ldd');

            if ($sliderData.s === 21) {
              $slider.removeClass('tipi-spin');
            }

            var slides;

            if ($sliderData.s > 50) {
              slides = $slider.find('article');
            } else {
              slides = $slider.find('img');
            }

            if ($sliderData.s === 51 || $sliderData.s === 55) {
              slides.first().imagesLoaded(function () {
                $slider.addClass('slider-rdy');
              });
            } else if ($sliderData.s === 52) {
              slides.slice(0, 1).imagesLoaded(function () {
                $slider.addClass('slider-rdy');
              });
            } else if ($sliderData.s === 53) {
              slides.slice(0, 2).imagesLoaded(function () {
                $slider.addClass('slider-rdy');
              });
            } else if ($sliderData.s === 54) {
              slides.slice(0, 3).imagesLoaded(function () {
                $slider.addClass('slider-rdy');
              });
            } else if ($sliderData.s === 10 || $sliderData.s === 15) {
              slides.imagesLoaded(function (e) {
                $slider.addClass('slider-rdy');
                $slider.closest('.hero-wrap').addClass('mask-loaded');
              });
            }
          });
          $slider.flickity(args);
          var flkty = '';

          if (args.wrapAround === false) {
            flkty = $slider.data('flickity');
          }

          if ($sliderData.s === 21) {
            $slider.css('counter-reset', 'list ' + (flkty.slides.length + 1));
          }

          if (arrows === true) {
            var prev = $slider.find('.slider-arrow-prev');
            var next = $slider.find('.slider-arrow-next');
            prev.on('click', function () {
              $sliderToArrow.flickity('previous');

              if (args.wrapAround === false) {
                if (flkty.selectedIndex === 0) {
                  prev.addClass('disabled');
                } else {
                  prev.removeClass('disabled');
                }

                if (flkty.selectedIndex === flkty.slides.length - 1) {
                  next.addClass('disabled');
                } else {
                  next.removeClass('disabled');
                }
              }
            });
            next.on('click', function () {
              $sliderToArrow.flickity('next');

              if (args.wrapAround === false) {
                if (flkty.selectedIndex === 0) {
                  prev.addClass('disabled');
                } else {
                  prev.removeClass('disabled');
                }

                if (flkty.selectedIndex === flkty.slides.length - 1) {
                  next.addClass('disabled');
                } else {
                  next.removeClass('disabled');
                }
              }
            });
          }

          if (hideMeta === true) {
            $slider.on('change.flickity', function (event, index) {
              if (!zeenPrv.$body.hasClass('gallery-viewing')) {
                $slider.on('mouseleave', function () {
                  zeenPrv.$body.removeClass('gallery-viewing');
                  $slider.off('mouseleave');
                });
              }

              zeenPrv.$body.addClass('gallery-viewing');
            });
          }

          if (artArrows === true) {
            var flkty = $slider.data('flickity');
            var $sliderArrows = $slider.find('.slider-arrow');
            $sliderArrows.on('click', function () {
              var arrow = $(this);
              if (arrow.data('doing')) return;
              arrow.data('doing', true);
              var start = flkty.selectedIndex;

              if (arrow.hasClass('slider-arrow-next')) {
                $sliderToArrow.flickity('next');
              } else {
                $sliderToArrow.flickity('previous');
              }

              var finish = flkty.selectedIndex;

              if (flkty.cells.length > 1) {
                zeenPrv.sliderAlt(flkty, start, finish);
              }
            });

            if (zeenJS.args.sDelay > 0) {
              $slider.data('autoplay', true);
              setInterval(function () {
                if ($slider.data('autoplay') === true) {
                  var start = flkty.selectedIndex;
                  $sliderToArrow.flickity('next');
                  var finish = flkty.selectedIndex;

                  if (flkty.cells.length > 1) {
                    zeenPrv.sliderAlt(flkty, start, finish);
                  }
                }
              }, zeenJS.args.sDelay);
              $slider.on('mouseenter', function () {
                $slider.data('autoplay', false);
              });
              $slider.on('mouseleave', function () {
                $slider.data('autoplay', true);
              });
            }

            $slider.on('settle.flickity', function (event, index) {
              $sliderArrows.removeData('doing');
            });
            $slider.on('settle.flickity', function (event, index) {
              $sliderArrows.removeData('doing');
            });
          }
        }

        if (fh == 1) {
          if (zeenPrv.$winWidth > 1019) {
            var height = zeenPrv.$winHeight - zeenPrv.$wpAdminBarHeight;

            if (!zeenPrv.$header.hasClass('site-header-53') && !zeenPrv.$header.hasClass('site-header-54') && !zeenPrv.$header.hasClass('site-header-55')) {
              height -= zeenPrv.$headerHeight;
            }

            $slider.css('height', height + 'px');
          } else {
            $slider.css('height', '');
          }

          setTimeout(function () {
            $slider.flickity('reposition');
          }, 50);
        }
      });
    },
    sliderAlt: function sliderAlt(flkty, start, finish) {
      var length = flkty.cells.length;

      if (finish === length) {
        finish = 0;
      }

      var dir = !(start === 0 && finish === length - 1) && (finish === 0 && start === length - 1 || start < finish) ? 'R' : 'L',
          $start = $(flkty.slides[start].cells[0].element),
          $finish = $(flkty.slides[finish].cells[0].element),
          outerWidth = flkty.slides[start].outerWidth,
          ease = Power2.easeInOut,
          outerWidthCalc = outerWidth - outerWidth * 0.2,
          finishR = dir === 'R' ? -Math.abs(outerWidthCalc) : outerWidthCalc,
          startMaskL = dir === 'L' ? -Math.abs(outerWidthCalc) : outerWidthCalc,
          startL = dir === 'L' ? -Math.abs(outerWidth) : outerWidth,
          startR = dir === 'R' ? -Math.abs(outerWidth) : outerWidth;

      for (var i = flkty.slides.length - 1; i >= 0; i--) {
        flkty.slides[i].cells[0].element.classList.remove('old-slide', 'new-slide');
      }

      $start.addClass('old-slide');
      $finish.addClass('new-slide');
      TweenLite.fromTo($finish, 0.6, {
        x: startL
      }, {
        x: 0,
        ease: ease
      });
      TweenLite.fromTo($start, 0.6, {
        x: 0
      }, {
        x: startR,
        ease: ease
      });
      TweenLite.fromTo($finish.find('> .mask'), 0.6, {
        x: finishR
      }, {
        x: 0,
        ease: ease
      });
      TweenLite.fromTo($start.find('> .mask'), 0.6, {
        x: 0
      }, {
        x: startMaskL,
        ease: ease
      });
      TweenLite.fromTo($finish.find('> .meta'), 0.6, {
        x: startR
      }, {
        x: 0,
        ease: ease
      });
      TweenLite.fromTo($start.find('> .meta'), 0.6, {
        x: 0
      }, {
        x: startL,
        ease: ease
      });
    },
    lightboxClasses: function lightboxClasses() {
      this.$entryContent.find('a').has('img').each(function () {
        var attrTitle = $('img', this).attr('title'),
            $instance = $(this),
            attrHref = $instance.attr('href');

        if (typeof attrTitle !== 'undefined') {
          $instance.attr('title', attrTitle);
        }

        if (typeof attrHref !== 'undefined' && $instance.data('rel') !== 'prettyPhoto[product-gallery]') {
          var splitHref = attrHref.split('.'),
              ext = $(splitHref)[$(splitHref).length - 1];

          if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') {
            $instance.addClass('tipi-lightbox');
          }
        }
      });
    },
    lightboxInit: function lightboxInit() {
      if (zeenJS.args.lightbox === true) {
        this.$lightbox.swipebox();
      }
    },
    toolTipInit: function toolTipInit(e) {
      if (zeenPrv.$winWidth < 1200) return;
      zeenPrv.$toolTipCurrent = $(this);
      zeenPrv.$toolTipCurrent.addClass('tipi-tipped');
      var direction = 'tipi-tip-wrap-b';

      if (zeenPrv.$toolTipCurrent.hasClass('tipi-tip-r')) {
        direction = 'tipi-tip-wrap-r';
      }

      if (zeenPrv.$toolTipCurrent.hasClass('tipi-tip-l')) {
        direction = 'tipi-tip-wrap-l';
      }

      var output = '<div class="tipi-tip-wrap font-s ' + direction + '">' + '<div class="inner">' + zeenPrv.$toolTipCurrent.data('title') + '</div>' + '<div class="detail"></div>' + '</div>';
      zeenPrv.$body.append(output);
      zeenPrv.$toolTipOutput = zeenPrv.$body.find(' > .tipi-tip-wrap:not(.removing)');

      if (zeenPrv.$toolTipCurrent.hasClass('tipi-tip-move')) {
        zeenPrv.$toolTipCurrent.on('mousemove', zeenPrv.tooltipLive);
        zeenPrv.$toolTipOutput.addClass('tipi-tip-mover');
      } else {
        zeenPrv.tooltipSetup();
      }

      zeenPrv.$toolTipCurrent.on('mouseleave', zeenPrv.tooltipDestroy);
    },
    tooltipDestroy: function tooltipDestroy() {
      zeenPrv.$toolTipOutput.addClass('removing');
      setTimeout(function () {
        $('.removing').remove();
      }, 500);
      zeenPrv.$toolTipCurrent.off('mouseleave mousemove');
    },
    tooltipLive: function tooltipLive(e) {
      zeenPrv.tooltipSetup({
        'left': e.clientX,
        'top': e.clientY
      });
    },
    tooltipSetup: function tooltipSetup(args) {
      if (typeof args === 'undefined') {
        args = {};
      }

      if (typeof args.output === 'undefined') {
        args.output = zeenPrv.$toolTipOutput;
      }

      if (typeof args.current === 'undefined') {
        args.current = zeenPrv.$toolTipCurrent;
      }

      var instanceDetails = zeenPrv.getDetails(args.output);
      var offset = zeenPrv.getDetails(args.current);

      if (typeof args.left === 'undefined') {
        args.left = offset.left + offset.width / 2 - instanceDetails.width / 2;
      } else {
        args.left = args.left - instanceDetails.width / 2;
      }

      if (typeof args.top === 'undefined') {
        args.top = offset.top;
        args.top = args.top + offset.height;
      } else {
        args.top = args.top + 10;
      }

      if (args.current.hasClass('tipi-tip-r')) {
        args.top = offset.top + offset.height / 2 - instanceDetails.height / 2;
        args.left = offset.width + offset.left + 10;
      } else if (args.current.hasClass('tipi-tip-l')) {
        args.top = offset.top + offset.height / 2 - instanceDetails.height / 2;
        args.left = offset.left - instanceDetails.width - 10;
      }

      args.output.css({
        left: args.left,
        top: args.top
      }).addClass('tipi-tip-wrap-visible');
    },
    getDetails: function getDetails(elem) {
      var output = elem[0].getBoundingClientRect();
      return {
        left: output.left,
        top: output.top,
        width: output.width,
        height: output.height
      };
    },
    orientationchange: function orientationchange() {
      this.cleanUp();
      this.$parallax3sController.destroy(true);
      this.$parallax3sController = new ScrollMagic.Controller();
      $('.parallaxed3s').removeClass('parallaxed3s');
      this.parallax3s();
    },
    resize: function resize() {
      this.resizing = true;
      this.data();

      var _this = this;

      clearTimeout(this.resizeTo);
      this.resizeTo = setTimeout(function () {
        if (_this.$winWidth > 1199) {
          _this.cleanUp();
        }

        _this.imgControl(true);

        _this.sticky();

        _this.sliderInit();

        _this.sidebars();

        _this.reSidebars();

        _this.cta();

        _this.resizing = false;
      }, 275);
    },
    cleanUp: function cleanUp(override) {
      this.$parallaxItCont.destroy(true);
      this.$parallaxItCont = new ScrollMagic.Controller();
      $('.parallaxed').removeClass('parallaxed');
      this.parallaxIt();
    },
    qtyArrows: function qtyArrows() {
      $('.cart .quantity:not(.has-arrows )').addClass('has-arrows').append('<span class="qty-arrows"><span id="qty-plus" class="qty-arrow qty-plus"><i class="tipi-i-chevron-up"></i></span><span id="qty-minus" class="qty-arrow qty-minus"><i class="tipi-i-chevron-down"></i></span></span>');
    },
    qtyArrowChange: function qtyArrowChange() {
      var $quantity = $(this).closest('.quantity'),
          $qty = $quantity.find('.qty'),
          type = $(this).hasClass('qty-plus'),
          current = parseInt($qty.val()),
          max = parseInt($qty.attr('max')),
          min = parseInt($qty.attr('min')),
          step = $qty.attr('step');

      if (!current || current === '' || current === 'NaN') {
        current = 0;
      }

      if (max === '' || max === 'NaN') {
        max = '';
      }

      if (min === '' || min === 'NaN') {
        min = 0;
      }

      if (step === 'any' || step === '' || typeof step === 'undefined' || parseInt(step) === 'NaN') {
        step = 1;
      }

      if (type === true) {
        if (max && current >= max) {
          $qty.val(max);
        } else {
          $qty.val(current + parseInt(step));
        }
      } else {
        if (min && current <= min) {
          $qty.val(min);
        } else if (current > 0) {
          $qty.val(current - parseInt(step));
        }
      }

      $qty.trigger('change');
    },
    fillRunner: function fillRunner(override) {
      if (this.$body.hasClass('tipi-builder-frame-inner') && override !== true) {
        return;
      }

      if (override === true) {
        $('.tipi-fill').remove();
      }

      if (this.wooArchive === true) {
        var woo = this.$entryContentWrap.data('ppl');

        if (woo > 2 && this.$products.length > 0) {
          this.$products.each(function () {
            zeenPrv.fillIt($(this), woo, ' product');
          });
        }
      }

      var block = this.$primary.add(this.$dropper).find('.ppl-l-4, .ppl-m-4');

      if (block.length > 0) {
        block = block.find('.block:not(.block-65)');
        block.each(function () {
          zeenPrv.fillIt($(this), 4);
        });
      }

      block = this.$primary.add(this.$dropper).find('.ppl-l-5, .ppl-m-5');

      if (block.length > 0) {
        block = block.find('.block:not(.block-65)');
        block.each(function () {
          zeenPrv.fillIt($(this), 5);
        });
      }

      block = this.$primary.add(this.$dropper).find('.ppl-l-3, .ppl-m-3');

      if (block.length > 0) {
        block = block.find('.block:not(.block-65)');
        block.each(function () {
          if (!block.hasClass('block-wrap-65')) {
            zeenPrv.fillIt($(this), 3);
          }
        });
      }
    },
    fillIt: function fillIt(block, count, classes) {
      if (this.$winWidth > 767) {
        var counter = block.children().length;

        if (counter === count) {
          return;
        }

        var remainder;

        if (counter < count) {
          remainder = count - counter;
        } else {
          remainder = counter - Math.floor(counter / count) * count;
          remainder = count - remainder;
        }

        if (remainder < count) {
          for (var i = 0; i < remainder; i++) {
            var article = document.createElement('article');

            if (typeof classes === 'undefined') {
              article.className = 'tipi-fill';
            } else {
              article.className = 'tipi-fill ' + classes;
            }

            block.append(article);
          }
        }
      } else {
        $('.tipi-fill').remove();
      }
    },
    toTopInit: function toTopInit(e) {
      e.preventDefault();
      TweenLite.to(window, 0.8, {
        scrollTo: 0,
        ease: Power2.easeInOut
      });
    },
    openSlideMenu: function openSlideMenu(e) {
      e.preventDefault();
      this.$body.addClass('slide-menu-open');
      this.$baseOverlay.addClass('active');
      this.$slideInMenu.addClass('active');
    },
    closeSlideMenu: function closeSlideMenu(e) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      this.$body.removeClass('slide-menu-open');
      this.$slideInMenu.removeClass('active');
      this.$baseOverlay.removeClass('active');
    },
    openMobMenu: function openMobMenu(e) {
      e.preventDefault();

      if (this.$body.hasClass('site-mob-menu-a-3')) {
        var currentTop = $(window).scrollTop();
        zeenPrv.$body.addClass('mob-open mob-open-3');
        this.$content.add(this.$topBlock).add(this.$mobHead).css('top', '-' + currentTop + 'px');
        this.$page.css('height', this.$winHeight);
      } else {
        if (this.$body.hasClass('mob-open')) {
          this.$body.removeClass('mob-open');
        } else {
          this.$body.addClass('mob-open');
        }

        if (this.$body.hasClass('site-mob-menu-a-4')) {
          e.stopPropagation();
          this.$page.add(this.$mobHead).on('click touchstart', function (e) {
            if (e.type === 'click') {
              e.preventDefault();
            }

            zeenPrv.mobMenuClear();
            $(this).off('click touchstart');
          });
        }
      }
    },
    mobMenuClear: function mobMenuClear(e) {
      this.$body.removeClass('mob-open');

      if (!this.$body.hasClass('site-mob-menu-a-3')) {
        return;
      }

      clearTimeout(zeenPrv.mobMenuClearTO);
      zeenPrv.mobMenuClearTO = setTimeout(function () {
        var scrollTo = zeenPrv.$content.css('top');
        zeenPrv.$content.add(zeenPrv.$topBlock).add(zeenPrv.$mobHead).css('top', '');
        zeenPrv.$page.css('height', '');
        zeenPrv.$body.removeClass('mob-open mob-open-3');
        window.scrollTo(0, scrollTo);
      }, 500);
    },
    closeMobMenu: function closeMobMenu(e) {
      e.preventDefault();
      zeenPrv.mobMenuClear();
    },
    pub: function pub() {
      var _this = this;

      clearTimeout(this.pubTimer);
      this.pubTimer = setTimeout(function () {
        _this.$parallaxItCont.destroy(true);

        _this.$parallax3sController.destroy(true);

        $('.parallaxed').removeClass('parallaxed');
        $('.parallaxed3s').removeClass('parallaxed3s');
        $('.tipi-parallax-ani .bg').css('transform', '');

        _this.dom();

        _this.data();

        _this.anis();

        _this.sliderInit();

        _this.masonryInit();

        _this.sidebars();

        _this.reSidebars();

        _this.cta(true);

        _this.noPar();

        _this.fillRunner(true);

        _this.stickyEl();

        _this.parallaxIt(true);

        _this.parallax3s(true);
      }, 50);
    },
    cus: function cus(setting) {
      if (setting === 'sticky' && typeof zeenPrv.stickyMenu.destroy === 'function') {
        zeenPrv.stickyMenu.destroy(true);
      }

      if (setting === 'sticky' && typeof zeenPrv.stickyMobMenu.destroy === 'function') {
        zeenPrv.stickyMobMenu.destroy(true);
      }

      this.dom();
      this.data();
      this.bind();

      if (setting === 'sticky') {
        this.$stickyMenu.removeClass('slidedown stickied stuck active still');
        this.sticky();
      }
    }
  };
  zeenPrv.init();
  return {
    pub: function pub() {
      zeenPrv.pub();
    },
    cus: function cus(setting) {
      zeenPrv.cus(setting);
    }
  };
}(jQuery);
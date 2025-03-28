/* custom website scripts */

(function($) {
       
    'use strict';

    var menuState = false;

    // toggle the sidebar when the top-nav hamburger button is clicked
    $('.nav-toggle').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        toggle_menu();
    });

    function toggle_menu() {
		if (menuState == false) {
			// open the sidebar
			$('#menu-sidebar').addClass('open');
			menuState = true;
		} else {
			//close the sidebar
			$('#menu-sidebar').removeClass('open');
			menuState = false;
		}
    }

    // close nav sidebar if clicked element is outside
    $(document).on('click', function (e) {

        // element that was clicked on
        let element = e.target;

        if (menuState == true) {

            let menuSidebar = $('#menu-sidebar');
            // check if the element is or is nested withing the nav sidebar
            if (element.id != 'menu-sidebar' &&
            $(menuSidebar).find(element).length == 0
            ) {

            $("#menu-sidebar").removeClass('open');
            menuState = false;

            }
        }
    });

    if ( window.innerWidth > 992 ) {
        $('.accordion-item.hover-accordion').hover( function () {
            var $button = $(this).find('.accordion-button');
            if ( $button.hasClass('collapsed') ) {
                var data = $(this).data();
                var image_id = data['imageId'];
                $('.accordion-image.show').removeClass('show');
                $(image_id).addClass('show');
                $button.click();
            }
        }, function () {
    
        });
    }

    $('a.scroll-link, li.scroll-link > a, a.btn-scroll').on('click', function (e) {
        // prevent default link behavior if on the homepage
        if( document.location.pathname === "/" && $(this).hasClass('nav-link') ){
            e.preventDefault();
        }
    
        var target = $(this).attr('href');
    
        // remove forward slash from href
        if ( target.indexOf('/') > -1 ) {
            target = target.replace('/', '');
        }
        var offset = $('#wrapper-navbar').outerHeight(true);
        var scroll_value = $( target ).offset().top - offset;

        $('html,body').animate({
            scrollTop: scroll_value
        }, 800 );

        if ( menuState == true ) {
            $("#menu-sidebar").removeClass('open');
            menuState = false;
        }

    });


    /**
    * Copyright 2012, Digital Fusion
    * Licensed under the MIT license.
    * http://teamdf.com/jquery-plugins/license/
    *
    * @author Sam Sehnert
    * @desc A small plugin that checks whether elements are within
    *     the user visible viewport of a web browser.
    *     only accounts for vertical position, not horizontal.
    */
    jQuery.fn.visible = function(partial) {

        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height() + 250,
            _top          = $t.offset().top + $t.height(),
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };

    var win = $(window);
    var allMods = $(".fadein, .footer-widget .textwidget > *, .single-post-content > *");

    // Already visible modules
    function check_mods() {
        allMods.each(function(i, el) {
            var el = $(el);
            if (el.visible(true) && !el.hasClass("come-in")) {
                el.addClass("come-in"); 
            } 
        });
    }

    win.scroll(function(event) {
        check_mods();
    });

    $(window).on('load', function() {

        allMods.each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("come-in"); 
            } 
        });
        check_mods();

        var typer = document.getElementById('typewriter');
        if ( typeof typer !== 'undefined' && $(typer).length ) {
            $(typer).css('height', $(typer).outerHeight(false) + 'px');
            var typewriter = setupTypewriter(typer);
            typewriter.type();
        }

    });

    $('.nav-link.faq-tab-link, a.nav-link').on('shown.bs.tab', function (e) {
        check_mods();
    });

    var search_state = false;

    $('.search-toggle').on('click', function (e) {
        e.preventDefault();
        var target = $('#search-form-wrapper');
        if ( !search_state ) {
            $(target).addClass('open');
            search_state = true;
            // $(target).find('input.aw-woocommerce-product-search-field').focus();
        } else {
            $(target).removeClass('open');
            search_state = false;
        }
    });


    function setupTypewriter(t) {
        var HTML = t.innerHTML;

        t.innerHTML = "";

        var cursorPosition = 0,
            tag = "",
            writingTag = false,
            tagOpen = false,
            typeSpeed = 150, // higher number = slower
            tempTypeSpeed = 0;

        var type = function() {
        
            if (writingTag === true) {
                tag += HTML[cursorPosition];
            }

            if (HTML[cursorPosition] === "<") {
                tempTypeSpeed = 0;
                if (tagOpen) {
                    tagOpen = false;
                    writingTag = true;
                } else {
                    tag = "";
                    tagOpen = true;
                    writingTag = true;
                    tag += HTML[cursorPosition];
                }
            }
            if (!writingTag && tagOpen) {
                tag.innerHTML += HTML[cursorPosition];
            }
            if (!writingTag && !tagOpen) {
                if (HTML[cursorPosition] === " ") {
                    tempTypeSpeed = 0;
                }
                else {
                    tempTypeSpeed = (Math.random() * typeSpeed) + 50;
                }
                t.innerHTML += HTML[cursorPosition];
            }
            if (writingTag === true && HTML[cursorPosition] === ">") {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
                writingTag = false;
                if (tagOpen) {
                    var newSpan = document.createElement("span");
                    t.appendChild(newSpan);
                    newSpan.innerHTML = tag;
                    tag = newSpan.firstChild;
                }
            }

            cursorPosition += 1;
            if (cursorPosition < HTML.length) {
                setTimeout(type, tempTypeSpeed);
            }

        };

        return {
            type: type
        };
    }

    $('.scroll-nav-item').on('click',function(){
        var parent = $(this).closest('.scroll-nav');
        var pos=$(this).position().left; //get left position of li
        var currentscroll=$(parent).scrollLeft(); // get current scroll position
        var divwidth=$(this).closest('.scroll-outer').width(); //get div width
        pos=(pos+currentscroll)-(divwidth/2 - ($(this).width()/2)); // for center position if you want adjust then change this
        $(parent).animate({
            scrollLeft: pos
        }, 500);
      
    });

    $('a.nav-link.mobile-slide-nav').on('click',function(){
        var data = $(this).data();
        var parent = $(data['parent']);
        $(parent).find('a').removeClass('active');
        $(this).addClass('active');
        var slide = $(data['target']);
        var pos=$(slide).position().left; //get left position of li
        var container = $(parent).closest('.scroll-outer');
        var scroll_section = $(container).find('.scroll-wrapper');

        var currentscroll=$(scroll_section).scrollLeft(); // get current scroll position
        pos=(pos+currentscroll); // for center position if you want adjust then change this

        $(scroll_section).animate({
            scrollLeft: pos
        }, 500);
      
    });

    document.addEventListener( 'wpcf7mailsent', function( event ) {
        $('#modal-form-submitted').modal('show'); //this is the bootstrap modal popup id
    }, false );

    $('a.no-link, li.no-link > a').on('click', function (e) {
        e.preventDefault();
    });

    $('ul.aw-hover-menu > li.dropdown > a, ul.aw-hover-menu > li.dropdown ul.dropdown-menu a, ul.aw-hover-menu > li.dropdown ul.dropdown-menu').on('focusin', function () {
        var $parent = $(this).closest('li.dropdown');
        if ( !$parent.hasClass('focus') ) {
            $(this).closest('li.dropdown').addClass('focus');
        }
    });

    $('ul.aw-hover-menu > li.dropdown > a, ul.aw-hover-menu > li.dropdown ul.dropdown-menu a, ul.aw-hover-menu > li.dropdown ul.dropdown-menu').on('focusout', function () {
        var $parent = $(this).closest('li.dropdown');
        if ( $parent.hasClass('focus') ) {
            $(this).closest('li.dropdown').removeClass('focus');
        }
    });
    
})( jQuery );

var videos = jQuery('.custom-youtube-wrapper');
var playerInfoList = [];
var players = new Array();

if ( typeof videos !== 'undefined' ) {
    jQuery.map(videos, function (video) {
        var data = jQuery(video).data();
        var youtube_id = data['youtubeId'];
        var target_id = data['targetId'];

        playerInfoList.push({
            id: target_id,
            videoId: youtube_id
        });

    });

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    
    function onYouTubeIframeAPIReady() {
        if (typeof playerInfoList === 'undefined') return;
    
        for (var i = 0; i < playerInfoList.length; i++) {
            var curplayer = createPlayer(playerInfoList[i]);
            players[playerInfoList[i].id] = curplayer;
        }
    }
    
    function createPlayer(playerInfo) {
    
        return new YT.Player(playerInfo.id, {
            videoId: playerInfo.videoId,
            playerVars: {
                showinfo: 0,
            },
            height: '390',
            width: '640',
            playerVars: {
                'playsinline': 1
            },
        });
    }
}

jQuery('.video-modal').on('show.bs.modal', function (e) {
    var video_wrapper = jQuery(this).find('.custom-youtube-wrapper');
    var data = video_wrapper.data();
    var video_id = data['targetId'];
    players[video_id].playVideo();
});

jQuery('.video-modal').on('hide.bs.modal', function (e) {
    var video_wrapper = jQuery(this).find('.custom-youtube-wrapper');
    var data = video_wrapper.data();
    var video_id = data['targetId'];
    players[video_id].pauseVideo();
});
let Home = (function ($) {
    let pub = {
        winWidth: $(window).width(),
        winHeight: $(window).height(),
        headerHeight: $('header').innerHeight(),
        scrollTop: $(window).scrollTop(),
        elements: {
            overlay: $('.overlay'),
            page: $('.page')
        },
        classes: {
            fixedMenu: 'fixed-menu',
            mobileMenuOpen: 'open-menu'
        },
        windowResize: function () {
            this.winWidth = $(window).width();
            this.winHeight = $(window).height();
            this.headerHeight = $('header').innerHeight();
        },
        windowScroll: function(){
            this.scrollTop = $(window).scrollTop();
            this.fixedHeader();
        },
        fixedHeader: function(){
            let self = this;
            if(self.scrollTop > self.headerHeight){
                self.elements.page.addClass(self.classes.fixedMenu);
            }else{
                self.elements.page.removeClass(self.classes.fixedMenu);
            }
        },
        threeSlider: function(){
            $('.threeSlider').owlCarousel({
                loop:true,
                margin:50,
                items:3,
                autoplay: true,
                autoplayTimeout: 8000,
                smartSpeed: 2000,
                autoplayHoverPause: false,
                responsive:{
                    0:{
                        items:1,
                    },
                    767:{
                        items:2,
                    },
                    991:{
                        items:3,
                    }
                }
            });
        },
        onOverlay: function(){
            let self = this;
            self.elements.overlay.on('click', function () {
                self.elements.overlay.removeClass('active')
            });
        },

        init: function () {
            let self = this;

            self.onOverlay();
            self.threeSlider();
            self.windowScroll();

            $(window).on('resize', function (e) {
                self.windowResize();
            });
            $(window).scroll(function(){
                self.windowScroll();
            });
        }
    };
    return pub;
})(jQuery);
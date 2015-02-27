/**
 * Created by Ramil on 09.01.2015.
 */
var footerFix;
(function () {
    $(window).load(function () {
        footerFix = function () {
            var bodyHeight = $('body').height();
            var footer = $('footer');
            var margin = 20;
            var footerHeight = footer.height() + margin;
            if (footer.hasClass('fix')) {
                if (bodyHeight + footerHeight > window.innerHeight) {
                    footer.addClass('footer');
                    footer.removeClass('fix');
                }
            } else {
                if (bodyHeight + margin < window.innerHeight) {
                    footer.removeClass('footer');
                    footer.addClass('fix');
                }
            }

        };
        footerFix();
    });
    $(window).resize(function () {
        footerFix();
    });
})();

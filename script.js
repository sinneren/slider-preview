(function ($) {
    $.fn.myPlugin = function (options) {
        var settings = $.extend({
            last: 4
        }, options);

        function init (object) {
            if (object === 'undefined' || object.length === 0) {
                console.error('Can not find DOM-element');
                return false;
            } else {
                $(object.get(0)).css('display', 'none');
                return true;
            }
        }
        if (init(this)) {
            var images = $(this.get(0)).find('img');
            var length = images.length;

            $(this.get(0)).after('<div class="plugin-container"></div>');
            var plugin_container = $('.plugin-container');

            plugin_container.append('<div class="plugin-container__hover"></div><div class="plugin-container__progress"><div class="plugin-container__progress-track"></div></div>');
            var hover_container = $('.plugin-container__hover');
            var percent_item_width = 100 / length;
            var progress_track = $('.plugin-container__progress-track');
            progress_track.css('width', percent_item_width + '%');
            var active_class = '';
            for (var i = 0; i < length; ++i) {
                active_class = (i === 0) ? ' active' : '';
                plugin_container.append('<div class="plugin-container__item' + active_class + '" style="background-image: url(' + $(images[i]).attr('src') + ')"></div>');
                hover_container.append('<div class="plugin-container__hover-item" style="width:' + percent_item_width + '%" data-id="' + i + '"></div>');
            }
            var hover_items = $('.plugin-container__hover-item');
            $('.plugin-container__hover-item').hover(
                function (e) {
                    var id = $(this).data('id')
                    progress_track.css('left', percent_item_width * id + '%');
                },
                function (e) {
                    e.preventDefault();
                }
            );
            //сделать сдвиг
            //сделать последний элемент пустышку
        }
    };
})(jQuery);

$('#plug').myPlugin();
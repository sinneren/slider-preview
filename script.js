(function ($) {
    $.fn.myPlugin = function (options) {
        var settings = $.extend({
            maximum_items: 4,
            active_class: ' active '
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
            var length = (images.length >= settings.maximum_items) ? settings.maximum_items : images.length;

            $(this.get(0)).after('<div class="plugin-container"></div>');
            var plugin_container = $('.plugin-container');

            plugin_container.append(`
                <div class="plugin-container__images-wrapper">
                    <div class="plugin-container__images"></div>
                </div>
                <div class="plugin-container__hover"></div>
                <div class="plugin-container__progress">
                    <div class="plugin-container__progress-track"></div>
                </div>
            `);

            var hover_container = $('.plugin-container__hover');
            var images_container = $('.plugin-container__images');
            var percent_item_width = 0;
            if (images.length > settings.maximum_items) {
                percent_item_width = 100 / (length + 1);
            } else {
                percent_item_width = 100 / length;
            }
            var progress_track = $('.plugin-container__progress-track');
            var width_item = images_container.width();
            var height_item = images_container.height();
            progress_track.css('width', percent_item_width + '%');

            for (var i = 0; i < length; ++i) {
                images_container.append('<div class="plugin-container__item' + ((i === 0) ? settings.active_class : '') + '" style="background-image: url(' + $(images[i]).attr('src') + '); width: ' + width_item + 'px; height: ' + height_item + 'px;"></div>');
                hover_container.append('<div class="plugin-container__hover-item" style="width:' + percent_item_width + '%" data-id="' + i + '"></div>');
            }
            if (images.length > settings.maximum_items) {
                images_container.append('<div class="plugin-container__item plugin-container__item--last" style="width: ' + width_item + 'px; height: ' + height_item + 'px;"></div>');
                hover_container.append('<div class="plugin-container__hover-item" style="width:' + percent_item_width + '%" data-id="' + i + '"></div>');
            }

            var hover_items = $('.plugin-container__hover-item');
            var items = $('.plugin-container__item');
            $('.plugin-container__hover-item').hover(
                function (e) {
                    var id = $(this).data('id')
                    progress_track.css('left', percent_item_width * id + '%');
                    items.removeClass(settings.active_class).eq(id).addClass(settings.active_class);
                    images_container.css('left', -width_item * id + 'px');
                },
                function (e) {
                    e.preventDefault();
                }
            );
        }
    };
})(jQuery);

//TODO:
//Адаптив
//Декомпозиция js
//декомпозиция проекта
//контент для Last
//стилистика
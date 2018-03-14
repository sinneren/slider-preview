(function ($) {
    $.fn.sp = function (options) {
        var settings = $.extend({
            maximum_items: 4,
            active_class: ' active ',
            image_size_style: 'contain',
            activeChanged: function () {
                return false;
            }
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

            $(this.get(0)).after('<div class="sp-container"></div>');
            var sp_container = $('.sp-container');

            sp_container.append(`
                <div class="sp-container__images-wrapper">
                    <div class="sp-container__images --${settings.image_size_style}"></div>
                </div>
                <div class="sp-container__hover"></div>
                <div class="sp-container__progress">
                    <div class="sp-container__progress-track"></div>
                </div>
            `);

            var hover_container = $('.sp-container__hover');
            var images_container = $('.sp-container__images');
            var percent_item_width = 100 / length;

            var progress_track = $('.sp-container__progress-track');
            var width_item = images_container.width();
            var height_item = images_container.height();

            progress_track.css('width', percent_item_width + '%');

            for (var i = 0; i < length; ++i) {
                images_container.append('<div class="sp-container__item' + ((i === 0) ? settings.active_class : '') + '" style="background-image: url(' + $(images[i]).attr('src') + '); width: ' + width_item + 'px; height: ' + height_item + 'px;"></div>');
                hover_container.append('<div class="sp-container__hover-item" style="width:' + percent_item_width + '%" data-id="' + i + '"></div>');
            }

            var hover_items = $('.sp-container__hover-item');
            var items = $('.sp-container__item');

            //Binding events
            $('.sp-container__hover-item').hover(
                function (e) {
                    var id = $(this).data('id');

                    progress_track.css('left', percent_item_width * id + '%');
                    items.removeClass(settings.active_class).eq(id).addClass(settings.active_class);
                    settings.activeChanged();
                    images_container.css('left', -width_item * id + 'px');
                },
                function (e) {
                    e.preventDefault();
                }
            );

            $(window).resize(function () {
                width_item = images_container.width();
                height_item = images_container.height();

                items.width(width_item).height(height_item);
            });
        }
    };
})(jQuery);

//TODO:
//Декомпозиция js
//минификацию
//git pages
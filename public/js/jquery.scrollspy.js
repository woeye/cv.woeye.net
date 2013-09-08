/*
 * A very basic scrollspy.
 *
 * @author: Lars Hoss <lars.hoss@gmail.com>
 */

(function($) {

  $.fn.scrollSpy = function(options) {
    return this.each(function() {
      var $nav = $(this),
          menuItems,
          scrollItems,
          opts;

      opts = $.extend({}, $.fn.scrollSpy.defaults, options);
      menuItems = $nav.find('a');
      scrollItems = menuItems.map(function() {
        var href = $(this).attr('href');
        if (href !== '/') {
          // Get the element matching this href
          var $item = $(href);
          if ($item.length) { return $item; }
        }
      });

      var scrollWatcher = _.debounce(function() {
        var currentPos, currentItem, lastId, id, theItem;

        // End of page?
        if (document.documentElement.clientHeight + $(document).scrollTop() >= document.body.offsetHeight) {
          // We've reached the end of the page. Just take the id of the last scrollItem
          id = scrollItems[scrollItems.length - 1][0].id;
        } else {
          currentPos = $(this).scrollTop() + opts.offset + 50;
          currentItem = scrollItems.map(function() {
            if ($(this).offset().top < currentPos) {
              return this;
            }
          });

          currentItem = currentItem[currentItem.length - 1];
          id = currentItem && currentItem.length ? currentItem[0].id : "";
        }

        if (lastId !== id) {
          menuItems.removeClass('active');
          theItem = menuItems.filter('[href=#' + id + ']');
          //console.log(theItem);
          if (theItem.length > 0) {
            theItem.addClass('active');
            document.title = 'Burrito Bande | ' + theItem.text();
            window.history.replaceState({}, theItem.text(), '#' + id);
          } else {
            document.title = 'Burrito Bande | Home';
            window.history.replaceState({}, theItem.text(), '#home');
          }
          lastId = id;
        }

      }, 100);

      $(window).scroll(function() {
        scrollWatcher();
      });

      // Setup a click handler for each link. Whenever the user clicks on one of those
      // links scroll the document
      menuItems.each(function() {
        $(this).on('click', function(e) {
          var $this = $(this),
              ref, position;

          e.preventDefault();
          menuItems.removeClass('active');
          $this.addClass('active');

          ref = $this.attr('href');
          if (ref === '/') {
            position = 0;
          } else {
            position = $(ref).offset().top - opts.offset;
          }

          $('html, body').animate({
            scrollTop: position
          }, 500);

        });
      });
    });
  };

  // Plugin defaults
  $.fn.scrollSpy.defaults = {
    offset: 120
  };


})(jQuery);
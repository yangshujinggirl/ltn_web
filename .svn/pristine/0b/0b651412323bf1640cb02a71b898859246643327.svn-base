(function ($) {

  $.fn.paging = function (option) {

    /**
     * !!!Notice: as the pageNo from server will start from 0,
     * so it need to plus 1 when import into this component.
     * And it need to minutes 1 when export into call back function.
     */
    option.currPage = option.currPage + 1 || undefined;

    var defOpts = {
      // Current page number
      currPage: 1,
      // The size of items list in a page
      pageSize: 10,
      // The turn size of page when click previous or next
      turnSize: 10,
      // The size of all the items list in this component
      totalSize: 0,
      // Call back function
      callback: function (pageNo) {
      }
    }

    var opts = undefined;

    var
      $container,
      $prev,
      $next,
      pages;

    return this.each(function () {
      $container = $(this);

      initOpt();
      render();
      handle();
    });

    function initOpt() {

      // Extends out defaults options with those privided
      opts = opts || $.extend(defOpts, option);

      // The max page number of the items
      opts.totalPage = Math.ceil(opts.totalSize / opts.pageSize);
      // Current turn number
      opts.currTurn = Math.ceil(opts.currPage / opts.turnSize);
      // Start page number in current turn
      opts.startPage = opts.turnSize * (opts.currTurn - 1) + 1;
      // End page number in current turn
      opts.endPage = Math.min(opts.totalPage, opts.startPage + opts.turnSize - 1);
      // End turn number
      opts.endTurn = Math.ceil(opts.totalPage / opts.turnSize);

      return opts;
    }

    function render() {

      $prev = $('<li>').addClass('item prev').text('<<');
      $next = $('<li>').addClass('item next').text('>>');

      var index = 0, pageNo = opts.startPage;
      pages = [];
      for (; pageNo <= opts.endPage; index++, pageNo++) {
        pages.push(
          $('<li>')
          .addClass('item')
          .text(pageNo)
          .addClass(opts.currPage === pageNo ? 'selected' : '')
        );
      }
      // console.log(pageNo);
      // console.log(opts.currPage);
      // console.log(pages)
      $container.empty().append($prev, pages, $next);

      // if (pages.length) {
      //   pages.unshift($prev);
      //   pages.push($next);
      // }
      // $container.empty().append(pages);

      // $container.empty();

      // if (opts.currTurn > 1) {
      //   pages.unshift($prev);
      // }

      // if (opts.currTurn < opts.endTurn) {
      //   pages.push($next);
      // }

      // if (pages.length > 1) {
      //   $container.append(pages);
      // }
    }

    function handle() {

      $prev.on('click', prevEvent);
      $next.on('click', nextEvent);

      var index = 0, length = pages.length;
      for (; index < length; index++) {
        pages[index].on('click', pageEvent);
      }
    }

    function prevEvent() {
      opts.currPage = Math.max(1, opts.currPage - opts.turnSize);
      opts.callback(opts.currPage - 1);
      initOpt();
      render();
      handle();
     // $container.find('.selected').removeClass('selected');

    }

    function nextEvent() {
      opts.currPage = Math.min(opts.totalPage, opts.currPage + opts.turnSize);
      opts.callback(opts.currPage - 1);
      initOpt();
      render();
      handle();
      //$container.find('.selected').removeClass('selected');

    }

    function pageEvent() {
      var page = $(this);
      $container.find('.selected').removeClass('selected');
      page.addClass('selected');
      opts.currPage = +page.text();
      opts.callback(opts.currPage - 1);
    }
  }
})(jQuery);
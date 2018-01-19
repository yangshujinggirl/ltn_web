$(function () {
   var page = new Page();
   page.setTitle('领投鸟理财-不动产理财颠覆者-帮助中心');
  //left nav 选中状态
  var leftnav = function () {
    var pn = location.pathname;
    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++)
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
    }
  }

  //rightcontent toggle 下拉；
  var togglecontent = function () {
    var _content = $('.list .item');
    _content.on("click",function(){

      if ($(this).next(".content").is(":hidden")) {
        _content.removeClass("selected");
        $(this).addClass("selected");
        _content.next(".content").slideUp("slow");
        $(this).next(".content").slideDown("slow")

      } else {
         $(this).removeClass("selected");
        $(this).next(".content").slideUp("slow");
      }

    });
  }

  //explain-word;
  var toggleword = function () {
    var _word = $('#word'),
    _wordItems = $('#word .means'),
    classType = [],
    _explainContent = $('#explain-content');

    _wordItems.each(function(index,item){
      classType.push($(item).data('content'));
    });

    classType = classType.join(' ');
    _word.on('click',function(event){
      var item = $(event.target);
      if(item.hasClass('means')){
        _wordItems.removeClass('selected');
        item.addClass('selected');
        _explainContent.removeClass(classType).addClass(item.data('content'));
      }
    })
  }


  init = function () {
    leftnav();
    togglecontent();
    toggleword();
  }

  init();

})
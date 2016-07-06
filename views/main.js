$(document).ready(function(){

  $('#login').click(function(){
    $('.loginScreen').css('display' , 'block');
  });

  $('#upload').click(function(){
    if($('#profile').text() != ''){
      $('.uploadScreen').css('display' , 'block');
    }else{
      $('.loginScreen').css('display' , 'block');
    }
  });

  $('#google').click(function(){
    window.location = '/auth/google';
  })

  $('#twitter').click(function(){
    window.location = '/auth/twitter';
  })


  $('.uploadBtn').click(function(){
    if($('#uploadLink').val() != '' && $('#uploadTitle').val() != ''){

      $.post('/uploadDin' , {dinImgLink : $('#uploadLink').val() , dinTitle : $('#uploadTitle').val()}, function(){
        window.location = '/';
      });

    }
  });

  $('.pinUser').click(function(){
    pinUserId = $(this).parent().children('#userId').text();
    window.location = '/user/' + pinUserId;
  });

  $('.grid-item').hover(function(){
    $(this).children('.delete').css('display', 'inline-block');
  },function(){
    $(this).children('.delete').css('display', 'none');
  });

  $('.delete').click(function(){
    var pinId = $(this).parent().children('#pinId').text();
    $.post('/deleteDin' , {pinId : pinId} , function(){
      window.location = '/profile'
    });
  });


  $('img').load(function(){
    $('.grid').masonry({
      itemSelector: '.grid-item',
    });
  });










//Link Typing Functionality
  var typingTimer;
  var doneTypingInterval = 200;

  //on keyup, start the countdown
  $('#myInput').keyup(function(){
      clearTimeout(typingTimer);
      if ($('#myInput').val()) {
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
      }
  });
  //user is "finished typing," do something
  function doneTyping () {
      //do something
  }var typingTimer;                //timer identifier
  var doneTypingInterval = 200;  //time in ms (5 seconds)
  //on keyup, start the countdown
  $('#uploadLink').keyup(function(){
      clearTimeout(typingTimer);
      if ($('#uploadLink').val()) {
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
      }
  });

//user is "finished typing," do something
function doneTyping () {
    $('#uploadImg').attr('src', $('#uploadLink').val());
    $("#uploadImg").error(function () {
      $(this).unbind("error").attr("src", "http://www.clevelandheights.com/modules/showimage.aspx?imageid=601");
    });
}


});

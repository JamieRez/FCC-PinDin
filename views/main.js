$(document).ready(function(){

  $('#login').click(function(){
    $('.loginScreen').css('display' , 'block');
  });

  $('#google').click(function(){
    window.location = '/auth/google';
  })

  $('#twitter').click(function(){
    window.location = '/auth/twitter';
  })

});

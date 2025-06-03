//Dark Mode or Light Mode 
//---Start---//
$(document).ready(function(){
  let protocol = location.protocol;
  if ( protocol != 'file:') {
    cookiesEnabled();
  } else {
    cookiesDisabled();
  }
});

function cookiesEnabled() { 
  let curMode = Cookies.get('darkMode');
  if (curMode == undefined) {
    Cookies.set('darkMode', 'true', { expires: 365 });
    darkMode();
  } else if (curMode == 'true') {
    darkMode();
  } else {
    lightMode();
  }

  $("#dl-mode").click(function(){
    let curMode = Cookies.get('darkMode');
    if ( curMode == 'true') {
      Cookies.remove('darkMode', { path: '' });
      lightMode();
      Cookies.set('darkMode', 'false', { expires: 365 });
    } else {
      Cookies.remove('darkMode', { path: '' });
      darkMode();
      Cookies.set('darkMode', 'true', { expires: 365 });
    }
  });

  let name = Cookies.get('name');
  if (name != undefined) {
    $('#nameInput').val(name);
    $('.nameContainer').attr('data-value', name);
  }

  let backgroundImage = Cookies.get('backgroundImage');
  if (backgroundImage != undefined) {
    $('#bgImage').val(backgroundImage);
    $('body').css('background-image','url(' + backgroundImage + ')');
  } else {
    $('body').css('background-image','none');   
  }

  let backgroundSize = Cookies.get('backgroundSize');
  if (backgroundSize != undefined) {
    $('#bgSize').val(backgroundSize);
    $('body').css('background-size',backgroundSize);
  } else {
    $('body').css('background-size','cover');    
  }

  let backgroundPosition = Cookies.get('backgroundPosition');
  if (backgroundPosition != undefined) {
    $('#bgPosition').val(backgroundPosition);
    $('body').css('background-position',backgroundPosition);
  } else {
    $('body').css('background-position','center center');    
  }

  let backgroundRepeat = Cookies.get('backgroundRepeat');
  if (backgroundRepeat != undefined) {
    $('#bgRepeat').val(backgroundRepeat);
    $('body').css('background-repeat',backgroundRepeat);
  } else {
    $('body').css('background-repeat','no-repeat');
  }

  let overlayOpacity = Cookies.get('overlayOpacity');
  if (overlayOpacity != undefined) {
    $('#olOpacity').val(overlayOpacity);
    $('.overlay').css('opacity',overlayOpacity);
    $('#opacityVal').html(overlayOpacity);
  } else {
    $('#olOpacity').val('0.8');
    $('.overlay').css('opacity','0.8');  
    $('#opacityVal').html('0.8');  
  }
}

function cookiesDisabled() {
  $("#dl-mode").click(function(){
    if ( $("#overlay").hasClass('o-active')) {
      darkMode();
    } else {
      lightMode();
    }
  });

  $('body').css('background-image','none'); 
  $('body').css('background-size','cover');  
  $('body').css('background-position','center center'); 
  $('body').css('background-repeat','no-repeat');
  $('#olOpacity').val('0.8');
  $('.overlay').css('opacity','0.8');  
  $('#opacityVal').html('0.8');  
}

function darkMode() {
  $("body").css('background-color', 'black');
  $("#overlay").removeClass('o-active');
  $("#dl-mode, #fs-mode, #toggleBGSettings").removeClass('light');
  $("#dl-mode, #fs-mode, #toggleBGSettings").addClass('dark');
  $("#sun").addClass('activemode');
  $("#moon").removeClass('activemode');
  $("#oc, #lock-btn, #main").addClass('darkm');
  $("#oc, #lock-btn, #main").removeClass('lightm');
}

function lightMode() {
  $("body").css('background-color', 'white');
  $("#overlay").addClass('o-active');
  $("#dl-mode, #fs-mode, #toggleBGSettings").addClass('light');
  $("#dl-mode, #fs-mode, #toggleBGSettings").removeClass('dark');
  $("#moon").addClass('activemode');  
  $("#sun").removeClass('activemode');  
  $("#oc, #lock-btn, #main").addClass('lightm');
  $("#oc, #lock-btn, #main").removeClass('darkm');
}

function nameInput() {
  let curVal = $('#nameInput').val();
  Cookies.remove('name', { path: '' });
  Cookies.set('name', curVal, { expires: 365 });
}

$(document).ready(function(){

  //---Background Image
  $("#bgImage").focus(function(){
    Cookies.remove('backgroundImage', { path: '' });
  });
  $("#bgImage").blur(function(){
    let bgImage = $("#bgImage").val();
    $('body').css('background-image','url(' + bgImage + ')');
    Cookies.set('backgroundImage', bgImage, { expires: 365 });
  });

  $('#fileImage').focus(function () {
    Cookies.remove('backgroundImage');
      console.log(Cookies.get('backgroundImage'));
  });

  $('#fileImage').change(function () {
    var file = this.files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = function () {
      $('#bgImage').val(reader.result);
      var bg = $('#bgImage').val();
    }
  });

  $('#fileImage').blur(function () {
    var file = this.files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = function () {
      $('#bgImage').val(reader.result);
      var bg = reader.result;
      console.log(bg);
      $('body').css('background-image', 'url("' + bg + '")');
      Cookies.set('backgroundImage', bg, { expires: 365 });
      console.log(Cookies.get('backgroundImage'));
    }
  });

  //---Clear Background Image
  $("#clearBg").click(function(){
    $("#bgImage").val('');
    Cookies.remove('backgroundImage', { path: '' });
    $('body').css('background-image','none');
    Cookies.set('backgroundImage', '', { expires: 365 });
  });

  //---Background Size
  $("#bgSize").change(function(){
    let bgSize = $("#bgSize").val();
    Cookies.remove('backgroundSize', { path: '' });
    $('body').css('background-size',bgSize);
    Cookies.set('backgroundSize', bgSize, { expires: 365 });
  });

  //---Background Position
  $("#bgPosition").change(function(){
    let bgPosition = $("#bgPosition").val();
    Cookies.remove('backgroundPosition', { path: '' });
    $('body').css('background-position',bgPosition);
    Cookies.set('backgroundPosition', bgPosition, { expires: 365 });
  });

  //---Background Repeat
  $("#bgRepeat").change(function(){
    let bgRepeat = $("#bgRepeat").val();
    Cookies.remove('backgroundRepeat', { path: '' });
    $('body').css('background-repeat',bgRepeat);
    Cookies.set('backgroundRepeat', bgRepeat, { expires: 365 });
  });

  //---Overlay Opacity
  $("#olOpacity").on('input',function(){
    olOpacity = $("#olOpacity").val();
    $('.overlay').css('opacity', olOpacity);
    $('#opacityVal').html(olOpacity);
  });

  $("#olOpacity").change(function(){
    olOpacity = $("#olOpacity").val();
    Cookies.remove('overlayOpacity', { path: '' });
    Cookies.set('overlayOpacity', olOpacity, { expires: 365 });
  });
});  
//---End---//
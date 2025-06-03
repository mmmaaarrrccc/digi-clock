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
      Cookies.remove('darkMode', { path: '' })
      lightMode();
      Cookies.set('darkMode', 'false', { expires: 365 });
    } else {
      Cookies.remove('darkMode', { path: '' })
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
  Cookies.remove('name', { path: '' })
  Cookies.set('name', curVal, { expires: 365 });
}

$(document).ready(function(){
  $("#bgImage").change(function(){
  let bgImage = $("#bgImage").val();
    Cookies.remove('backgroundImage', { path: '' })
    $('body').css('background-image','url(' + bgImage + ')');
    Cookies.set('backgroundImage', bgImage, { expires: 365 });
  });
}); 

$(document).ready(function(){
  $("#bgSize").change(function(){
  let bgSize = $("#bgSize").val();
    $('body').css('background-size',bgSize);
  });
}); 

$(document).ready(function(){
  $("#bgPosition").change(function(){
  let bgPosition = $("#bgPosition").val();
    $('body').css('background-position',bgPosition);
  });
}); 

$(document).ready(function(){
  $("#bgRepeat").change(function(){
  let bgRepeat = $("#bgRepeat").val();
    $('body').css('background-repeat',bgRepeat);
  });
}); 

$(document).ready(function(){
  let olOpacity = $("#olOpacity").val();
    $('#opacityVal').html(olOpacity);
  $("#olOpacity").on('input',function(){
  let olOpacity = $("#olOpacity").val();
    $('.overlay').css('opacity', olOpacity);
    $('#opacityVal').html(olOpacity);
  });
}); 
//---End---//
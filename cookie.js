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
      Cookies.remove('darkMode');
      lightMode();
      Cookies.set('darkMode', 'false', { expires: 365 });
    } else {
      Cookies.remove('darkMode');
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
  var video = $("#videoBg");
  if (backgroundImage != undefined) {
    $('#bgLink').val(backgroundImage);
    $('body').css('background-image','url(' + backgroundImage + ')');
    video.src = bgLink;
    video.load();
    video.play();
  } else {
    $('body').css('background-image','none');   
    video.src = 'https://static.vecteezy.com/system/resources/previews/007/536/781/mp4/aerial-view-of-white-sand-beach-and-water-surface-texture-foamy-waves-with-sky-beautiful-tropical-beach-amazing-sandy-coastline-with-white-sea-waves-nature-seascape-and-summer-concept-free-video.mp4';
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
  var r = document.querySelector(':root');
  const min = $('#olOpacity').attr('min');
  const max = $('#olOpacity').attr('max');

  if (overlayOpacity != undefined) {
    $('#olOpacity').val(overlayOpacity);
    $('.overlay').css('opacity',overlayOpacity);
    $('#opacityVal').html(overlayOpacity);

    var percentage = ((overlayOpacity - min) / (max - min)) * 100;

    r.style.setProperty('--sliderbgDm', 'linear-gradient(to right, white ' + percentage + '%, black ' + percentage + '%)');
    r.style.setProperty('--sliderbgLm', 'linear-gradient(to right, black ' + percentage + '%, white ' + percentage + '%)');
  } else {
    $('#olOpacity').val('0.8');
    $('.overlay').css('opacity','0.8');  
    $('#opacityVal').html('0.8');  
    r.style.setProperty('--sliderbgDm', 'linear-gradient(to right, white 80%, black 80%)');
    r.style.setProperty('--sliderbgLm', 'linear-gradient(to right, black 80%, white 80%)');
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
  $("#dl-mode, #fs-mode, #toggleBGSettings, #speak").removeClass('light');
  $("#dl-mode, #fs-mode, #toggleBGSettings, #speak").addClass('dark');
  $("#sun").addClass('activemode');
  $("#moon").removeClass('activemode');
  $("#oc, #lock-btn, #main").addClass('darkm');
  $("#oc, #lock-btn, #main").removeClass('lightm');
}

function lightMode() {
  $("body").css('background-color', 'white');
  $("#overlay").addClass('o-active');
  $("#dl-mode, #fs-mode, #toggleBGSettings, #speak").addClass('light');
  $("#dl-mode, #fs-mode, #toggleBGSettings, #speak").removeClass('dark');
  $("#moon").addClass('activemode');  
  $("#sun").removeClass('activemode');  
  $("#oc, #lock-btn, #main").addClass('lightm');
  $("#oc, #lock-btn, #main").removeClass('darkm');
}

function nameInput() {
  let curVal = $('#nameInput').val();
  Cookies.remove('name');
  Cookies.set('name', curVal, { expires: 365 });
}

$(document).ready(function(){

  //---Background
  $("#bgLink").change(function(){
    let bgLink = $("#bgLink").val();
    Cookies.remove('backgroundImage');
    $('body').css('background-image','url(' + bgLink + ')');
    var video = $("#videoBg");
    video.src = bgLink;
    video.load();
    video.play();
    Cookies.set('backgroundImage', bgLink, { expires: 365 });
  });

  //---Clear Background
  $("#clearBg").click(function(){
    $("#bgLink").val('');
    $("#fileImage").val('');
    Cookies.remove('backgroundImage');
    $('body').css('background-image','none');
    Cookies.set('backgroundImage', '', { expires: 365 });
  });

  //---Background Size
  $("#bgSize").change(function(){
    let bgSize = $("#bgSize").val();
    Cookies.remove('backgroundSize');
    $('body').css('background-size',bgSize);
    Cookies.set('backgroundSize', bgSize, { expires: 365 });
  });

  //---Background Position
  $("#bgPosition").change(function(){
    let bgPosition = $("#bgPosition").val();
    Cookies.remove('backgroundPosition');
    $('body').css('background-position',bgPosition);
    Cookies.set('backgroundPosition', bgPosition, { expires: 365 });
  });

  //---Background Repeat
  $("#bgRepeat").change(function(){
    let bgRepeat = $("#bgRepeat").val();
    Cookies.remove('backgroundRepeat');
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
    Cookies.remove('overlayOpacity');
    Cookies.set('overlayOpacity', olOpacity, { expires: 365 });
  });

  $('#fileImage').change(function () {
    var file = this.files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = function () {
      // $('#bgLink').val(reader.result);
      // var bg = $('#bgLink').val();
      $('body').css('background-image', 'url("' + reader.result + '")');
    }
  });
});  
//---End---//
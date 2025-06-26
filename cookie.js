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
  var vidOptions = {autoplay: 'true', 
  muted: true,
  controls: false, 
  loop: true, 
  techOrder: ["youtube", "html5"],
  youtube: { ytControls: 0, disablekb: 1, modestbranding: 0, showinfo: 0 }};
  
  if (backgroundImage != undefined) {
    $('#bgLink').val(backgroundImage);

    if (backgroundImage.match('.mp4') != null || backgroundImage.match('youtube.com') != null) {
      videojs('videoBg').dispose();
      $("body").append("<video id='videoBg' class='videoBg'><source></video>");
      $("#mediaOptions").show();
      $("#mediaOptions").css('opacity','1');

      if (backgroundImage.match('.mp4') != null) {
        vidOptions.sources = [{"src": backgroundImage}];
        videojs('videoBg', vidOptions);
      } else if (backgroundImage.match('youtube.com') != null) {
        vidOptions.sources = [{ "type": "video/youtube", "src": backgroundImage}];
        videojs('videoBg', vidOptions);
      }
    } else {
      $("#mediaOptions").hide();
      $("#mediaOptions").css('opacity','0');
    }

    $('body').css('background-image','url(' + backgroundImage + ')');
  } else {
    $('body').css('background-image','none');   
      video.src = '';
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

    var percentage = Math.round(((overlayOpacity - min) / (max - min)) * 100);

    r.style.setProperty('--sliderbgDm', 'linear-gradient(to right, var(--activeDm) ' + percentage + '%, black ' + percentage + '%)');
    r.style.setProperty('--sliderbgLm', 'linear-gradient(to right, var(--activeLm) ' + percentage + '%, white ' + percentage + '%)');
  } else {
    $('#olOpacity').val('0.8');
    $('.overlay').css('opacity','0.8');  
    $('#opacityVal').html('0.8');  
    r.style.setProperty('--sliderbgDm', 'linear-gradient(to right, var(--activeDm) 80%, black 80%)');
    r.style.setProperty('--sliderbgLm', 'linear-gradient(to right, var(--activeLm) 80%, white 80%)');
  }

  let primaryColor = Cookies.get('primaryColor');
  if (primaryColor != undefined) {
    $('#primaryColor').val(primaryColor);
    r.style.setProperty('--activeDm', primaryColor);
    r.style.setProperty('--activeLm', primaryColor);
  }

  let secondaryColor = Cookies.get('secondaryColor');
  if (secondaryColor != undefined) {
    $('#secondaryColor').val(secondaryColor);
    r.style.setProperty('--inactiveDm', secondaryColor);
    r.style.setProperty('--inactiveLm', secondaryColor);
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
  $(".btn-mode").removeClass('light');
  $(".btn-mode").addClass('dark');
  $("#sun").addClass('activemode');
  $("#moon").removeClass('activemode');
  $("#oc, #lock-btn, #main, #mc").addClass('darkm');
  $("#oc, #lock-btn, #main, #mc").removeClass('lightm');
}

function lightMode() {
  $("body").css('background-color', 'white');
  $("#overlay").addClass('o-active');
  $(".btn-mode").addClass('light');
  $(".btn-mode").removeClass('dark');
  $("#moon").addClass('activemode');  
  $("#sun").removeClass('activemode');  
  $("#oc, #lock-btn, #main, #mc").addClass('lightm');
  $("#oc, #lock-btn, #main, #mc").removeClass('darkm');
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
    Cookies.set('backgroundImage', bgLink, { expires: 365 });
  });

  //---Clear Background
  $("#clearBg").click(function(){
    Cookies.remove('backgroundImage');
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
  $("#olOpacity").change(function(){
    var olOpacity = $("#olOpacity").val();
    Cookies.remove('overlayOpacity');
    Cookies.set('overlayOpacity', olOpacity, { expires: 365 });
  });

  //Coolors
  $('#primaryColor').on('input', function(){
    var primColor = $('#primaryColor').val();
    Cookies.remove('primaryColor');
    Cookies.set('primaryColor', primColor, { expires: 365 });
  });
  $('#secondaryColor').on('input', function(){
    var secColor = $('#secondaryColor').val();
    Cookies.remove('secondaryColor');
    Cookies.set('secondaryColor', secColor, { expires: 365 });
  });

  $('#resetPColor').on('click', function() {
    Cookies.remove('primaryColor');
    Cookies.set('primaryColor', '', { expires: 365 });
  });

  $('#resetSColor').on('click', function() {
    Cookies.remove('secondaryColor');
    Cookies.set('secondaryColor', '', { expires: 365 });
  });

});  
//---End---//
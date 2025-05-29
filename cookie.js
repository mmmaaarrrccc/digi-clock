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
    Cookies.set('darkMode', 'true');
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
      Cookies.set('darkMode', 'false');
    } else {
      Cookies.remove('darkMode', { path: '' })
      darkMode();
      Cookies.set('darkMode', 'true');
    }
  });
}

function cookiesDisabled() {
  $("#dl-mode").click(function(){
    if ( $("#filter1").hasClass('f-active')) {
      darkMode();
    } else {
      lightMode();
    }
  });
}

function darkMode() {
  $("#filter1").removeClass('f-active');
  $("#dl-mode, #fs-mode").removeClass('light');
  $("#dl-mode, #fs-mode").addClass('dark');
  $("#sun").addClass('activemode');
  $("#moon").removeClass('activemode');
  $("#oc, #lock-btn, #main").addClass('darkm');
  $("#oc, #lock-btn, #main").removeClass('lightm');
}

function lightMode() {
  $("#filter1").addClass('f-active');
  $("#dl-mode, #fs-mode").addClass('light');
  $("#dl-mode, #fs-mode").removeClass('dark');
  $("#moon").addClass('activemode');  
  $("#sun").removeClass('activemode');  
  $("#oc, #lock-btn, #main").addClass('lightm');
  $("#oc, #lock-btn, #main").removeClass('darkm');
}
//---End---//

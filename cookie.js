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
  }
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

function nameInput() {
  let curVal = $('#nameInput').val();
  Cookies.set('name', curVal, { expires: 365 });
  // $(document).ready(function(){
  //   $("input").on("input",function(){
    
  //     $('#test').html($('input').val());
  //     //($('input').val());
  //   });
  // });
}
//---End---//
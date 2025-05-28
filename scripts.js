//Dark Mode or Light Mode 
//---Start---//
$(document).ready(function(){
	$("#dl-mode").click(function(){

		if ( $("#filter1").hasClass('f-active')) {

			$("#filter1").removeClass('f-active');
			$("#dl-mode, #fs-mode").removeClass('light');
			$("#dl-mode, #fs-mode").addClass('dark');
			$("#sun").addClass('activemode');
			$("#moon").removeClass('activemode');
			$("#oc, #lock-btn, #main").addClass('darkm');
			$("#oc, #lock-btn, #main").removeClass('lightm');

		} else {
			
			$("#filter1").addClass('f-active');
			$("#dl-mode, #fs-mode").addClass('light');
			$("#dl-mode, #fs-mode").removeClass('dark');
			$("#moon").addClass('activemode');	
			$("#sun").removeClass('activemode');	
			$("#oc, #lock-btn, #main").addClass('lightm');
			$("#oc, #lock-btn, #main").removeClass('darkm');
		}

	});
});
//---End---//


//Fullscreen Mode
//---Start---//
function toggleFullscreen(elem) {
	elem = elem || document.documentElement;
	if (!document.fullscreenElement) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
			$("#fs-on").removeClass('activemode');
			$("#fs-off").addClass('activemode');	
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			$("#fs-off").removeClass('activemode');
			$("#fs-on").addClass('activemode');
		}
	}
}
//---End---//

$(document).ready(function(){
    idleTime = 0;  
	idleStart = 10; 
	var lockMode = $('#screenlock').css('height');

    var idleInterval = setInterval(timerIncrement, 5000);

    function timerIncrement() {
        idleTime++;
        if (idleTime == 4) {
        	document.getElementById('brightness').style.opacity = "0.8";
        	document.getElementById('options').style.opacity = "0";
        	document.getElementById('lock-btn').style.opacity = "0.2";
			$("#dim").removeClass('activemode');
			$("#bright").addClass('activemode');
		    var idleCount = setInterval(checkScreenSize, 60000);
			checkScreenSize();
        }
        if (idleTime == 6) {
        	document.getElementById('screenlock').style.height = "100%";
        	document.getElementById('lock-btn').style.opacity = "0";
			$("#lock").removeClass('activemode');
			$("#ulock").addClass('activemode');	
			lockMode = $('#screenlock').css('height');

        }
    }


	$('#lock-btn').click(function() {
		if (lockMode == '0px') {
        	document.getElementById('screenlock').style.height = "100%";
        	document.getElementById('lock-btn').style.opacity = "1";
        	document.getElementById('brightness').style.opacity = "0.8";
        	document.getElementById('options').style.opacity = "0";
        	document.getElementById('lock-btn').style.opacity = "0.2";
			$("#lock").removeClass('activemode');
			$("#ulock").addClass('activemode');	
			lockMode = $('#screenlock').css('height');

		} else {
			document.getElementById('screenlock').style.height = "0px";
        	document.getElementById('lock-btn').style.opacity = "1";
        	document.getElementById('lock-btn').style.opacity = "1";
			$("#ulock").removeClass('activemode');
			$("#lock").addClass('activemode');
			lockMode = $('#screenlock').css('height');
			idleTime = 0;
			document.getElementById('brightness').style.opacity = "0";
			document.getElementById('options').style.opacity = "1";
		}
	});


	$(this).mousemove(function(e){
		if (lockMode == '0px') {
			idleTime = 0;
			document.getElementById('brightness').style.opacity = "0";
			document.getElementById('options').style.opacity = "1";
        	document.getElementById('lock-btn').style.opacity = "1";
		} else {
        	document.getElementById('lock-btn').style.opacity = "1";
			document.getElementById('brightness').style.opacity = "0";
        	idleTime = 0;
        	timerIncrement();
		}
	});
	$(this).keypress(function(e){
		if (lockMode == '0px') {
			idleTime = 0;
			document.getElementById('brightness').style.opacity = "0";
			document.getElementById('options').style.opacity = "1";
		} else {
        	document.getElementById('lock-btn').style.opacity = "1";
			document.getElementById('brightness').style.opacity = "0";
        	idleTime = 0;
        	timerIncrement();
		}
	});
	$(this).on('tap', function(e){
		if (lockMode == '0px') {
			idleTime = 0;
			document.getElementById('brightness').style.opacity = "0";
			document.getElementById('options').style.opacity = "1";
		} else {
        	document.getElementById('lock-btn').style.opacity = "1";
			document.getElementById('brightness').style.opacity = "0";
        	idleTime = 0;
        	timerIncrement();
		}
	});

});


//Changing position on mobile
//---Start---//
function checkScreenSize(){
	var newWindowWidth = $(window).width();
	if (newWindowWidth < 1024) {
        document.getElementById('main').style.top = idleStart + "%";
		if (idleStart >= 28){
			idleStart = 10;
        	document.getElementById('main').style.top = idleStart + "%";
		}
        idleStart = idleStart + 2;
	} else {
        document.getElementById('main').style.top = 0;
	}
}
//---End---//


//Options
//---Start---//
//Toggle Options Menu
$(document).ready(function(){
	$("#oc").click(function(){
		var optWidth = $("#options").width();
		if ( optWidth > 50) {
        	document.getElementById('options').style.width = "50px";
			$("#oc").removeClass('oc-out');
		} else {
        	document.getElementById('options').style.width = "155px";
			$("#oc").addClass('oc-out');
		}

	});
});

//Click anywhere to close menu
$(document).mouseup(function(e) {
    var container = $("#options");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        document.getElementById('options').style.width = "50px";
		$("#oc").removeClass('oc-out');
    }
});

//Auto close after 10secs
$('#options').ready(function(){
    idle = 0;  
    var idleInterval = setInterval(timer, 1000);

    function timer() {
    	if ($('#options').width() == 220) {
	        idle++;
	        if (idle == 10) {
		        document.getElementById('options').style.width = "50px";
				$("#oc").removeClass('oc-out');
		        idle = 0;
	        }
    	}

    }
    $(this).mousemove(function(e){
        idle = 0;
	});
});
//---End---//



$(document).ready(function() {





navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
  	updateChargingInfo();
    updateLevelInfo();
  }

  updateAllBatteryInfo();

  //When the charging status changes
  battery.addEventListener("chargingchange", () => {
    updateAllBatteryInfo();
  });

  //When the Battery Levvel Changes
  battery.addEventListener("levelchange", () => {
    updateAllBatteryInfo();
  });

  function updateChargingInfo() {
    if (battery.charging) {
		$("#Folder-2").css("opacity","1");
		$(".bci").css("opacity", "0");
    } else {
		$("#Folder-2").css("opacity","0");
    }
  }

  //Updating battery level
  function updateLevelInfo() {
    let batteryLevel = Math.round(battery.level * 100);
	$("#batteryPerc").text(batteryLevel);
	if (!battery.charging) {
		if (batteryLevel >=80 ) {
			$(".bci").css("opacity", "1");
		}
		if (batteryLevel >=60 && batteryLevel < 80) {
			$(".bci.b25").css("opacity", "1");
			$(".bci.b50").css("opacity", "1");
			$(".bci.b75").css("opacity", "1");
			$(".bci.b100").css("opacity", "0");
		}
		if (batteryLevel >=40 && batteryLevel < 60) {
			$(".bci.b25").css("opacity", "1");
			$(".bci.b50").css("opacity", "1");
			$(".bci.b75").css("opacity", "0");
			$(".bci.b100").css("opacity", "0");
		}
		if (batteryLevel >=20 && batteryLevel < 40) {
			$(".bci.b25").css("opacity", "1");
			$(".bci.b50").css("opacity", "0");
			$(".bci.b75").css("opacity", "0");
			$(".bci.b100").css("opacity", "0");
		}
		if (batteryLevel >=0 && batteryLevel < 20) {
			$(".bci").css("opacity", "0");
		}
	}
  }
});
});



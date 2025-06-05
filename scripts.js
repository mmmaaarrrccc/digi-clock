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
        	dimBrightness();
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
			$('#lock-btn').css('z-index','12');

        }
    }

	$('#lock-btn').click(function() {
		if (lockMode == '0px') {
        	document.getElementById('screenlock').style.height = "100%";
        	dimBrightness();
			$("#lock").removeClass('activemode');
			$("#ulock").addClass('activemode');	
			lockMode = $('#screenlock').css('height');
			$('#lock-btn').css('z-index','12');

		} else {
			document.getElementById('screenlock').style.height = "0px";
			$("#ulock").removeClass('activemode');
			$("#lock").addClass('activemode');
			lockMode = $('#screenlock').css('height');
			$('#lock-btn').css('z-index','6');
			idleUnlock();
		}
	});

	$(this).mousemove(function(e){
		let brightnessOpacity = $('#brightness').css('opacity');
		if (lockMode == '0px') {
			if (brightnessOpacity != 0) {
				$('#lock-btn').css('opacity','1');
			}
			idleUnlock();
		} else {
			idleLock();
        	timerIncrement();
		}
	});
	$(this).keypress(function(e){
		let brightnessOpacity = $('#brightness').css('opacity');
		if (lockMode == '0px') {
			if (brightnessOpacity != 0) {
				$('#lock-btn').css('opacity','1');
			}
			idleUnlock();
		} else {
			idleLock();
        	timerIncrement();
		}
	});
	$(this).on('tap', function(e){
		let brightnessOpacity = $('#brightness').css('opacity');
		if (lockMode == '0px') {
			if (brightnessOpacity != 0) {
				$('#lock-btn').css('opacity','1');
			}
			idleUnlock();
		} else {
			idleLock();
        	timerIncrement();
		}
	});
});

function dimBrightness() {
	document.getElementById('brightness').style.opacity = "0.6";
	document.getElementById('options').style.opacity = "0";
	let lockBtn = $('#lock-btn');
	if (lockBtn.hasClass('darkm')) {
		lockBtn.css('opacity','0.4');
	} else {
		lockBtn.css('opacity','1');
	}
}

function idleUnlock() {
	idleTime = 0;
	document.getElementById('brightness').style.opacity = "0";
	document.getElementById('options').style.opacity = "1";
}

function idleLock() {
    document.getElementById('lock-btn').style.opacity = "1";
	document.getElementById('brightness').style.opacity = "0";
    idleTime = 0;
}


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
	}
}

$(document).ready(function(){
  $(window).resize(function(){
    if ($(window).width() > 1023) {
        document.getElementById('main').style.top = 0;
    } else if ($(window).width() < 1024) {
        document.getElementById('main').style.top = "10%";    	
    }
  });
});

//---End---//


//Options
//---Start---//
//Toggle Options Menu
$(document).ready(function(){
	$("#oc").click(function(){
		var optWidth = $("#options").width();
		if ( optWidth > 50) {
        	closeOptions();
		} else {
        	document.getElementById('options').style.width = "285px";
			$("#oc").addClass('oc-out');
			if ($(window).width() < 601) {
				$("#lock-btn").css('opacity','0');
				$("#lock-btn").css('pointer-events','none');
			}
		}

	});
});

//Click anywhere to close menu
$(document).mouseup(function(e) {
    var container = $("#options");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
    	closeOptions();
    }
});

//Auto close after 10secs
$('#options').ready(function(){
    idle = 0;  
    var idleInterval = setInterval(timer, 1000);

    function timer() {
    	if ($('#options').width() > 50) {
	        idle++;
	        if (idle == 10) {
	        	closeOptions();
		        idle = 0;
	        }
    	}

    }
    $(this).mousemove(function(e){
        idle = 0;
	});
	$(this).on('tap', function(e){
        idle = 0;
	});
	$(this).on('click', function(e){
        idle = 0;
	});
});

function closeOptions() {
	document.getElementById('options').style.width = "50px";
	$("#oc").removeClass('oc-out');
	$("#lock-btn").css('opacity','1');
	$("#lock-btn").css('pointer-events','unset');
}
//---End---//

//Check Battery
//---Start---//
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
				$(".bci").css("opacity", "0");
				$("#batteryIconCharging").css("opacity","1");
				$("#chargingIcon").css('animation-name','batterycharging');
				$('#batteryIcon').css('animation-name','batterycharging2')
			} else {
				$("#batteryIconCharging").css("opacity","0");
				$("#chargingIcon").css('animation-name','');
				$('#batteryIcon').css('animation-name','')
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

//---End---//

$(document).ready(function(){
  $("#toggleBGSettings").click(function(){
  	let bgSettings = $("#bgSettings");
  	if (bgSettings.css('display') == 'none') {
  		$("#bgSettings").show(300);
  	} else {
    	$("#bgSettings").hide(300);
  	}
  });
  $("#closeBtn").click(function(){
    $("#bgSettings").hide(300);
  });
});

$(document).mouseup(function(e) {
    var container = $("#bgSettings");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
    	$("#bgSettings").hide(300);
    }
});

$('#bgSettings').ready(function(){
    idleBg = 0;  
    var idleInterval = setInterval(timer, 1000);

    function timer() {
	    idleBg++;
	    if (idleBg == 10) {
    		$("#bgSettings").hide(300);
		    idleBg = 0;
	    }
    }
    $(this).mousemove(function(e){
        idleBg = 0;
	});
	$(this).keypress(function(e){
        idleBg = 0;
	});
	$(this).on('tap', function(e){
        idleBg = 0;
	});
	$(this).on('click', function(e){
        idleBg = 0;
	});
	$(this).on('scroll', function(e){
        idleBg = 0;
	});
	$('.bgSettingsContainer').on('scroll', function(e){
        idleBg = 0;
	});
	$(this).on('swipe', function(e){
        idleBg = 0;
	});
	$('.bgSettingsContainer').on('swipe', function(e){
        idleBg = 0;
	});
});

$(document).ready(function(){
	var r = document.querySelector(':root');
	const min = $('#olOpacity').attr('min');
	const max = $('#olOpacity').attr('max');
	$('#olOpacity').on('input', function(){
		var opacity = $('#olOpacity').val();
		var percentage = ((opacity - min) / (max - min)) * 100;
		r.style.setProperty('--sliderbgDm', 'linear-gradient(to right, white ' + percentage + '%, black ' + percentage + '%)');
		r.style.setProperty('--sliderbgLm', 'linear-gradient(to right, black ' + percentage + '%, white ' + percentage + '%)');
	});
});

$(document).ready(function(){
	$('#speak').on('click', function(){
		textToSpeech();
	});
});
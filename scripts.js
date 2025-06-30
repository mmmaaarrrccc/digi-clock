//Fullscreen Mode
//---Start---//
function toggleFullScreen() {
	if (document.fullscreenElement) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			$("#fs-off").removeClass('activemode');
			$("#fs-on").addClass('activemode');
		}
	} else {
		var elem = document.documentElement;
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
			$("#fs-on").removeClass('activemode');
			$("#fs-off").addClass('activemode');	
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
		    $('body').css('cursor','none');
			checkScreenSize();
        }
        if (idleTime == 6) {
        	document.getElementById('screenlock').style.height = "100%";
        	document.getElementById('lock-btn').style.opacity = "0";
        	$('#mediaOptions').css('opacity', '0');
			$("#lock").removeClass('activemode');
			$("#ulock").addClass('activemode');	
			lockMode = $('#screenlock').css('height');
			$('#lock-btn').css('z-index','12');
    		$("#bgSettings").hide(300);

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
				$('#mediaOptions').css('opacity', '1');
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
				$('#mediaOptions').css('opacity', '1');
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
				$('#mediaOptions').css('opacity', '1');
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
		if ( $('#screenlock').height() == 0){
			$('#mediaOptions').css('opacity', '0.4');
		} else {
			$('#mediaOptions').css('opacity', '0');
		}
	} else {
		lockBtn.css('opacity','1');
		$('#mediaOptions').css('opacity', '1');
	}
}

function idleUnlock() {
	idleTime = 0;
	document.getElementById('brightness').style.opacity = "0";
	$('#options').css('opacity', '1');
	$('body').css('cursor','default');
}

function idleLock() {
	$('#mediaOptions').css('opacity', '1');
    document.getElementById('lock-btn').style.opacity = "1";
	document.getElementById('brightness').style.opacity = "0";
	$('body').css('cursor','default');
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

	var currentMCLeftPos = 0;
	var newMCLeftPos = 0;
	var currentMCTopPos = 0;
	var newMCLTopPos = 0;
	$("#mc").on('mousedown', function() {
		currentMCLeftPos = parseInt($("#mediaOptions").css('left'),10);
		currentMCTopPos = parseInt($("#mediaOptions").css('top'),10);
	})
	$("#mc").on('mouseup', function() {
		newMCLeftPos = parseInt($("#mediaOptions").css('left'),10);
		newMCTopPos = parseInt($("#mediaOptions").css('top'),10);
		// console.log(currentMCLeftPos);
		// console.log(newMCLeftPos);
		if (currentMCLeftPos == newMCLeftPos && currentMCTopPos == newMCTopPos) {
			toggleMediaControls();
		}
	});

	$("#mc i").click(function(){
		var mediaOptHeight = $("#mediaOptions").height();
		if ( mediaOptHeight > 50) {
    		closeMediaOptions();
		}
	});

	function toggleMediaControls() {
		var optHeight = $("#mediaOptions").height();
		var viewportWidthInPixels = $(window).width();
		var maxPos = viewportWidthInPixels - 375;
		var leftMargin = '-300px';

		if (newMCLeftPos > maxPos && optHeight < 51) {
			$("#mediaOptions").css('margin-left', leftMargin);
		}
		if ( optHeight < 51) {
			$("#mc").addClass('mc-out');
		}
	}
});
//Click anywhere to close menu
$(document).mouseup(function(e) {
    var container = $("#options");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
    	closeOptions();
    }
    var mediaContainer = $("#mediaOptions");
    if (!mediaContainer.is(e.target) && mediaContainer.has(e.target).length === 0 && mediaContainer.is(":visible")) {
    	closeMediaOptions();
    }
});

//Auto close after 10secs
$('#options, #mediaOptions').ready(function(){
    idle = 0;  
    var idleInterval = setInterval(timer, 1000);

    function timer() {
    	if ($('#options').width() > 50 || $('#mediaOptions').width() > 50) {
	        idle++;
	        if (idle == 10) {
	        	closeOptions();
 	        	closeMediaOptions();
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
	$('#options').css('width', '50px');
	$("#oc").removeClass('oc-out');
	$("#lock-btn").css('opacity','1');
	$("#lock-btn").css('pointer-events','unset');
}

function closeMediaOptions() {
	$('#mediaOptions').css('height', '50px');
	$('#mediaOptions').css('margin-left', '0px');
	$("#mc").removeClass('mc-out');
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
			batteryNotificationCharging(battery);
			updateAllBatteryInfo();
		});

		//When the Battery Level Changes
		battery.addEventListener("levelchange", () => {
			batteryNotificationFull(battery);
			updateAllBatteryInfo();
		});

		function updateChargingInfo() {
			if (battery.charging) {
				$(".bci").css("opacity", "0");
				$("#batteryIconCharging").css("opacity","1");
				$("#chargingIcon").css('animation-name','batterycharging');
				$('#batteryIcon').css('animation-name','batterycharging2');
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
				if (batteryLevel ==100 ) {
					$(".bci").css("opacity", "1");
				}
				if (batteryLevel <100 ) {
					$(".bci").css("opacity", "1");
					$(".bci.full").css("opacity", "0");
				}
				if (batteryLevel >=60 && batteryLevel < 80) {
					$(".bci").css("opacity", "1");
					$(".bci.b100").css("opacity", "0");
					$(".bci.full").css("opacity", "0");
				}
				if (batteryLevel >=40 && batteryLevel < 60) {
					$(".bci").css("opacity", "0");
					$(".bci.b25").css("opacity", "1");
					$(".bci.b50").css("opacity", "1");
				}
				if (batteryLevel >=20 && batteryLevel < 40) {
					$(".bci").css("opacity", "0");
					$(".bci.b25").css("opacity", "1");
				}
				if (batteryLevel >=0 && batteryLevel < 20) {
					$(".bci").css("opacity", "0");
				}

				if (batteryLevel == 40 || batteryLevel == 30) {
					$('body').append('<audio class="batteryNotification" id="batteryLow" autoplay><source src="./audio/low.mp3" type="audio/mpeg"></audio>');
					removeBatteryNotification();
				}
			}
		}
	});
});

function batteryNotificationCharging(battery) {
		if (battery.charging) {
			$('body').append('<audio class="batteryNotification" id="batteryConnected" autoplay><source src="./audio/connected.mp3" type="audio/mpeg"></audio>');
			removeBatteryNotification();
		} else if (!battery.charging) {
			$('body').append('<audio class="batteryNotification" id="batteryDisconnected" autoplay><source src="./audio/disconnected.mp3" type="audio/mpeg"></audio>');
			removeBatteryNotification();
		}
}

function batteryNotificationFull(battery) {
	if (battery.charging && battery.level === 1) {
		$('body').append('<audio class="batteryNotification" id="batteryFull" autoplay><source src="./audio/full.mp3" type="audio/mpeg"></audio>');
		removeBatteryNotification();
	}
}

function removeBatteryNotification() {
	$('.batteryNotification').on('ended', function() {
		$('.batteryNotification').remove();
	});
}

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

$(document).ready(function(){
	var vidOptions = {autoplay: 'true', 
	muted: true,
	controls: false, 
	loop: true, 
	techOrder: ["youtube", "html5"],
	youtube: { ytControls: 0, disablekb: 1, modestbranding: 0, showinfo: 0 }};

	//Background
	$("#mediaOptions").hide();
	$("#bgLink").change(function(){
    	let bgLink = $("#bgLink").val();
	    console.clear();
		$("#muted").addClass('activemode');
		$("#unmute").removeClass('activemode');
		$("#playing").removeClass('activemode');
		$("#paused").addClass('activemode');

		videojs('videoBg').dispose();
	    $("body").append("<video id='videoBg' class='videoBg'><source></video>");

	    if (bgLink.match('.mp4') != null || bgLink.match('youtube.com') != null || bgLink.match('youtu.be') != null) {
			$("#mediaOptions").show();
			$("#mediaOptions").css('opacity','1');
	    } else {
			$("#mediaOptions").hide();
			$("#mediaOptions").css('opacity','0');
	    }

	    if (bgLink.match('.mp4') != null) {
	      vidOptions.sources = [{"src": bgLink}];
	      videojs('videoBg', vidOptions);
	    } else if (bgLink.match('youtube.com') != null || bgLink.match('youtu.be') != null) {
	      vidOptions.sources = [{ "type": "video/youtube", "src": bgLink}];
	      videojs('videoBg', vidOptions);
	    } 

	    $('body').css('background-image','url(' + bgLink + ')');

	});

	//Clear Background
	$("#clearBg").click(function(){
	    $("#bgLink").val('');
	    $("#fileImage").val('');
	    $('body').css('background-image','none');
	    videojs('videoBg').dispose();
	    $("body").append("<video id='videoBg' class='videoBg'><source></video>");
	    $("#mediaOptions").css('opacity','0');
	    setTimeout(hideShowOptions,300);
	    console.clear();
	});

	function hideShowOptions() {
		$("#mediaOptions").toggle();
	}

	//Background From File
	$('#fileImage').change(function () {
	    var file = this.files[0];
	    var reader = new FileReader();
	    if (file) {
	      reader.readAsDataURL(file);
	    }
	    reader.onloadend = function () {
	      $('body').css('background-image', 'url("' + reader.result + '")');
	    }
  	});

	//Slider Opacity
	var r = document.querySelector(':root');
	const min = $('#olOpacity').attr('min');
	const max = $('#olOpacity').attr('max');
	$('#olOpacity').on('input', function(){
		var opacity = $('#olOpacity').val();
		var percentage = Math.round(((opacity - min) / (max - min)) * 100);
		r.style.setProperty('--sliderbgDm', 'linear-gradient(to right, var(--activeDm) ' + percentage + '%, black ' + percentage + '%)');
		r.style.setProperty('--sliderbgLm', 'linear-gradient(to right, var(--activeLm) ' + percentage + '%, white ' + percentage + '%)');
	});

	$("#olOpacity").on('input',function(){
	    var olOpacity = $("#olOpacity").val();
	    $('.overlay').css('opacity', olOpacity);
	    $('#opacityVal').html(olOpacity);
  	});

	//Coolors
	$('#primaryColor').on('input', function(){
		var primColor = $('#primaryColor').val();
		r.style.setProperty('--activeDm', primColor);
		r.style.setProperty('--activeLm', primColor);
	});
	$('#secondaryColor').on('input', function(){
		var secColor = $('#secondaryColor').val();
		r.style.setProperty('--inactiveDm', secColor);
		r.style.setProperty('--inactiveLm', secColor);
	});

	$('#resetPColor').on('click', function() {
		r.style.setProperty('--activeDm', '#ddd');
		r.style.setProperty('--activeLm', '#010101');
	});

	$('#resetSColor').on('click', function() {
		r.style.setProperty('--inactiveDm', '#5a5a5a');
		r.style.setProperty('--inactiveLm', '#7a7a7a');
	});


	//Text to Speech
	$('#speak').on('click', function(){
		textToSpeech();
	});
});


//Media Buttons
$(document).ready(function(){
	$("#mute").click(function () {
		if (videojs('videoBg').muted() == false) {
			videojs('videoBg').muted(true);
			$("#muted").addClass('activemode');
			$("#unmute").removeClass('activemode');
		} else {
			videojs('videoBg').muted(false);
			$("#muted").removeClass('activemode');
			$("#unmute").addClass('activemode');
		}
	});

	$("#playPause").click(function () {
		if (videojs('videoBg').paused() == false) {
			videojs('videoBg').pause();
			$("#playing").addClass('activemode');
			$("#paused").removeClass('activemode');
		} else {
			videojs('videoBg').play();
			$("#playing").removeClass('activemode');
			$("#paused").addClass('activemode');
		}
	});

	$("#stop").click(function () {
		videojs('videoBg').pause();
		videojs('videoBg').currentTime(0);
		if (videojs('videoBg').paused() == false) {
			$("#paused").addClass('activemode');
			$("#playing").removeClass('activemode');
		} else {
			$("#playing").addClass('activemode');
			$("#paused").removeClass('activemode');
		}
	});

	$("#forward").click(function () {
		var seekForward = videojs('videoBg').currentTime() + 10;
		videojs('videoBg').currentTime(seekForward);
	});

	$("#rewind").click(function () {
		var seekBack = videojs('videoBg').currentTime() - 10;
		videojs('videoBg').currentTime(seekBack);
	});
});

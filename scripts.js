function startTime() {
	const today = new Date();
	let d = today.getDay();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	h = checkHour(h);
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('clock').innerHTML =  h + ":" + m ;
	document.getElementById('seconds').innerHTML = ":" + s;

	const collection = document.getElementsByClassName("days");
	for (let c = 0; c < collection.length; c++) {

		collection[d].classList.add("active");

		if (d == 0) {
			collection[6].classList.remove("active");
		} else {
			collection[d-1].classList.remove("active");
		}
	}
	
	setTimeout(startTime, 1000);
	currentMonth();
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};
	return i;
}
function checkHour(g) {
	if (g >= 12) {
		g = g - 12;
		document.getElementById("pm").classList.add("active");
		document.getElementById("am").classList.remove("active");
	} else {
		document.getElementById("am").classList.add("active");
		document.getElementById("pm").classList.remove("active");
	}
	if (g == 0) {
		g = g + 12;
	}
	if (g < 10) {
		g = "0" + g;
	}
	return g;
}
function currentMonth() {
	const today = new Date();
	let ms = today.getMonth();
	let ds = today.getDate();
	let y = today.getFullYear();
	let cmonth;
	switch (ms) {
	  case 0:
	    cmonth = "Jan";
	    break;
	  case 1:
	    cmonth = "Feb";
	    break;
	  case 2:
	    cmonth = "Mar";
	    break;
	  case 3:
	    cmonth = "Apr";
	    break;
	  case 4:
	    cmonth = "May";
	    break;
	  case 5:
	    cmonth = "Jun";
	    break;
	  case  6:
	    cmonth = "Jul";
	    break;
	  case  7:
	    cmonth = "Aug";
	    break;
	  case  8:
	    cmonth = "Sep";
	    break;
	  case  9:
	    cmonth = "Oct";
	    break;
	  case  10:
	    cmonth = "Nov";
	    break;
	  case  11:
	    cmonth = "Dec";
	    break;
	}
	document.getElementById('dates').innerHTML = cmonth + " " + ds + " " + y;
}



$(document).ready(function(){
	$("#dl-mode").click(function(){
		if ( $("#filter1").hasClass('f-active')) {
			$("#filter1").removeClass('f-active');
			$("#dl-mode").removeClass('light');
			$("#dl-mode").addClass('dark');
			$("#fs-mode").removeClass('light');
			$("#fs-mode").addClass('dark');
			$("#sun").addClass('activemode');
			$("#moon").removeClass('activemode');
			$("#oc").addClass('darkm');
			$("#oc").removeClass('lightm');
		} else {
			$("#filter1").addClass('f-active');
			$("#dl-mode").addClass('light');
			$("#dl-mode").removeClass('dark');
			$("#fs-mode").addClass('light');
			$("#fs-mode").removeClass('dark');	
			$("#moon").addClass('activemode');	
			$("#sun").removeClass('activemode');	
			$("#oc").addClass('lightm');
			$("#oc").removeClass('darkm');
		}

	});
});

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

$(document).ready(function(){
    idleTime = 0;  
	idleStart = 10; 

    var idleInterval = setInterval(timerIncrement, 5000);

    function timerIncrement() {
        idleTime++;
        if (idleTime == 4) {
        	document.getElementById('brightness').style.opacity = "0.7";
		    var idleCount = setInterval(checkScreenSize, 60000);
			checkScreenSize();
        }

    }
    $(this).mousemove(function(e){
        idleTime = 0;
        document.getElementById('brightness').style.opacity = "0";
	});
    $(this).keypress(function(e){
        idleTime = 0;
        document.getElementById('brightness').style.opacity = "0";
	});
    $(this).on('tap', function(e){
        idleTime = 0;
        document.getElementById('brightness').style.opacity = "0";
	});
});



function checkScreenSize(){
	var newWindowWidth = $(window).width();
	if (newWindowWidth < 481) {
        document.getElementById('main').style.top = idleStart + "%";
		if (idleStart >= 28){
			idleStart = 10;
        	document.getElementById('main').style.top = idleStart + "%";
		}
        idleStart = idleStart + 2;
	}
}

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

$(document).mouseup(function(e) {
    var container = $("#options");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        document.getElementById('options').style.width = "50px";
		$("#oc").removeClass('oc-out');
    }
});
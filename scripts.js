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

	$.ajax({
	  url: "your_file.txt",
	  dataType: "text",
	  success: function(data) {
	    console.log(data);

		  $("#dl-mode").click(function(){
		  	if ( data = 1) {

					$("#filter").addClass('f-active');
					$("#dl-mode").addClass('light');
					$("#dl-mode").addClass('light');
					$("#dl-mode").removeClass('dark');	
					$("#sun").removeClass('activemode');

				} else {

					$("#dl-mode").addClass('dark');
					$("#sun").addClass('activemode');
					$("#filter").removeClass('f-active');
					$("#dl-mode").removeClass('light');
					$("#moon").removeClass('activemode');

				}

			});

	  }

	});
});
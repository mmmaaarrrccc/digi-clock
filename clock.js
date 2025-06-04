function startClock() {
	startTime();
	currentDay();
	currentMonth();
}

function startTime() {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	h = checkHour(h);
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('clock').innerHTML =  h + ":" + m ;
	document.getElementById('seconds').innerHTML = ":" + s;
	setTimeout(startTime, 1000);
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

function currentDay() {
	const today = new Date();
	let d = today.getDay();
	const collection = document.getElementsByClassName("days");
	for (let c = 0; c < collection.length; c++) {

		collection[d].classList.add("active");

		if (d == 0) {
			collection[6].classList.remove("active");
		} else {
			collection[d-1].classList.remove("active");
		}
	}
}

function currentMonth() {
  let today = new Date();
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dateMonth = months[today.getMonth()];
  let dateDay = today.getDate();
  let dateYear = today.getFullYear();
	dateDay = checkDay(dateDay);
  document.getElementById('month').innerHTML = dateMonth;
  document.getElementById('day').innerHTML = dateDay;
  document.getElementById('year').innerHTML = dateYear;
}

function checkDay(d) {
	if (d < 10) {d = "0" + d};
	return d;
}
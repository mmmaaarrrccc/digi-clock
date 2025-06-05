let lastDate = new Date().toDateString();
function startClock() {
	startTime();
	currentDay();
	currentMonth();
}

function startTime() {
	const today = new Date();
	const currentDate = today.toDateString();

	if (currentDate !== lastDate) {
		lastDate = currentDate;
		currentDay();
		currentMonth();
	}

	let h24 = today.getHours();
	let h = formatHour(h24);
	let m = formatTimeUnit(today.getMinutes());
	let s = formatTimeUnit(today.getSeconds());

	document.getElementById('clock').innerHTML =  h + ":" + m ;
	document.getElementById('seconds').innerHTML = ":" + s;
	setTimeout(startTime, 1000);
}

function formatHour(g) {
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

function formatTimeUnit(i) {
	if (i < 10) {i = "0" + i};
	return i;
}

function currentDay() {
	const today = new Date();
	let d = today.getDay();
	const collection = document.getElementsByClassName("days");

	for (let c = 0; c < collection.length; c++) {
		collection[c].classList.remove("active");
	}
	collection[d].classList.add("active");
}

function currentMonth() {
  let today = new Date();
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let dateMonth = months[today.getMonth()];
  let dateDay = formatTimeUnit(today.getDate());
  let dateYear = today.getFullYear();

  document.getElementById('month').innerHTML = dateMonth;
  document.getElementById('day').innerHTML = dateDay;
  document.getElementById('year').innerHTML = dateYear;
}

function textToSpeech() {
	const now = new Date();
	let h24 = now.getHours();
	let m = now.getMinutes();
	let meridian;

	if (h24 < 12) {
		if (h24 == 0) {
			h24 = 12;
		}
		meridian = ' A.M.';
		speakTime(h24,m, meridian);
	} else {
		meridian = ' P.M.';
		speakTime(h24,m, meridian);
	}
}

function speakTime(h24,m, meridian) {
	if (h24 > 12) {
		h24 = h24 - 12;
	}
	if (m == 0 || m == '00'){
		m = 'o&apos;clock';
	}
	const text = 'Time Now Is: ' + h24 + ':' + m + meridian;
	const voice = new SpeechSynthesisUtterance(text);
	window.speechSynthesis.speak(voice);	
}
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
	let hour = now.getHours();
	let minutes = formatTimeUnit(now.getMinutes());
	let meridian;
	
	if (hour < 12) {
		if (hour == 0) {
			hour = 12;
		}
		meridian = ' A.M.';
		speakTime(hour,minutes, meridian);
	} else {
		if (hour > 12) {
			hour = hour - 12;
		}
		meridian = ' P.M.';
		speakTime(hour,minutes, meridian);
	}
}

function speakTime(hour,minutes, meridian) {
	if (minutes == 0 || minutes == '00'){
		minutes = 'o&apos;clock';
	}
	const text = 'Time Now Is: ' + hour + ':' + minutes + meridian;
	const voice = new SpeechSynthesisUtterance(text);
	window.speechSynthesis.speak(voice);	
}
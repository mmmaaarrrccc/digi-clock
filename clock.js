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
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateStr = `${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
  document.getElementById('dates').innerHTML = dateStr;
}
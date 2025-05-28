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

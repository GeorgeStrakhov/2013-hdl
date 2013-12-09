function initJS() {
	var dones = getDones();
	manifestify(dones);
}

function getDones() {
	//fixture
	var dones = [
		'Leveled up in coding',
		'Leveled up in design',
		'Finally launched havedonelist'
	];
	return dones;
}

function donesToLines(dones) {
	var lines = '';
	$.each(dones, function(k,v){
		if(k != dones.length){
			lines+='<p class="singleDone">'+v+'</p>';
		}
	});

	lines+='<p class="singleDone">It\'s been a very good year</p>';

	return lines;
}

function manifestify(dones) {
	var donesLines = donesToLines(dones);
	$('.allDones').html(donesLines);
	$('.singleDone').slabText();
	$('.goodyear').slabText();
}

//Let's get going
$(document).ready(function($){
	console.log('Blast off!!!');
	initJS();
});
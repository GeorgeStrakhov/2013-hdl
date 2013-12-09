function initJS() {
	registerListeners();
	var dones = getDones();
	var author = getAuthor();
	prepopulateData({
		author: author,
		dones: dones
	});
	manifestify(dones);
}

function registerListeners() {
	$('#generateHDL').on('click', function(){
		var url = window.location.origin='?done='+encodeURIComponent($('#newHDLInput').val());
		window.location.href=url;
	});
}

function getDones() {
	var dones = String($.QueryString['done']);
	return dones;
}

function getAuthor() {
	var author = String($.QueryString['author']);
	return author;
}

function prepopulateData(dataObj) {
	$('#newHDLInput').val(dataObj.dones);
	$('.HDLAuthor').text(dataObj.author);
}

function donesToLines(dones) {
	donesLines = dones.trim().match(/[^\r\n]+/g);
	$.each(donesLines, function(k,v){
		if(String(v).length) {
			donesLines[k] = '<p class="singleDone">'+String(v)+'</p>';
		}
	});
	return donesLines;
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
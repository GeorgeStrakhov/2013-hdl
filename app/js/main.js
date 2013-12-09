//blast off
function initJS() {
	registerListeners();
	var dones = getParam('done');
	var author = getParam('author');
	var theme = getTheme(getParam('theme'));
	prepopulateData({
		author: author,
		dones: dones
	});
	manifestify(dones, theme);
}

//register event listeners
function registerListeners() {
	$('#generateHDL').on('click', function(){
		var url = window.location.origin='?done='+encodeURIComponent($('#newHDLInput').val());
		window.location.href=url;
	});
}

function getParam(pName) {
	var p = String($.QueryString[pName]);
	return p;
}

//prepopulate page elements with releveant data
function prepopulateData(dataObj) {
	$('#newHDLInput').val(dataObj.dones);
	$('.HDLAuthor').text(dataObj.author);
}

//turn string with newline chars into an array of <p> elements
function donesToLines(dones) {
	donesLines = dones.trim().match(/[^\r\n]+/g);
	$.each(donesLines, function(k,v){
		if(String(v).length) {
			donesLines[k] = '<p class="singleDone">'+String(v)+'</p>';
		}
	});
	return donesLines;
}

//join the <p>lines</p>, spice them up & return as HTML nodes ready to be appended
function linesToText(donesLines, theme) {
	var donesText = $.parseHTML(donesLines.join(''));
	$.each(donesText, function(k,v){
		$(v).addClass(theme+'-'+k);
	});
	return donesText;
}

//render manifesto
function manifestify(dones, theme) {
	var donesLines = donesToLines(dones);
	var donesText = linesToText(donesLines, theme);
	$('.allDones').addClass(theme).append(donesText);
	$('.singleDone').slabText();
	$('.goodyear').slabText();
}

//Let's get going
$(document).ready(function($){
	console.log('Blast off!!!');
	initJS();
});
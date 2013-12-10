//blast off
function initJS() {
	var dones = getParam('done');
	var footer = getParam('footer');
	var theme = getTheme(getParam('theme'));
	prepopulateData({
		footer: footer,
		dones: dones
	});
	manifestify(dones, theme);
}

//register event listeners
function registerListeners() {
	//create new
	$('#generateHDL').on('click', function(){
		var url = window.location.origin='?done='+encodeURIComponent($('#newHDLInput').val())+'&footer='+encodeURIComponent($('#newHDLFooter').val());
		window.location.href=url;
	});
	//resize handler
	$.viewportWidth = $(window).width();
	$(window).smartresize(function() {
		// Only run the resize code if the viewport width has changed.
		// we ignore the viewport height as it will be constantly changing.
		if($(window).width() == $.viewportWidth) {
			return;
		}
		$.viewportWidth = $(window).width();
		// console.log('resize to '+$.viewportWidth);
		initJS();
	});
}

function getParam(pName) {
	var p = String($.QueryString[pName]);
	return p;
}

//prepopulate page elements with releveant data
function prepopulateData(dataObj) {
	$('#newHDLInput').val(dataObj.dones);
	$('#newHDLFooter').val(dataObj.footer);
	$('.HDLFooter').text(dataObj.footer);
}

//turn string with newline chars into an array of <p> elements
function donesToLines(dones) {
	donesLines = dones.trim().match(/[^\r\n]+/g);
	$.each(donesLines, function(k,v){
		if(String(v).length) {
			if(v=="&") {
				donesLines[k] = '<div class="amp-div"><hr class="amp-hr" /><span class="amp">&amp;</span></div>';
			} else {
				donesLines[k] = '<p class="singleDone">'+String(v)+'</p>';
			}
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

//adjust line heights depending on the font-size, calculated by slabtext
function adjustLineHeights(){
	$('.singleDone').each(function(k,v){
		//ignore the first line
		if(k===0) return;
		//get this line's fontsize
		var fontsize = parseInt($(this).find('span').first().css('font-size').split('px')[0], 10);
		//get prev line's fontsize
		var prevFontsize = parseInt($(this).prev().find('span').first().css('font-size').split('px')[0], 10);
		//calculate and apply (mostly negative) top margin adj
		var adj = calculateMarginTopAdjustment(fontsize, prevFontsize);
		$(this).css('margin-top', adj+'px');
	});
}

//calculate top margin adjustment based on this and prev lines fontsize
function calculateMarginTopAdjustment(fontsize, prevFontsize) {
	var optRatio = 5.8;
	var topmargin = 0;
	topmargin = -1 * ((fontsize-prevFontsize)/optRatio);
	return topmargin;
}

//treat spacials such as line with a single amp etc.
function treatSpecials() {
	treatAmps();
}

function treatAmps() {
	//amp - <div class="amp-div"><hr class="amp-hr"/><span class="amp">&amp;</span></div>
	//scale amp to portion the size of the following
	$('.amp-div').each(function(){
		var ratio = 0.8;
		var nextFontSize = parseInt($(this).next().find('span').first().css('font-size').split('px')[0], 10);
		var fontSize = nextFontSize * ratio;
		$(this).css('height', fontSize/2);
		$(this).css('margin-top', fontSize/2);
		$(this).css('margin-bottom', fontSize/3);
		$(this).find('.amp').css('font-size', fontSize+'px');
		var ampWidth = $(this).find('.amp').first().innerWidth();
		var ampHeight = $(this).find('.amp').first().innerHeight();
		$(this).find('.amp').css('margin-left', '-'+ ampWidth/2+'px');
		$(this).find('.amp').css('top', '-'+ ampHeight/2+'px');
	});
}

//render manifesto
function manifestify(dones, theme) {
	var slabTextOptions = {
		"noResizeEvent" : true,
		"postTweak" : false
	};
	var donesLines = donesToLines(dones);
	var donesText = linesToText(donesLines, theme);
	$('.allDones').addClass(theme).html(donesText);
	$('.singleDone').slabText(slabTextOptions);
	adjustLineHeights();
	treatSpecials();
	$('.goodyear').slabText(slabTextOptions);
}

//Let's get going
$(window).bind('load', function(){
	console.log('Blast off!!!');
	registerListeners();
	initJS();
});
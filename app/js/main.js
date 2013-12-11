//blast off
function initJS() {
	var dones = getParam('done');
	var footer = getParam('footer');
	var theme = getTheme(getParam('theme'));
	var specialCases = getSpecialCases();
	prepopulateData({
		footer: footer,
		dones: dones
	});
	manifestify(dones, theme, specialCases);
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
function donesToLines(dones, specialCases) {
	donesLines = dones.trim().match(/[^\r\n]+/g);
	$.each(donesLines, function(k,v){
		if(String(v).length) {
			donesLines[k] = lineToHtml(v, specialCases);
		}
	});
	return donesLines;
}

function lineToHtml(line, specialCases) {
	var str = String(line);
	//default
	var HTML = '<p class="singleDone">'+str+'</p>';
	//special cases
	$.each(specialCases, function(){
		//if matches a pattern
		if(str.match(new RegExp(this.pattern, 'g'))) {
			//then do the smart replacement
			HTML = this.replacement(str);
		}
	});
	return HTML;
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
		var prevFontsize = getPrevFontSize($(this));
		//special adjustment for special cases
		if($(this).prev().hasClass('amp-div')){
			prevFontsize = 10;
		}
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

//treat specialcases for lines such as line with a single amp etc.
function treatSpecials(specialCases) {
	$.each(specialCases, function(){
		this.treatment();
	});
}

//get next slabtexted item's fontsize
function getNextFontSize(elem) {
	var nextEl = elem.nextAll("p.singleDone:first");
	if(!nextEl.length) {
		return getPrevFontSize(elem);
	}
	return parseInt(nextEl.find('.slabtext').first().css('font-size').split('px')[0], 10);
}

function getPrevFontSize(elem) {
	var prevEl = elem.prevAll("p.singleDone:first");
	if(!prevEl.length) {
		return getNextFontSize(elem);
	}
	return parseInt(prevEl.find('.slabtext').first().css('font-size').split('px')[0], 10);
}

//render manifesto
function manifestify(dones, theme, specialCases) {
	var slabTextOptions = {
		"noResizeEvent" : true,
		"postTweak" : true
	};
	var donesLines = donesToLines(dones, specialCases);
	var donesText = linesToText(donesLines, theme);
	$('.allDones').addClass(theme).html(donesText);
	$('.singleDone').slabText(slabTextOptions);
	adjustLineHeights();
	treatSpecials(specialCases);
	$('.goodyear').slabText(slabTextOptions);
}

//Let's get going
$(window).bind('load', function(){
	console.log('Blast off!!!');
	registerListeners();
	initJS();
});
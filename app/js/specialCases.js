function getSpecialCases() {
	var specialCases = [
		{
			name: 'amp',
			pattern: '^&$',
			replacement: function(line) {
				return '<div class="amp-div"><hr class="amp-hr"/><span class="amp">&amp;</span></div>';
			},
			treatment: function() {
				//scale amp to portion the size of the following line
				$('.amp-div').each(function(){
					var ratio = 0.8;
					var nextFontSize = getNextFontSize($(this));
					var fontSize = nextFontSize * ratio;
					// var nextLetterCount = getLetterCount($(this),'next');
					// if()
					$(this).css('height', fontSize/1.5);
					$(this).css('margin-top', fontSize/1.5);
					$(this).css('margin-bottom', fontSize/3);
					$(this).find('.amp').css('font-size', fontSize+'px');
					var ampWidth = $(this).find('.amp').first().innerWidth();
					var ampHeight = $(this).find('.amp').first().innerHeight();
					$(this).find('.amp').css('margin-left', '-'+ ampWidth/2+'px');
					$(this).find('.amp').css('top', '-'+ ampHeight/2+'px');
				});
			}
		},
		{
			name: 'ribbon',
			pattern: '^===.*===$',
			replacement: function(line) {
				line = line.replace(new RegExp('===', 'g'), '').trim();
				var HTML = '<div class="ribbon"><div class="ribbon-stitches-top"></div><strong class="ribbon-content"><h2>'+line+'</h2></strong><div class="ribbon-stitches-bottom"></div></div>';
				return HTML;
			},
			treatment: function() {
				console.log('treating ribbon...');
			}
		}
	];
	return specialCases;
}
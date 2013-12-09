function getTheme(themeName) {
	var themes = [
		'oldSanta'
	];
	if($.inArray( themeName, themes ) > -1) {
		return themeName;
	}
	return themes[0];
}
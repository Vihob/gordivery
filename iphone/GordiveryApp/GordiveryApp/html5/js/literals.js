(function( window, undefined ) {

	//constants
	var kDefaultLang = "es";
	var kLSLang = "kLSLang";

	//define literals on json bellow
	var allLiterals = utils.retriveJSONParseWithLocalStorageKey(k_LITERALS_DICT_KEY);

	var storedLang = localStorage.getItem(kLSLang);	
	var currentLanguage = kDefaultLang;
	if (storedLang) currentLanguage = storedLang;

	//CLASSES
	var L = {

		/**
		* Save literals to localStorage
		*/
		loadLiterals : function(success,error){
			$.ajax({
				url: "../strings/literales.json",
				type: "GET",
				dataType: "json",
				success: function(data){
					allLiterals = data;
					// Put the object into storage
					localStorage.setItem(k_LITERALS_DICT_KEY, JSON.stringify(data));
					success();
				},
				error: error
				});
		},

		/**
		* Retrieves the literal related to specified key using current language
		* @param key {String} key literal
		* @param success {Function(Object json)} function to receive json in case of success
		* @param error {Function(jqXHR, textStatus, errorThrown)} function in case of error
		*/
		get : function(key){
			if(allLiterals == null) return key;
			var lang = allLiterals[currentLanguage];
			if(lang == null) return key;
			var text = lang[key];
			if(text == null) return key;
			return text;					
		},

		/**
		* Sets app current language
		* @param key {String} current language string (ex: 'en')		
		*/
		setCurrentLanguage : function(lang){
			currentLanguage = lang;
			localStorage.setItem(kLSLang, currentLanguage);
		}
		
	};

	//Exposing L
	window.L = L;

})( window );
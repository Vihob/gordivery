/*
This js file requires to have jquery imported previously.

Dependencies:
	- Defines.js
*/

(function( window, undefined ) {

	//Dropbox versions - Requires a json inside Dropbox (rosa@mobivery.com account) public folder.
	var dropboxJsons = false;	//Base and Domains
	
	var kBaseAPIURL = "www.lineacaminos.com/uniScripts/mgrqispi.dll?APPNAME=eFIDES&PRGNAME=";

	// Application URLS
	var kGetOffices = "https://"+kBaseAPIURL+"AppsConsultaOficina";
	var kLogin = "https://"+kBaseAPIURL+"AppsLoginLC";//&IUA=Mobivery&CAA=AppsMovil
	var kLoginUsernameParam = "&IUA=";
	var kLoginPasswordParam = "&CAA=";
	var kGetContacts = "https://"+kBaseAPIURL+"AppsContacto";
	var kGetDisclaimers = "https://"+kBaseAPIURL+"AppsAvisoLegal";

	//Setting malcom variables in case of android
	if(typeof(mbApi) !== 'undefined'){
		kBaseAPIURL = mbApi.getUrl("baseAPIUrl");
		kLogin = "https://"+kBaseAPIURL+mbApi.getUrl('serviceLoginUrl');
		kGetOffices = "https://"+kBaseAPIURL+mbApi.getUrl('serviceOfficesUrl');
		kGetContacts = "https://"+kBaseAPIURL+mbApi.getUrl('serviceContactsUrl');
		kGetDisclaimers = "https://"+kBaseAPIURL+mbApi.getUrl('serviceDisclaimersUrl');
    }

	var k_TimeOut = 10;
	var k_LongTimeOut = 25;

	var kFIRST_PAGE_NUMBER = 1;			/// Set the first page to search for offers
	var APP_EVENTS_PAGE_SIZE  = 10;     /// Set values multiples of 10
	var kMaxResultsPerPage = 20;     /// Set the max results per page on search offers


	//*******************************************************
	//	PRIVATE FUNCTIONS
	//*******************************************************

	//CLASSES
	var restConsumer = {

		/**
		* Get Office info
		* @param success {Function(Object json)} function to receive json in case of success
		* @param error {Function(jqXHR, textStatus, errorThrown)} function in case of error
		* @param office_index office index to parse
		*/
		getOfficeInfo: function(success, error, office_index){

			var url = kGetOffices;
			if(dropboxJsons)
				url = "http://dl.dropbox.com/u/89277349/lineaCaminos/offices_4.xml";

			// Try to open and parse a XML document
			$.ajax({
        		type: "GET",
        		url: url,
       			dataType: "xml",
        		success: parseXML,
        		error: error
      		});

      		function parseXML(xml){
      			var offices = new Array();

      			$(xml).find("NODO").each(function() {
    				offices.push( DAO.parseOffice(this) );
  				});

      			success( offices[office_index], 200 );
      		}
		},

		/**
		* Get contacts info
		* @param success {Function(Object json)} function to receive json in case of success
		* @param error {Function(jqXHR, textStatus, errorThrown)} function in case of error
		*/
		getContactsInfo: function(success, error){

			var url = kGetContacts;
			if(dropboxJsons)
				url = "http://dl.dropbox.com/u/89277349/lineaCaminos/contactos.xml";

			// Try to open and parse a XML document
			$.ajax({
        		type: "GET",
        		url: url,
       			dataType: "xml",
        		success: parseXML,
        		error: error
      		});

      		function parseXML(xml){
      			var contacts = new Array();

      			$(xml).find("SERVICIOS_ENTIDAD").each(function() {
    				contacts.push( DAO.parseContact(this) );
  				});

      			success( contacts, 200 );
      		}
		},

		/**
		* Get disclaimers info
		* @param success {Function(Object json)} function to receive json in case of success
		* @param error {Function(jqXHR, textStatus, errorThrown)} function in case of error
		*/
		getDisclaimersInfo: function(success, error){

			var url = kGetDisclaimers;
			if(dropboxJsons)
				url = "http://dl.dropbox.com/u/89277349/lineaCaminos/legal.xml";

			// Try to open and parse a XML document
			$.ajax({
        		type: "GET",
        		url: url,
       			dataType: "xml",
        		success: parseXML,
        		error: error
      		});

      		function parseXML(xml){
      			var disclaimers = new Object();

      			disclaimers = DAO.parseDisclaimers($(xml).find("INFORMACION_LEGAL"));

      			success( disclaimers, 200 );
      		}
		},

		/**
		* Get Office1 info
		* @param success {Function(Object json)} function to receive json in case of success
		* @param error {Function(jqXHR, textStatus, errorThrown)} function in case of error
		*/
		doLogin: function(success, error, anUser, aPassword){

			//get base login URL
			var url = kLogin;

			//add get parameters login req
			url = url + kLoginUsernameParam + anUser + kLoginPasswordParam + aPassword;

			//Don't needed. Its impossible to get accesToken with fake JSON.
			if(dropboxJsons)
				url = "http://dl.dropbox.com/u/89277349/lineaCaminos/login.xml";

			// Try to open and parse a XML document
			$.ajax({
        		type: "GET",
        		url: url,
       			dataType: "xml",
        		success: parseXML,
        		error: error
      		});

      		function parseXML(xml){
      			var login = DAO.parseLogin(xml);      			
      			success( login, 200 );
      		}
		},
		
		/**
		* Indicates whether rest consumer is in fake mode or not.
		*/
		fakeMode : function(){
			return dropboxJsons;
		}
	};

	//Exposing restConsumer
	window.restConsumer = restConsumer;

})( window );
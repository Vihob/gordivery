/*
This js file requires to have jquery imported previously.

Dependencies:
	- Defines.js
*/

(function( window, undefined ) {

	//Dropbox versions - Requires a json inside Dropbox (rosa@mobivery.com account) public folder.
	var dropboxJsons = false;	//Base and Domains
	
	var kBaseAPIURL = "http://finappsapi.bdigital.org/api/2012/5108b053ed/";

	// Application URLS
	var kGetCommerces = "operations/commerce/search/near";
	var kGetCommerceDetail = "operations/commerce/";

	var k_TimeOut = 10;
	var k_LongTimeOut = 25;

	var kFIRST_PAGE_NUMBER = 1;			/// Set the first page to search for offers
	var APP_EVENTS_PAGE_SIZE  = 10;     /// Set values multiples of 10
	var kMaxResultsPerPage = 20;     /// Set the max results per page on search offers


	//*******************************************************/
	//	PRIVATE FUNCTIONS
	//*******************************************************/

	//CLASSES
	var restConsumer = {

		getComerces : function(lat,lon, success, error){

			var accessToken = localStorage.getItem( k_USER_LOGIN_TOKEN );
			accesToken = "608-b0cc-ac39ede03a74";
			var url = kBaseAPIURL + accesToken+"/"+kGetCommerces+"?lat="+lat+"&lng="+lon+"&radius=0.5";
			var type = 'GET';
			
			// Your code here
	        $.ajax({
	            //this is a 'cross-origin' domain
	            url : url,
	            type : type,
	            contentType: 'application-json',
				dataType : 'json',
	            success : success,
	            error : error
	        });
		},
		
		getComerceDetail : function(idComerce, success, error){

			var accessToken = localStorage.getItem( k_USER_LOGIN_TOKEN );
			accesToken = "608-b0cc-ac39ede03a74";
			var url = kBaseAPIURL + accesToken+"/"+kGetCommerceDetail+idComerce;
			var type = 'GET';
			
			// Your code here
	        $.ajax({
	            //this is a 'cross-origin' domain
	            url : url,
	            type : type,
	            contentType: 'application-json',
				dataType : 'json',
	            success : success,
	            error : error
	        });
		},
		
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
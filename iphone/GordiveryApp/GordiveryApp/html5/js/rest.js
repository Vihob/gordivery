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
	var kDoLogin = kBaseAPIURL+"/access/login";
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
			var url = kDoLogin;

			var Authorization = $.base64.encode( anUser+aPassword );

			// Try to open and parse a XML document
			$.ajax({
	            url : url,
	            dataType : 'json',
	            beforeSend : function(xhr){
	                xhr.setRequestHeader('Authorization',Authorization);
	            },
	            success : success,
	            error : error
        	});
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
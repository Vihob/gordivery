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
	var kGetCommerces = kBaseAPIURL+"operations/commerce/search/near?lat=41.402391&lng=2.194765&radius=0.5";


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

			var accessToken = localStorage.getItem( k_ACCESS_TOKEN_KEY );
			if(!dropboxJsons && !utils.isNotEmptyLocalStorageStringKey(accessToken)){
				error();
				return;
			}
			
			var url = kGetMovement;
			var data = DAO.getMovementDetailPushData(accessToken,movementId);
			var type = 'POST';
			
			console.log("Get Movements data: "+data);
			
			if(dropboxJsons){
				url = "https://dl.dropbox.com/u/89277349/caminosOnTime/detalle_movimiento.xml";
				data = '';
				type = 'GET';
			}
			
			// Your code here
	        $.ajax({
	            //this is a 'cross-origin' domain
	            url : url,
	            type : type,
	            data : data,
	            contentType: 'text/xml',
				dataType : 'xml',
	            success : parseXML,
	            error : error
	        });
	        
	        function parseXML(xml){
      			var movement = new Object();

      			movement = DAO.parseMovement($(xml).find("DETALLE_MOVIMIENTO"));

      			success( movement, 200 );
	        }
		},
		
		/**
		* Indicates whether rest consumer is in fake mode or not.
		*/
		fakeMode : function(){
			return dropboxJsons;
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
	};

	//Exposing restConsumer
	window.restConsumer = restConsumer;

})( window );
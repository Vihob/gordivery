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
	var kGetTransactionsList = "https://dl.dropbox.com/u/30237644/FinApps/categories_";

	var kGetAccount = "operations/client/profile/@me";
	var kGetCreditCard = "operations/card/";
	
	var kDoPayment = "operations/payment/"

	var k_TimeOut = 10;
	var k_LongTimeOut = 25;

	var kFIRST_PAGE_NUMBER = 1;			/// Set the first page to search for offers
	var APP_EVENTS_PAGE_SIZE  = 10;     /// Set values multiples of 10
	var kMaxResultsPerPage = 20;     /// Set the max results per page on search offers


	//*******************************************************/
	//	PRIVATE FUNCTIONS
	//*******************************************************/
	
	function sleep(miliseconds) {
		var dt = new Date();
		dt.setTime(dt.getTime() + miliseconds);
		while (new Date().getTime() < dt.getTime());
	}

	//CLASSES
	var restConsumer = {

		getComerces : function(lat,lon, success, error){

			var accessToken = localStorage.getItem( k_USER_LOGIN_TOKEN );

			var url = kBaseAPIURL + accessToken+"/"+kGetCommerces+"?lat="+lat+"&lng="+lon+"&radius=0.5";
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
			var url = kBaseAPIURL + accessToken+"/"+kGetCommerceDetail+idComerce;
			var type = 'GET';
			
			// Your code here
	        $.ajax({
	            //this is a 'cross-origin' domain
	            url : url,
	            type : type,
	            contentType: 'application-json',
				dataType : 'json',
	            success : addIDToSuccess,
	            error : error
	        });
			function addIDToSuccess(data,status) {
				success(data,status,idComerce);
			}
		},

		getTransactionsList: function(categoryId, success, error){

			var url = kGetTransactionsList+categoryId+'.json';
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
		
		getUserAccount: function(success, error) {
			var accessToken = localStorage.getItem( k_USER_LOGIN_TOKEN );

			var url = kBaseAPIURL + accessToken+"/"+kGetAccount;
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
		
		getCreditCardItem: function(creditID, success, error) {
			var accessToken = localStorage.getItem( k_USER_LOGIN_TOKEN );

			var url = kBaseAPIURL + accessToken+"/"+kGetCreditCard+creditID+"/status";
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
		
		askPayment: function(comercId, success, error) {
			var accessToken = localStorage.getItem( k_USER_LOGIN_TOKEN );
			sleep(5000);
			var url = kBaseAPIURL + accessToken+"/"+kGetCreditCard+comercId+"/status";
			var type = 'GET';
			var data = '{"code":"80808-23123-182312","value": 150}'
			data.code = "80808-23123-182312";
			data.value = 140;
	        success(data);

		},
		
		doPayment: function(code,creditCardID, success, error) {
			var accessToken = localStorage.getItem( k_USER_LOGIN_TOKEN );
			var url = kBaseAPIURL + accessToken+"/billing/"+code+"/exec";
			var type = 'POST';
			
			var data = '{"idCard": "'+creditCardID+'"}'
			// Your code here
	        $.ajax({
	            //this is a 'cross-origin' domain
	            url : url,
	            type : type,
				data : data,
	            contentType: 'application-json',
				dataType : 'json',
	            success : success,
	            error : success //Application demo purpose
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
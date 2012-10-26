/*
This js file requires to have jquery imported previously.

Dependencies:
	- Defines.js
*/

(function( window, undefined ) {

	//Dropbox versions - Requires a json inside Dropbox (rosa@mobivery.com account) public folder.
	var dropboxJsons = false;	//Base and Domains
	
	var kBaseAPIURL = "www.finapps.services/";

	// Application URLS
	var kGetCommerces = "https://"+kBaseAPIURL+"...";

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

		//TODO
		//Implements services...
		
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
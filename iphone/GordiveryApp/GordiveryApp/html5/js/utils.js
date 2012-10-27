/*
 Dependencies:
  - jquery-1.7.2.js
  - Defines.js
*/

(function( window, undefined ) {

  //Base and Domains

  /**
  *  PRIVATE FUNCTIONS
  *************************************/

    function formatDate(date){
      var year = date.getFullYear();
      if(year < 2000){
        year = year % 1900;
      }
      else {
        year = year % 2000;
      }
      var month = date.getMonth();
      if(month < 10){
        month = "0"+month;
      }
      var day = date.getDate();
      if(day < 10){
        day = "0"+day;
      }

      return day+"/"+month+"/"+year;
    }

    function isToday(aDate){
       var now = new Date();
       return equalDatesIgnoringTime(aDate,now);
    }

    function currentMs(){
       var currentTime = new Date();
       var currentMs = Date.UTC(currentTime.getUTCFullYear(),currentTime.getUTCMonth(),currentTime.getUTCDate(),currentTime.getUTCHours(),currentTime.getUTCMinutes(),currentTime.getUTCSeconds(),currentTime.getUTCMilliseconds());
       return currentMs;
    }

    function isTomorrow(aDate){
        var utcTime = currentMs();
        utcTime = utcTime + 86400000; //Adding one day
        var tomorrow = new Date(utcTime);
        return equalDatesIgnoringTime(aDate,tomorrow);
    }

    function isYesterday(aDate){
        var utcTime = currentMs();
        utcTime = utcTime - 86400000; //Adding one day
        var yesterday = new Date(utcTime);
        return equalDatesIgnoringTime(aDate,yesterday);
    }

    function equalDatesIgnoringTime(aDate, anotherDate){
      return aDate.getUTCFullYear() == anotherDate.getUTCFullYear() &&
             aDate.getUTCMonth() == anotherDate.getUTCMonth() &&
             aDate.getUTCDate() == anotherDate.getUTCDate();
    }

    function dateFromJsonDate(jDate){
       var elems = jDate.split("T"); //splitting yyyy-MM-dd,hh-mm-ss.000+0000
       var dateElems = elems[0].split("-"); //year,month,day
       var timeElems = elems[1].split("\.")[0].split(":"); //hours,minutes,seconds

       return new Date(dateElems[0],dateElems[1],dateElems[2],timeElems[0],timeElems[1],timeElems[2],'000');
    }

  /**
  *  CLASSES - PUBLIC FUNCTIONS
  *************************************/

  var utils = {

    /**
    /* Retrives URL Request Parameters String
    */
    getUrlParamsString: function(){
      //return window.location.href.slice(window.location.href.indexOf('?') + 1);
      return localStorage.getItem(k_REQUEST_STORED_PARAMS);
    },
    /**
    /* Save URL Request Parameters to localStorage
    */
    setUrlParams: function(params){
      localStorage.setItem(k_REQUEST_STORED_PARAMS,params);
    },
    /**
    * Retrieves URL Request Parameters
    */
    getUrlParams: function(){
      var vars = [], hash;
      var params = localStorage.getItem(k_REQUEST_STORED_PARAMS);
      if (params == null) { 
        return null;
      };
      var hashes = params.split('&');
      for(var i = 0; i < hashes.length; i++)
      {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },
    /**
    * Retrieves URL Request name Parameter
    * @param name {String} parameter name
    */
    getUrlParam: function(name){
      var params = this.getUrlParams();
      if(params === null) return null;
      return params[name];
    },

    /**
    * Takes a date in Json format and returs the string to show (today, yesterday, or dd/mm/yy)
    * @param jDate {String} date in json format 
    * @param isAbreviation {bool} indicates wether today and yesterday must be shown or not.
    */
    dateStringFromJsonDate: function(jDate, isAbreviation){
      var date = dateFromJsonDate(jDate);
      if(isAbreviation){
        if(isToday(date)){
          return L.get("_today");
        }
        else if(isYesterday(date)){
          return L.get("_yesterday");
        }
        else{
          return formatDate(date);
        }
      }
      else {
          return formatDate(date);
      }
    },
    /**
    * Returns the current date in milliseconds from 1970
    */
    currentMs: currentMs,
    /**
    * Returs wether the theCheck string is included in the theString string, it removes accents and upper cases 
    * after comparing.
    */
    stringContains : function(theString, theCheck){
      var origin = theString.toLowerCase();
      origin = origin.replace(/á/,"a"); 
      origin = origin.replace(/é/,"e"); 
      origin = origin.replace(/í/,"i"); 
      origin = origin.replace(/ó/,"o"); 
      origin = origin.replace(/ú/,"u");
      var part = theCheck.toLowerCase();
      part = part.replace(/á/,"a");
      part = part.replace(/é/,"e");
      part = part.replace(/í/,"i");
      part = part.replace(/ó/,"o");
      part = part.replace(/ú/,"u");
      
      var ind = origin.indexOf(part);
      return ind != -1;
    },
    /**
    * Show Activity View
    */
    showActivityView: function(){
      var loadingString = L.get("_loading");
      if(typeof(mbApi) !== 'undefined'){
    	  mbApi.showLoading(loadingString);
      }
      else{
    	  // window.location = "showloading:"+loadingString;
      }
    },
    /**
    * Hide Activity View
    */
    hideActivityView: function(){
	    if(typeof(mbApi) !== 'undefined'){
	  	    mbApi.hideLoading();
	    }
	    else{
	    	// window.location = "hideloading:nothing";
	    }
    },
    /** 
    /* Check if is not empty string
    */
    isNotEmptyString: function(string){
        return (string && string !== null && string.length > 0);
    },

    /** 
    /* Check if is not empty localStorage string key
    */
    isNotEmptyLocalStorageStringKey: function(string){
        return (string && string !== null && string !== 'null' && string.length > 0);
    },
    
    /**
    /* Retrives the parsed content of the key in localStorage
    */
    retriveJSONParseWithLocalStorageKey: function(key){
      if (localStorage.getItem(key))
        return JSON.parse( localStorage.getItem(key) );
      return null;
    },

    /**
    /* Show alert call with title and message
    * @param title {String} alert title
    * @param message {String} alert message
    */
    showAlertCallWithTitleAndMessage: function(title,message){
      var alertCall = '';
      alertCall = 'alert:<title>'+title+'<message>'+message;
      window.location = alertCall;
    }

  };

  //Exposing utils
  window.utils = utils;

})( window );
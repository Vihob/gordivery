/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var disclaimerController = function (){

    var viewLoaded = function(){

      //Load literals prior to any action
      L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es');

        //Initialize mainController
        disclaimerController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });
        
    }

    var viewWillAppear = function(){

      utils.showActivityView();

      //Get disclaimers info
      restConsumer.getDisclaimersInfo(onGetDisclaimers, onGetDisclaimersError);
    }

    /**
    * Create a view with a contacts info
    * @param contactsInfo {Json} Contacts information in json format
    */
    function createDisclaimersDetailView ( disclaimersInfo ){

      var page = $("#disclaimer_page");
      //Clearing page on reload
      page.html(null);

      //Common html class and containers
      var containerClass = 'disclaimer_wrapper';
      var disclaimerTitleClass = 'disclaimer_title';
      var disclaimer_bloc_iconClass = 'disclaimer_bloc_disclosure_icon';
      var disclaimer_bloc_lineContainer = '<div class="disclaimer_bloc_line"></div>';

      var disclaimer = new Object();

      //Disclaimer
      for (var index = 0; index < disclaimersInfo.length; index++) {
        disclaimer = disclaimersInfo[index];

        //$(page).append('<div id="disclaimer_title_'+index+'" class="'+disclaimerTitleClass+'">'+disclaimer.title+'</div>');

        var disclaimer_bloc = $('<div id="disclaimer_wrapper_'+index+'" class="'+containerClass+'"></div>');
        $(page).append(disclaimer_bloc);
        $("#disclaimer_wrapper_"+index).append('<a id="disclaimer_bloc_'+index+'" class="disclaimer_bloc_ahref" href="push:'+k_DISCLAIMER_DETAIL_VIEW_PATH+'"></a>');
        $("#disclaimer_bloc_"+index).append('<div class="'+disclaimer_bloc_iconClass+'"></div>');
        $("#disclaimer_bloc_"+index).append('<div id="disclaimer_title_'+index+'" class="'+disclaimerTitleClass+'">'+disclaimer.title+'</div>');

        $(page).append(disclaimer_bloc_lineContainer);

        //Add click action to each bloc
        disclaimer_bloc.click( function(){ 
          var selectedIndex = parseInt(this.id.replace('disclaimer_wrapper_',''));
          onDisclaimerClick( disclaimersInfo[selectedIndex] );
        } );

      }
    }

    function onDisclaimerClick( disclaimerInfo ) {
      localStorage.setItem( K_DISCLAIMER_OBJECT_KEY, JSON.stringify( disclaimerInfo ));
    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------
    function onGetDisclaimers(data, statusCode){
      if (data) {
        createDisclaimersDetailView ( data );
        saveStoredInfo(data);
      }
      utils.hideActivityView();
    }

    //--------------------------------------------------------------
    function onGetDisclaimersError(){
      //Check if stored info exist
      loadStoredInfo();

      utils.hideActivityView();
    }

    //--------------------------------------------------------------
    // Store methods
    //--------------------------------------------------------------

    function saveStoredInfo(data){
      localStorage.setItem( k_DISCLAIMERS_STORED_DATA_KEY, JSON.stringify( data ));
    }

    function loadStoredInfo(){

      var storedData = utils.retriveJSONParseWithLocalStorageKey( k_DISCLAIMERS_STORED_DATA_KEY );
      if (storedData) {
        createDisclaimersDetailView ( storedData );
      } else {
        var page = $("#disclaimer_page");
        page.html(null);
        $(page).append('<div id="no_info" class="no_info">No info! TODO...</div>');
      };
    }

    //Functions or variables returned here will be public (accessing like disclaimerController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();
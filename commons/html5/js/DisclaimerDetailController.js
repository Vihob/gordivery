/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var disclaimerDetailController = function (){

    var disclaimerInfo;

    var viewLoaded = function(){

      //Load literals prior to any action
      L.loadLiterals(function(){

      //Select spanish as default language
      L.setCurrentLanguage('es');

      //Load disclaimerInfo stored data
      loadStoredData();

      //Initialize mainController
      disclaimerDetailController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });
        
    }

    var viewWillAppear = function(){
      createDisclaimerDetailView();
    }

    /**
    * Create a view with a disclaimer detail info
    */
    function createDisclaimerDetailView (){

        var page = $("#disclaimer_detail_page");
        //Clearing page on reload
        page.html(null);

        //Common html class and containers
        var containerClass = 'disclaimer_detail_wrapper';
        var nodeTitleClass = 'disclaimer_detail_title';
        var nodeDescriptionClass = 'disclaimer_detail_description';

        $(page).append('<div id="disclaimer_detail_wrapper" class="'+containerClass+'"></div>');

        for (var index = 0; index < disclaimerInfo.nodes.length; index++) {
          var node = disclaimerInfo.nodes[index];

          $("#disclaimer_detail_wrapper").append('<div class="'+nodeTitleClass+'">'+node.name+'</div>');
          $("#disclaimer_detail_wrapper").append('<div class="'+nodeDescriptionClass+'">'+node.description+'</div>');
        }

        $(page).append('<div id="disclaimer_detail_wrapper" class="'+containerClass+'">'+sampleText+'</div>');

    }

    /**
    * This method get offerDetail storedData from localStorage
    */
    function loadStoredData(){
      //Get disclaimerInfo from localStorage
      disclaimerInfo =  utils.retriveJSONParseWithLocalStorageKey( K_DISCLAIMER_OBJECT_KEY );
    }

    //Functions or variables returned here will be public (accessing like disclaimerDetailController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();
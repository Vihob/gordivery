/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var transactionsListController = function (){
	
	var comercList = [];

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Initialize mainController
        transactionsListController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

        utils.showActivityView();

        var categoryIdent = localStorage.getItem( k_CATEGORY_IDENT );

        restConsumer.getTransactionsList(categoryIdent,onListReceived,onListError);
    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------
    function setupCell( cellInfo )
    {
	
	  var cell = $('<li class="man_det_list_item" id="man_det_list_item">');

	  /*var img = $("<div class=\"near_li_img\" id=\"near_li_img\"><img src=\"../imgs/starbucks_cafe.png\"></div>");
      var comercName = $("<div class=\"near_li_name\">" + cellInfo.data.publicName + "</div>"); 
	  var address = "";
      if ( cellInfo.data.address != null ) {
		var address = cellInfo.data.address.street +","+ cellInfo.data.address.number;
	  }
      var addressLabel = $("<div class=\"near_li_description\">" + address + "</div>");
	  var distance = lineDistance(41.402391,2.194765,cellInfo.data.location[0],cellInfo.data.location[1]);
	  distance = parseFloat(distance)
      var distanceLabel = $("<div class=\"near_li_distance\"> "+distance.toFixed(0)+ "m" + "</div>");*/

      return cell;
    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------

    function onListReceived(data, statusCode){        
        if (data) {          
	         setupCell(data);
        } 

        utils.hideActivityView();
    }

    function onListError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }

    //Functions or variables returned here will be public (accessing like transactionsListController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();
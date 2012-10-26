/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var contactsController = function (){

    var viewLoaded = function(){

      //Load literals prior to any action
      L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es');

        //Initialize mainController
        contactsController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });
        
    }

    var viewWillAppear = function(){

      utils.showActivityView();

      //Get contacts info
      restConsumer.getContactsInfo(onGetContacts, onGetContactsError);
    }

    /**
    * Create a view with a contacts info
    * @param contactsInfo {Json} Contacts information in json format
    */
    function createContactsDetailView ( contactsInfo ){

      var page = $("#contacts_page");
      //Clearing page on reload
      page.html(null);

      //Common html class and containers
      var containerClass = 'contact_wrapper';
      var contactTitleBackgroundClass = 'contact_title_background';
      var contactTitleClass = 'contact_title';
      var areaTitleBackgroundClass = 'area_title_background';
      var areaTitleClass = 'area_title';
      var blocContainerClass = 'area_bloc_container';
      var area_bloc_iconClass = 'area_bloc_icon';
      var area_bloc_lineContainer = '<div class="area_bloc_line"></div>';

      //Contacts
      for (var index = 0; index < contactsInfo.length; index++) {
        var contact = contactsInfo[index];

        $(page).append('<div id="contact_wrapper_'+index+'" class="'+containerClass+'"></div>');
        $("#contact_wrapper_"+index).append('<div id="contact_title_background'+index+'" class="'+contactTitleBackgroundClass+'"></div>');
        $("#contact_title_background"+index).append('<div id="contact_title_'+index+'" class="'+contactTitleClass+'">'+contact.name+'</div>');

        for(var areaIndex = 0; areaIndex < contact.areas.length; areaIndex++) {
          var area = contact.areas[areaIndex];
          var concreteAreaIndex = ''+index+''+areaIndex+'';
          $("#contact_wrapper_"+index).append('<div id="area_wrapper_'+concreteAreaIndex+'"></div>');
          $("#area_wrapper_"+concreteAreaIndex).append('<div id="area_title_background'+concreteAreaIndex+'" class="'+areaTitleBackgroundClass+'"></div>');
          $("#area_title_background"+concreteAreaIndex).append('<div id="area_title_'+concreteAreaIndex+'" class="'+areaTitleClass+'">'+area.description+'</div>');
          //Phones
          for (var phoneIndex = 0; phoneIndex < area.phones.length; phoneIndex++) {
            var phone = area.phones[phoneIndex];
            var concretePhoneIndex = ''+concreteAreaIndex+''+phoneIndex+'';

            $("#area_wrapper_"+concreteAreaIndex).append('<a id="area_bloc_phone_'+concretePhoneIndex+'" class="area_bloc_phone_ahref" href="tel:'+phone.description+'"></a>');
            $("#area_bloc_phone_"+concretePhoneIndex).append('<div id="bloc_container_phone_'+concretePhoneIndex+'" class="'+blocContainerClass+'"></div>');
            $("#bloc_container_phone_"+concretePhoneIndex).append('<div class="'+area_bloc_iconClass+' contacts_bloc_icon_phone"></div>');
            $("#bloc_container_phone_"+concretePhoneIndex).append('<div class="area_bloc_text">'+
              '<span class="area_bloc_text_name">'+phone.name+'</span>' +
              ' '+ 
              '<span class="area_bloc_text_description">'+phone.description+'</span>' +
               '</div>');
            $("#area_wrapper_"+concreteAreaIndex).append(area_bloc_lineContainer);
          }

          //Fax
          $("#area_wrapper_"+concreteAreaIndex).append('<div id="bloc_container_fax_'+concreteAreaIndex+'" class="'+blocContainerClass+'"></div>');
          $("#bloc_container_fax_"+concreteAreaIndex).append('<div class="'+area_bloc_iconClass+' contacts_bloc_icon_fax"></div>');
          $("#bloc_container_fax_"+concreteAreaIndex).append('<div class="area_bloc_text">'+
            '<span class="area_bloc_text_name">'+area.fax.name+'</span>' +
            ' '+ 
            '<span class="area_bloc_text_description">'+area.fax.description+'</span>' +
             '</div>');
          $("#area_wrapper_"+concreteAreaIndex).append(area_bloc_lineContainer);

          //Email
          $("#area_wrapper_"+concreteAreaIndex).append('<a id="area_bloc_email_'+concreteAreaIndex+'" class="area_bloc_email_ahref" href="mailto:'+area.email.description+'"></a>');
          $("#area_bloc_email_"+concreteAreaIndex).append('<div id="bloc_container_email_'+concreteAreaIndex+'" class="'+blocContainerClass+'"></div>');
          $("#bloc_container_email_"+concreteAreaIndex).append('<div class="'+area_bloc_iconClass+' contacts_bloc_icon_email"></div>');
          $("#bloc_container_email_"+concreteAreaIndex).append('<div class="area_bloc_text">'+
            '<span class="area_bloc_text_name">'+area.email.name+'</span>' +
            ' '+ 
            '<span class="area_bloc_text_description">'+area.email.description+'</span>' +
             '</div>');
          $("#area_wrapper_"+concreteAreaIndex).append(area_bloc_lineContainer);

          //Direction
          var systemPlatformConstant = "systemPlatformConstant";
          var latitude = area.direction.latitude;
          var longitude = area.direction.longitude;
          var coords = (latitude + ',' + longitude);
          var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?center='+coords+'&zoom=15&size=640x640&maptype=roadmap&markers=color:blue%7Clabel:%7C'+coords+'&sensor=true';
          
          $("#area_wrapper_"+concreteAreaIndex).append('<a id="area_bloc_direction_'+concreteAreaIndex+'" class="area_bloc_direction_ahref" href="maps:http://maps.'+systemPlatformConstant+'.com/maps?saddr='+k_USER_LOCATION_KEY+'+&daddr='+coords+'"></a>');
          $("#area_bloc_direction_"+concreteAreaIndex).append('<div id="bloc_container_direction_'+concreteAreaIndex+'" class="'+blocContainerClass+'"></div>');
          $("#bloc_container_direction_"+concreteAreaIndex).append('<div class="'+area_bloc_iconClass+' contacts_bloc_icon_direction"></div>');
          $("#bloc_container_direction_"+concreteAreaIndex).append('<div class="area_bloc_text">'+
            '<span class="area_bloc_text_name">'+area.direction.name+'</span>' +
            ' '+ 
            '<span class="area_bloc_text_description">'+area.direction.description+'</span>' +
             '</div>');
        }
      }

    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------
    function onGetContacts(data, statusCode){
      if (data) {
        createContactsDetailView ( data );
        saveStoredInfo(data);
      }
      utils.hideActivityView();
    }

    //--------------------------------------------------------------
    function onGetContactsError(){      
      //Check if stored info exist
      loadStoredInfo();

      utils.hideActivityView();
    }

    //--------------------------------------------------------------
    // Store methods
    //--------------------------------------------------------------

    function saveStoredInfo(data){
      localStorage.setItem( k_CONTACTS_STORED_DATA_KEY, JSON.stringify( data ));
    }

    function loadStoredInfo(){

      var storedData = utils.retriveJSONParseWithLocalStorageKey( k_CONTACTS_STORED_DATA_KEY );
      if (storedData) {
        createContactsDetailView ( storedData );
      } else {
        var page = $("#contacts_page");
        page.html(null);
        $(page).append('<div id="no_info" class="no_info">No info! TODO...</div>');
      };
    }

    //Functions or variables returned here will be public (accessing like contactsController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();
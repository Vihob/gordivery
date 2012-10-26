(function( window, undefined ) {

      var DAO = {

            //*******************************************************
            //    OFFICES
            //*******************************************************

            /**
            * Parse an office XML object and returns a JSON type object 
            * @param officeXML {Object} XML object to parse
            * @return office {Object} Object with office information 
            */
            parseOffice: function(officeXML){
                  var office = new Object();

                  office.name = $(officeXML).find("TITULO_DE_NODO").text();
                  office.description = $(officeXML).find("DESCRIPCION_DE_NODO").text();

                  office.direction = DAO.parseDirection($(officeXML).find("DIRECCION"));

                  office.phones = new Array();
                  $(officeXML).find("TELEFONO").each(function() {
                        office.phones.push( DAO.parsePhoneObject(this) );
                  });

                  office.fax = DAO.parseCommonObject($(officeXML).find("FAX"));

                  office.email = DAO.parseCommonObject($(officeXML).find("EMAIL"));

                  office.horariosSedes = new Array();
                  $(officeXML).find("SEDE").each(function() {
                        office.horariosSedes.push( DAO.parseSede(this) );
                  });

                  return office;
            },

            /**
            * Parse a phoneObject XML object and returns a JSON type object 
            * @param phoneObjectXML {Object} XML object to parse
            * @return phoneObject {Object} Object with phoneObject information 
            */
            parsePhoneObject: function(phoneObjectXML){
                  var phoneObject = new Object();

                  phoneObject.name = $(phoneObjectXML).find("APARTADO").text();

                  phoneObject.phoneNumbers = new Array();
                  $(phoneObjectXML).find("DESCRIPCION").each(function() {
                        var test = $(this).text();
                        phoneObject.phoneNumbers.push( $(this).text() );
                  });

                  return phoneObject;
            },

            /**
            * Parse a sede XML object and returns a JSON type object 
            * @param sedeXML {Object} XML object to parse
            * @return sede {Object} Object with sede information 
            */
            parseSede: function(sedeXML){
                  var sede = new Object();

                  sede.cabecera = $(sedeXML).find("CABECERA").text();

                  sede.departments = new Array();
                  $(sedeXML).find("DEPARTAMENTO").each(function() {
                        sede.departments.push( DAO.parseDepartment(this) );
                  });

                  return sede;
            },

            /**
            * Parse a department XML object and returns a JSON type object 
            * @param departmentXML {Object} XML object to parse
            * @return department {Object} Object with department information 
            */
            parseDepartment: function(departmentXML){
                  var department = new Object();

                  department.title = $(departmentXML).find("TITULO_DEPARTAMENTO").text();

                  department.schedules = new Array();
                  $(departmentXML).find("HORARIO").each(function() {
                        department.schedules.push( DAO.parseCommonObject(this) );
                  });

                  return department;
            },

            //*******************************************************
            //    LOGIN
            //*******************************************************            
            /**
            * Parses a login XML object and returns a JSON type object 
            * @param loginXML {Object} XML object to parse
            * @return department {Object} Object with department information 
            */
            parseLogin: function(loginXML){
                  /*
                  <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
                  <RESULTADO_VALIDACION>
                        <URL></URL>
                        <ERROR></ERROR>
                  </RESULTADO_VALIDACION>
                  */
                  var login = new Object();

                  login.resultLink = $(loginXML).find("URL").text();
                  login.serverError = $(loginXML).find("ERROR").text();

                  return login;
            },

            //*******************************************************
            //    CONTACTS
            //*******************************************************

            /**
            * Parse a contact XML object and returns a JSON type object 
            * @param contactXML {Object} XML object to parse
            * @return contact {Object} Object with contact information 
            */
            parseContact: function(contactXML){
                  var contact = new Object();

                  contact.name = $(contactXML).find("DESCRIPCION_SERVICIOS").text();

                  contact.areas = new Array();
                  $(contactXML).find("AREAS_ENTIDAD").each(function() {
                        contact.areas.push( DAO.parseArea(this) );
                  });

                  return contact;
            },

            /**
            * Parse an area XML object and returns a JSON type object 
            * @param areaXML {Object} XML object to parse
            * @return area {Object} Object with area information 
            */
            parseArea: function(areaXML){
                  var area = new Object();

                  area.description = $(areaXML).find("DESCRIPCION:first").text();

                  area.phones = new Array();
                  $(areaXML).find("TELEFONO").each(function() {
                        if ($(this).find("APARTADO").text()) {
                              //Checked if tag TELEFONO is not empty
                              area.phones.push( DAO.parseCommonObject(this) );
                        };
                  });

                  area.fax = DAO.parseCommonObject($(areaXML).find("FAX"));
                  area.email = DAO.parseCommonObject($(areaXML).find("EMAIL"));
                  area.direction = DAO.parseDirection($(areaXML).find("DIRECCION"));

                  return area;
            },

            //*******************************************************
            //    DISCLAIMERS
            //*******************************************************

            /**
            * Parse a disclaimers XML object and returns a JSON type object 
            * @param disclaimersXML {Object} XML object to parse
            * @return disclaimers {Object} Object with disclaimers information 
            */
            parseDisclaimers: function(disclaimersXML){
                  var disclaimers = new Array();

                  $(disclaimersXML).find("NODO").each(function() {
                        disclaimers.push( DAO.parseDisclaimer(this) );
                  });

                  return disclaimers;
            },

            /**
            * Parse a disclaimer XML object and returns a JSON type object 
            * @param disclaimerXML {Object} XML object to parse
            * @return disclaimer {Object} Object with disclaimer information 
            */
            parseDisclaimer: function(disclaimerXML){
                  var disclaimer = new Object();

                  disclaimer.title = $(disclaimerXML).find("TITULO_DE_NODO").text();

                  disclaimer.nodes = new Array();
                  $(disclaimerXML).find("SUB_NODO").each(function() {
                        disclaimer.nodes.push( DAO.parseCommonObject(this) );
                  });

                  return disclaimer;
            },

            //*******************************************************
            //    COMMON OBJECTS
            //*******************************************************

            /**
            * Parse a commonObject XML object and returns a JSON type object 
            * @param commonObjectXML {Object} XML object to parse
            * @return commonObject {Object} Object with commonObject information 
            */
            parseCommonObject: function(commonObjectXML){
                  var commonObject = new Object();

                  commonObject.name = $(commonObjectXML).find("APARTADO").text();
                  commonObject.description = $(commonObjectXML).find("DESCRIPCION").text();

                  return commonObject;
            },

            /**
            * Parse a direction XML object and returns a JSON type object 
            * @param directionXML {Object} XML object to parse
            * @return direction {Object} Object with direction information 
            */
            parseDirection: function(directionXML){
                  var direction = new Object();

                  direction.name = $(directionXML).find("APARTADO").text();
                  direction.description = $(directionXML).find("DESCRIPCION").text();
                  direction.latitude = $(directionXML).find("LATITUD").text();
                  direction.longitude = $(directionXML).find("LONGITUD").text();

                  return direction;
            }
      };

      //Exposing DAO
      window.DAO = DAO;
})( window );



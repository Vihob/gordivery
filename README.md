** Documentación técnica de l'aplicació Caixa Pay **

* Tecnologies utilitzades *

	Desde l'equip hem volgut destacar la part multiplataforma del projecte. Per aquest motiu hem apostat per crear les vistes en HTML5 i CSS3 per després
	incloure-les en contenidors natius. D'aquesta manera s'aprofiten les animacions i el rendiment de les aplicacions natives amb la portabilitat de les
	vistes en HTML5. Com a prova de concepte s'ha realitzat l'aplicació iPhone i hem generat el contenidor general d'Android, com a mostra del potencial
	de treballar d'aquesta manera.
	
	En quant a l'ús de la API hem aprofitat els serveis de localització de comerços, el de les tarjetes i el servei de pagament. Per la part de la compra
	hem creat un nou servei per tal de comunicar l'aplicació client amb el comerç. Aquest servei envía les dades del client al comerç i aquest últim retorna
	el codi per la compra i l'envia juntament amb el preu. Amb tota aquesta informació el client ja pot realitzar la transacció utilitzant el servei
	de exec del billing.
	
* Organització del codi *
	
	El Codi consta de 3 parts: els contenidors d'Android i d'iPhone y el codi HTML5 més javascript. Per cada vista es genera un ViewController o un Activity
	(segons tecnologia) que obre un html concret. Aquest html es gestiona mitjançant un controller de javascript. De cara a la comunicació entre la vista html
	i l'aplicació nativa s'han generat cert prefixos que es detecten en la webview i lleçen el servei natiu necessari.
	
* Posibles ampliacions a realitzar en el futur *
	
	Hem vist que l'aplicació pot arribar a tenir un camí prou llarg. Per una banda, dintre de la part de Ranking i els punts, hi ha molt posible treball a 
	realitzar. 
	
	Per una part incloure medalles per cert tipus de compres o activitats, del estil de Foursquare. A més com els punts només són una referencia,
	es poden donar en més situacions per augmentar la part de la competició. Dintre del ranking es podría també fer el rànking per negocis.
	
	En quant la part del llistat, podria ser interesant incloure els punts en un mapa, ja que es tracten dels punts propers.
	
	A la part del perfil existeix molta informació que es podría incloure a mode 

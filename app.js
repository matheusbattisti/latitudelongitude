$( document ).ready(function() {

	//funcao que recebe os ceps para converter em latitude e longitude
	function convertCep(cep) {

		var geocoder= new google.maps.Geocoder();
		var lat = '';
		var lng = '';
		var address = cep;
		geocoder.geocode( { 'address': address}, function(results, status) {

		  console.log(status);
		  console.log(address);

		  if (status == google.maps.GeocoderStatus.OK) {

		  	//caso tenha algum resultado com longitude
		  	if(results[0].geometry.bounds != undefined) {

		     lng = results[0].geometry.bounds.b.b;
		     lat = results[0].geometry.bounds.f.f;

		    //se não retornar nada zera, provavelmente cep inexistente
		 	} else {

		 	 lng = '0';
		     lat = '0';

		 	}

		  //caso tenha passao do limite de query, espera x ms e reexecuta
		  }  else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {    
            
            setTimeout(function() {
            	convertCep(address)}
            , 1000);

          } else if(status === google.maps.GeocoderStatus.ZERO_RESULTS) {

          	lng = '0';
		    lat = '0';
          
          //algum erro diferente do limite de query
          } else {
          
            console.log("Geocode was not successful for the following reason:" 
                  + status);

            lng = '0';
		    lat = '0';
          
          }

          //se o dado de latitude nao vier vazio, preenche a tabela
          if(lat != '') {
          	jQuery('#tabela-ceps').append('<tr><td>' + address + '</td><td>' + lat + '</td><td>' + lng + '</td></tr>')
          }
		  

		});

	}	

	//evento que dispara a verificação de um cep ou varios
	jQuery(document).on('click', '#converter', function() {

		cep = jQuery('#cep').val();

		if(cep.length > 8) {
			var res = cep.split(" ");
		}

		if(res != '') {

			var i = 0;

			function cepLoop() { 
			   setTimeout(function () {
			      convertCep(res[i]);
			      i++; 
			      if (i < res.length) { 
			         cepLoop();
			      } 
			   }, 1050)
			}

			cepLoop();

		} else {	
			convertCep(cep);
		}

	});

});
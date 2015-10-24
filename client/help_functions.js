findGeoLocationOld = function(lat, lng){
  var geoLocation;   

  var geocoder = new google.maps.Geocoder(); 
  geocoder.geocode({'latLng': new google.maps.LatLng(lat,lng)}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results.length) {
      results = results[0].address_components;
      var city = findResult(results, "locality");
      var state = findResult(results, "administrative_area_level_1");
      var country = findResult(results, "country");
      geoLocation = {city: city, state: state, country: country}
      return geoLocation;
    }
  });
  
}

findGeoLocation = function(lat, lng, callback){
  var geoLocation = {};   

  var geocoder = new google.maps.Geocoder(); 
  geocoder.geocode({'latLng': new google.maps.LatLng(lat,lng)}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results.length) {
      results = results[0].address_components;
      var city = findResult(results, "locality");
      var state = findResult(results, "administrative_area_level_1");
      var country = findResult(results, "country");

      if(city)
        geoLocation.city = city;
      if(state)
        geoLocation.state = state;
      if(country)
        geoLocation.country = country

      typeof callback === 'function' && callback(geoLocation);
    }
  });
  
}

var findResult = function(results, name){
  var result =  _.find(results, function(obj){
    return obj.types[0] == name && obj.types[1] == "political";
  });
  return result ? result.short_name : null;
}
 Template.map.onCreated(function(){
  Session.set('selectedMarker', null);
  var self = this;

  this.infoView = new ReactiveVar();  

  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    google.maps.event.addListener(map.instance, 'click', function(event) {
      var selectedMarker = Session.get('selectedMarker');

      if(selectedMarker === "home-location" || selectedMarker === "fly-location"){
        var position = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }

        findGeoLocation(position.lat, position.lng, function(location){          
          Meteor.call("addMarker", position, location, selectedMarker, function(error){
            if(error)
              Materialize.toast(error.reason, 4000);
            else{
              Materialize.toast("Ort erfolgreich hinzugefügt.", 4000);
              $('#modal1').openModal();
            }
          });
        });
       
      }else{
        Materialize.toast("Bitte zuerst Typ des Ortes auswählen", 4000);
      }
    }); 

    var markers = {};

    self.infoView = new google.maps.InfoWindow({
      maxWidth: 400
    });    

    Markers.find().observe({
      added: function (document) {
        var icon;
        var ownsMarker = false;

        if(document.userId === Meteor.userId())
          ownsMarker = true

        if(document.type == "fly-location"){
          if(ownsMarker)
            icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin_star|+|76ff03|000000|FF0000'
          else
            icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|+|76ff03|000000|FF0000'
        }else if(document.type == "home-location"){
          if(ownsMarker)
            icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin_star|+|039be5|000000|FF0000'
          else
            icon = 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|+|039be5|000000|FF0000'
        }       

        var marker = new google.maps.Marker({
          draggable: ownsMarker,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: map.instance,
          id: document._id,
          title: document.type,
          userId: document.userId,
          icon: icon
        });

        google.maps.event.addListener(marker, 'dragend', function(event) {
          
          var position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
          findGeoLocation(position.lat, position.lng, function(location){          
            Meteor.call('updateMarkerLocation', marker.id, position, location, function(error){
              if(error)
                Materialize.toast(error.reason, 4000);
              else
                Materialize.toast("Ort erfolgreicht aktualisiert.", 4000);
            })
          });
        });

        google.maps.event.addListener(marker, 'click', function(event) {
            Session.set("selectedInfoViewMarker", {markerId: document._id, userId: document.userId});
            var infoView = self.infoView;
            var infoViewHTML = Blaze.toHTML(Template.mapInfoview);
            infoView.setContent(infoViewHTML);
            //infoView.open(map.instance,marker);
            $('#modalMarker').openModal();
        })

        markers[document._id] = marker;
      },
      changed: function (newDocument, oldDocument) {
        markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
      },
      removed: function (oldDocument) {
        markers[oldDocument._id].setMap(null);
        google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
        delete markers[oldDocument._id];
      }
    }); 
  });
});

Template.map.events({
  'change input[name=type]': function(event, template){
    var element = template.find('input:radio[name=type]:checked');
    Session.set('selectedMarker', $(element).val());
  }
});

Template.map.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(49.2960928,12.5433381),
        zoom: 5
      };
    }
  },
  selectedMarker: function(){
    if(Session.get('selectedInfoViewMarker'))
      return Markers.findOne({_id: Session.get('selectedInfoViewMarker').markerId});
  },
  homeCount: function(){
    return Markers.find({userId: Meteor.userId(), type: 'home-location'}).count();
  },

  flyCount: function(){
    return Markers.find({userId: Meteor.userId(), type: 'fly-location'}).count();
  },
  homeDisabled: function(){
    return (Markers.find({userId: Meteor.userId(), type: 'home-location'}).count() >= 2) ? 'disabled' : ''
  },
  flyDisabled: function(){
    return (Markers.find({userId: Meteor.userId(), type: 'fly-location'}).count() >= 6) ? 'disabled' : ''
  },
  modalOptions: function(){
    return {
      title: 'Zusätzliche Informationen hinzufügen',
      text: 'Du kannst nun Bilder oder Videos zu dem Standort hinzufügen.'
    };
  }
});
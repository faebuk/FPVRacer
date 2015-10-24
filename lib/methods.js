Meteor.methods({
  setFirstLogin: function(value){
    check(value, Boolean);

    Meteor.users.update({_id: this.userId}, {$set: {"profile.firstlogin": value}});
  },

  addMarker: function(position, geocode, type){
    check(type, String);
    check(position, {lat: Number, lng: Number});
    check(geocode, {city: Match.Optional(String), state: Match.Optional(String), country: Match.Optional(String)});

    var markersCount = Markers.find({userId: this.userId, type: type}).count();

    if(type != "fly-location" && type != "home-location")
      throw new Meteor.Error("not allowed", "Bitte zuerst Typ des Ortes auswählen.");

    if(type === "fly-location" && markersCount >= 6)
      throw new Meteor.Error("not allowed", "Du kannst maximal 6 Flugorte hinzufügen.");
    else if(type === "home-location" && markersCount >= 2)
      throw new Meteor.Error("not allowed", "Du kannst maximal 2 Standorte hinzufügen.");

    var marker = { 
      lat: position.lat, 
      lng: position.lng, 
      type: type, 
      userId: this.userId, 
      geoLocation: geocode
    }

    if(type === "fly-location")
      marker.pilots = [this.userId];

    if(this.userId){
      Markers.insert(marker);
    }else{
      throw new Meteor.Error("not authenticated", "Du musst eingeloggt sein, um einen neuen Ort hinzuzufügen.");
    }
    
  },

  removeMarker: function(markerId){
    check(markerId, String);

    var marker = Markers.findOne({_id: markerId});
    if(!marker)
      throw new Meteor.Error("not found", "Marker does not exist.");
    if(marker.userId === this.userId){
      Markers.remove({_id: marker._id});
    }else{
      throw new Meteor.Error("not allowed", "Du kannst nur deine eigenen Orte entfernen.");
    }
  },

  updateMarkerLocation: function(markerId, position, geocode){
    check(markerId, String);
    check(position, {lat: Number, lng: Number});
    check(geocode, {city: Match.Optional(String), state: Match.Optional(String), country: Match.Optional(String)});

    var marker = Markers.findOne({_id: markerId});

    if(marker.userId === this.userId){
      Markers.update({_id: marker._id}, {$set: {lat: position.lat, lng: position.lng, geoLocation: geocode}});
    }else{
      throw new Meteor.Error("not allowed", "Du kannst nur deine eigene Orte aktualisieren.");
    }
  },
  addPersonToFlyLocation: function(markerId){
    check(markerId, String);

    var marker = Markers.findOne({_id: markerId});

    if(_.contains(marker.pilots, this.userId))
      throw new Meteor.Error("not allowed", "Du fliegst hier schon.");

    if(!this.userId)
      throw new Meteor.Error("not allowed", "Du musst eingeloggt sein.");
    if(!marker)
      throw new Meteor.Error("not fount", "Ort existiert nicht.");

    Markers.update({ _id: markerId },{ $push: { pilots: this.userId }});
  },
  removePersonToFlyLocation: function(markerId){
    check(markerId, String);

    var marker = Markers.findOne({_id: markerId});

    if(!this.userId)
      throw new Meteor.Error("not allowed", "Du musst eingeloggt sein.");
    if(!marker)
      throw new Meteor.Error("not fount", "Ort existiert nicht.");

    Markers.update({ _id: markerId },{ $pull: { pilots: this.userId }});
  }
});
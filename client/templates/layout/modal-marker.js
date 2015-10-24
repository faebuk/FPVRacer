Template.modalMarker.helpers({
  name: function(){
    var name;
    var user = Meteor.users.findOne({_id: Session.get('selectedInfoViewMarker').userId});
    
    if(user.profile.name)
      name = user.profile.name
    else if(user.username)
      name = user.username

    return name;
  },
  profileUrl: function(){
    var path = FlowRouter.path("userPage", {userId: Session.get('selectedInfoViewMarker').userId});
    return path;
    /*var url;
    var user = Meteor.users.findOne({_id: Session.get('selectedInfoViewMarker').userId});

    if(user.services.facebook)
      url = "https://facebook.com/" + user.services.facebook.id
    else if(user.services.twitter)
      url = "https://twitter.com/intent/user?user_id=" + user.services.twitter.id
    else if(user.services.google)
      url = "https://plus.google.com/" + user.services.google.id
    else if(user.username)
      url = FlowRouter.path('/profile/:username', {username: user.username});

    return url;*/
  },
  geoLocation: function(){
    var marker = this.marker;
    if(marker.geoLocation && marker.geoLocation.city)
      return marker.geoLocation.city;
  },
  ownsMarker: function(){
    return this.marker.userId === Meteor.userId();
  },
  flyLocation: function(){
    return this.marker.type === 'fly-location';
  }, 
  pilotsCount: function(){
    if(this.marker.pilots)
      return this.marker.pilots.length;
    else
      return 0;
  },
  fliesHere: function(){
    var pilots = this.marker.pilots;
    return _.contains(pilots, Meteor.userId());
  }
});

Template.modalMarker.events({
  'click .delete': function(){
    Meteor.call("removeMarker", Session.get('selectedInfoViewMarker').markerId, function(error){
      if(error)
        Materialize.toast(error.reason, 4000);
      else{
        Materialize.toast("Ort erfolgreich entfernt.", 4000);
        $('#modalMarker').closeModal();
      }
    });
  },
  'click button[name=flyHere]': function(event, template){
    var markerId = Session.get('selectedInfoViewMarker').markerId;

    Meteor.call('addPersonToFlyLocation', markerId, function(error, result){
      if(error)
        Materialize.toast(error.reason, 4000);
      else{
        Materialize.toast("Du fliegst nun hier.", 4000);
      }
    });
  },
  'click button[name=flyHereNot]': function(event, template){
    var markerId = Session.get('selectedInfoViewMarker').markerId;

    Meteor.call('removePersonToFlyLocation', markerId, function(error, result){
      if(error)
        Materialize.toast(error.reason, 4000);
      else{
        Materialize.toast("Du fliegst nun nicht mehr hier.", 4000);
      }
    });
  },
  'click a[name=profile]': function(){
    $('#modalMarker').closeModal();
  }
});
Template.mapInfoview.helpers({
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
    var marker = Markers.findOne({_id: Session.get('selectedInfoViewMarker').markerId});
    if(marker.geoLocation && marker.geoLocation.city)
      return marker.geoLocation.city;
  },
  ownsMarker: function(){
    return Markers.findOne({_id: Session.get('selectedInfoViewMarker').markerId}).userId === Meteor.userId();
  },
  flyLocation: function(){
    return Markers.findOne({_id: Session.get('selectedInfoViewMarker').markerId}).type === 'fly-location';
  }, 
  pilotsCount: function(){
    if(Markers.findOne({_id: Session.get('selectedInfoViewMarker').markerId}).pilots)
      return Markers.findOne({_id: Session.get('selectedInfoViewMarker').markerId}).pilots.length;
    else
      return 0;
  },
  fliesHere: function(){
    var pilots = Markers.findOne({_id: Session.get('selectedInfoViewMarker').markerId}).pilots;
    return _.contains(pilots, Meteor.userId());
  }
});

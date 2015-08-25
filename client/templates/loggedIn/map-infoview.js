Template.mapInfoview.helpers({
  name: function(){
    var name;
    var user = Meteor.users.findOne({_id: Session.get('selectedInfoViewMarker').userId});
    
    if(user.profile.name)
      name = user.profile.name
    else if(user.username)
      name = user.username

    return name;
  }
});

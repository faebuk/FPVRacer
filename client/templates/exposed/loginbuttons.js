Template.loginbuttons.events({
  'click .facebook-login': function(){
    
    Meteor.loginWithFacebook({}, function(error){
      if(error)
        Materialize.toast(error.reason);
      else
        Materialize.toast('Erfolgreich eingeloggt', 4000);
    });
  },
  'click .twitter-login': function(){
    
    Meteor.loginWithTwitter({}, function(error){
      if(error)
        Materialize.toast(error.reason);
      else
        Materialize.toast('Erfolgreich eingeloggt', 4000);
    });
  },
  'click .google-login': function(){
    
    Meteor.loginWithGoogle({}, function(error){
      if(error)
        Materialize.toast(error.reason);
      else
        Materialize.toast('Erfolgreich eingeloggt', 4000);
    });
  }
})
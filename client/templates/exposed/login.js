Template.login.events({
  'click .facebook-login': function(){
    
    Meteor.loginWithFacebook({}, function(error){
      if(error)
        Materialize.toast(error.reason);
      else
        Materialize.toast('Erfolgreich eingeloggt');
    });
  },
  'click .twitter-login': function(){
    
    Meteor.loginWithTwitter({}, function(error){
      if(error)
        Materialize.toast(error.reason);
      else
        Materialize.toast('Erfolgreich eingeloggt');
    });
  },
  'click .google-login': function(){
    
    Meteor.loginWithGoogle({}, function(error){
      if(error)
        Materialize.toast(error.reason);
      else
        Materialize.toast('Erfolgreich eingeloggt');
    });
  }
})
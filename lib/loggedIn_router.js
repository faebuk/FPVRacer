loggedIn = FlowRouter.group({
  triggersEnter: [
  function(){
    var route;
    if (!(Meteor.loggingIn() || Meteor.userId())) {
      route = FlowRouter.current();
      if (route.route.name !== 'login') {
        Session.set('redirectAfterLogin', route.path);
      }
      Materialize.toast("Seite ist nur für eingeloggte Benutzer zugänglich.", 4000);
      return FlowRouter.go(FlowRouter.path('login'));
    }

  }
  ]
});

loggedIn.route('/logout', {
  name: 'logout',
  action: function() {
    return Meteor.logout(function(error) {
      if(error)
        Materialize.toast(error.reason, 4000);
      else 
        Materialize.toast('Erfolgreich ausgeloggt.', 4000);

      return FlowRouter.go(FlowRouter.path('login'));
    });
  }
  
});

loggedIn.route('/profile', {
  name: 'profile',
  action: function(params, queryParams){
    if(queryParams.firstlogin){
      BlazeLayout.render('mainLayout', {content: 'firstlogin'})
    }else{
      BlazeLayout.render('mainLayout', {content: 'profile'})
    }    
  }
});

loggedIn.route('/map', {
  name: 'map',
  triggersEnter: [
    function(){
      return GoogleMaps.load();
    }
  ],
  action: function(params){
    BlazeLayout.render('mainLayout', {content: 'map'})
  }
});
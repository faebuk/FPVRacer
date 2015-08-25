Accounts.onLogin(function(){
  if(Meteor.isClient){

    if(Meteor.user().profile.firstlogin === undefined)
      Meteor.call("setFirstLogin", true);

    if(Meteor.user().profile.firstlogin){
      var params = {};
      var queryParams = {firstlogin: true};
      var path = FlowRouter.path("profile", params, queryParams);

      Meteor.call('setFirstLogin', false);

      return FlowRouter.go(path);
    }

    var redirect;
    redirect = Session.get('redirectAfterLogin');
    if (redirect != null) {
      if (redirect !== '/login') {
        return FlowRouter.go(redirect);
      }
    }
  }
});
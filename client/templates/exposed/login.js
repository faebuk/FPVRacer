Template.login.events({
	'submit form': function(e){
		e.preventDefault();

		var username = $(e.target).find('[name=username]').val();
		var password = $(e.target).find('[name=password]').val();

		var redirect;
		redirect = Session.get("redirectAfterLogin");
		if(!redirect){
			Session.set("redirectAfterLogin", "home");
		}

		Meteor.loginWithPassword(username, password, function(error){
			if(error)
				Materialize.toast(error.reason, 4000);
			else
				Materialize.toast('Erfolgreich eingeloggt.', 4000);
		});
	}
});
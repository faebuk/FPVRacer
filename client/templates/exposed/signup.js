Template.signup.events({
	'submit form': function(e){
		e.preventDefault();

		var username = $(e.target).find('[name=username]').val();
		var password = $(e.target).find('[name=password]').val();
		var email = $(e.target).find('[name=email]').val();
		var repassword = $(e.target).find('[name=repassword]').val();

		if(repassword === password){
      Accounts.createUser({
          username: username,
          password: password,
          email: email,
          profile: {
            firstlogin: true
          }
        }, function(error){
          if(error)
            Materialize.toast(error.reason, 4000)
          else
            Materialize.toast("Erfolgreich registriert.", 4000);
        });
		}

		
	}
});
exposed = FlowRouter.group({

});

exposed.route('/', {
    name: 'home',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "home"});
    }
});

exposed.route('/login', {
    name: 'login',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "login"});
    }
});

exposed.route('/signup', {
    name: 'signup',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "signup"});
    }
});



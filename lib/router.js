FlowRouter.route('/', {
    name: 'home',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "home"});
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function(params) {
        BlazeLayout.render("mainLayout", {content: "login"});
    }
});
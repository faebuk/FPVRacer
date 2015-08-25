FlowRouter.notFound = {
  action: function() {
    return BlazeLayout.render('mainLayout', {content: 'notFound'});
  }
};
var TodoList = new Marionette.Application();

TodoList.StaticView = Marionette.ItemView.extend({
  template: "#static-template"
});

TodoList.on("before:start", function(){
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",

    regions: {
      main: "#main-region"
    }
  });

  TodoList.regions = new RegionContainer();
});

TodoList.on("start", function(){
  var staticView = new TodoList.StaticView();
  TodoList.regions.main.show(staticView);
});

TodoList.start();

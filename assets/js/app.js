var TodoList = new Marionette.Application();

TodoList.Item = Backbone.Model.extend({
  defaults: {
    title: '',
    description: ''
  }
});

TodoList.ListView = Marionette.ItemView.extend({
  template: "#item-template",

  events: {
    "click p": 'alertItem'
  },

  alertItem: function(){
    alert(this.model.escape("description"));
  }
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
  var item = new TodoList.Item({
    title: "Grocery shopping",
    description: "Buy groceries for the week"
  });

  var itemView = new TodoList.ListView({
    model: item
  });

  TodoList.regions.main.show(itemView);
});

TodoList.start();

var TodoList = new Marionette.Application();

var Task = Backbone.Model.extend();

var Tasks = Backbone.Collection.extend({
  model: Task
});

var TaskView = Backbone.Marionette.ItemView.extend({
  template: '#taskView',

  events: {
    'click button': 'completeTask'
  },

  completeTask: function(){
    this.remove();
  }
});

var NoTasksView = Backbone.Marionette.ItemView.extend({
  template: '#noTasksView'
});

var TasksView = Backbone.Marionette.CollectionView.extend({
  emptyView: NoTasksView,
  childView: TaskView
});

var FormView = Marionette.ItemView.extend({
  template: '#formView',

  events: {
    'click button': 'createNewTask'
  },

  ui: {
    title: '#title',
  },

  createNewTask: function() {
    this.collection.add({
      title: this.ui.title.val(),
    });

    this.ui.title.val("");
  }
});

TodoList.addRegions({
  form: '#form',
  list: '#list'
});

TodoList.addInitializer(function(){
  TodoList.tasks = new Tasks();

  TodoList.form.show(new FormView({ collection: TodoList.tasks}));
  TodoList.list.show(new TasksView({ collection: TodoList.tasks}))
});

TodoList.start();



// TodoList.ItemCollection = Backbone.Collection.extend({
//   model: TodoList.Item,
//
//   comparator: 'title'
// });
//
//

// TodoList.ListItemView = Marionette.ItemView.extend({
//   tagName: 'li',
//   template: "#todo-list-item"
// });
//
// var FormView = Marionette.ItemView({
//   template: '#formView',
//
//   events: {
//     'click button': 'createNewItem'
//   },
//
//   ui {
//     title: '#title',
//     description: '#description'
//   },
//
//   createNewItem: function() {
//     this.collection.add({
//       title: this.ui.title.val(),
//       description: this.ui.description.val()
//     });
//
//     this.ui.title.val("");
//     this.ui.description.val("");
//   }
// });
//
// TodoList.ListItemsView = Marionette.CollectionView.extend({
//   tagName: 'ul',
//   childView: TodoList.ListItemView
// });
//
// TodoList.on("before:start", function(){
//   var RegionContainer = Marionette.LayoutView.extend({
//     el: "#app-container",
//
//     regions: {
//       main: "#main-region"
//     }
//   });
//
//   TodoList.regions = new RegionContainer();
// });
//
// TodoList.on("start", function(){
//   var items = new TodoList.ItemCollection([
//     {
//     title: "Grocery shopping",
//     description: "Buy groceries for the week"
//     },
//     {
//     title: "Gas",
//     description: "Fill up the VW Jetta with gas"
//     },
//     {
//     title: "Bills",
//     description: "Pay rent and utilities"
//     }
//   ]);
//
//   var itemsListView = new TodoList.ListItemsView({
//     collection: items
//   });
//
//   TodoList.regions.main.show(itemsListView);
// });
//
// TodoList.start();

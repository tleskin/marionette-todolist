var TodoList = new Marionette.Application();

var Task = Backbone.Model.extend({
  initialize : function() {

  this.bind('remove', function() {
    this.destroy();
  });
},

});

var Tasks = Backbone.Collection.extend({
  model: Task,

  comparator: "date"
});

var TaskView = Backbone.Marionette.ItemView.extend({
  template: '#taskView',

  events: {
    'click button': 'completeTask'
  },

  completeTask: function(){
    this.model.destroy();

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
    date:  '#date'
  },

  createNewTask: function() {
    this.collection.add({
      title: this.ui.title.val(),
      date: this.ui.date.val(),
    });

    this.ui.title.val("");
    this.ui.date.val("");
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

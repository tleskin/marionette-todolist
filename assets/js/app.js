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

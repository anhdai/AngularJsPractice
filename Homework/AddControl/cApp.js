angular.module('cModule', []).controller('cApp', function(){
    var TodoList = this;
    TodoList.todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}
    ];
    TodoList.AddTodo = function()  {
        TodoList.todos.push({text:TodoList.todoText, done:false});
        TodoList.todoText = '';
    };
    TodoList.Remain = function() {
      var count = 0;
      angular.forEach(TodoList.todos, function(todo) {
          count += todo.done ? 0:1;
      });
      return count;
    };
    TodoList.Archive = function() {
        var filter = TodoList.todos;
        TodoList.todos = [];
        angular.forEach(filter, function(todo) {
            if(!todo.done) TodoList.todos.push(todo);
        });
    };
});
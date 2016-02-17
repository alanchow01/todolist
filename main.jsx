'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

  getInitialState: function(){
    return {
      todos: []
    }
  },

  toggleComplete: function(theTodoFromTheInstance) {
    var newTodos = this.state.todos.map(function(theTodoToModify) {
      if (theTodoFromTheInstance === theTodoToModify) {
        theTodoToModify.complete = !theTodoToModify.complete;
      }
      return theTodoToModify;
    });
    this.setState({todos: newTodos});
  },
  removeTodo: function(todoData) {
    var newTodos = this.state.todos.filter(function(theTodoToRemove) {
      return todoData === theTodoToRemove ? false : true;
    });
    this.setState({todos: newTodos});
  },
  removeSelected: function() {
    var newTodos = this.state.todos.filter(function(todoItem) {
      return todoItem.complete ? false : true //false excludes item from new array, true adds it
    })
    this.setState({todos:newTodos});
  },

  // component instance
  // toggleComplete={this.toggleComplete} refers to toggleComplete method above
  renderTodos : function(todo, index) {
    return <Todo key = {index}
                id = {index}
                toggleComplete = {this.toggleComplete}
                removeTodo = {this.removeTodo}
                todoData = {todo}/>;
  },
  addTodo: function(e) {
    e.preventDefault();

    if(this.refs.addTodoValue.value) {
      this.state.todos.push({title: this.refs.addTodoValue.value, complete: false});
      this.setState({todos:this.state.todos});
      this.refs.addTodoValue.value = '';
    }
  },
  hasCompleted: function() {
    var completedTodoArray = this.state.todos.filter(function(todoItem) {
      return todoItem.complete === true;
    });
    return completedTodoArray.length;
  },
  render: function () {
    var number = this.state.todos.length;
    return (
      <div className = "todo-list">
        <h1>Todo List</h1>
        <div className="add-todo">
          <form name="add-todo-form" onSubmit={this.addTodo}>
            <input type="text" ref="addTodoValue" /><span>(Hit enter to add)</span>
          </form>
        </div>
        <ul>
          { this.state.todos.map(this.renderTodos) } {/*.map() similar to forEach iterates through array*/}
        </ul>
        <div className="todo-admin">
        <div>{number}{number > 1 || number === 0 ? " todos" : " todo"}</div>
        <div>{this.hasCompleted() ?
          <button className="removeSelected" onClick={this.removeSelected}>Clear Selected</button> : ''
          }
        </div>
    </div>
      </div>
    )
  }
})

{/*component reference */}
var Todo = React.createClass({
  getInitialState: function() {
    return {};
  },
  parentToggleComplete: function() {
    this.props.toggleComplete(this.props.todoData)
  },
  tellParentToRemoveTodo: function(){
    this.props.removeTodo(this.props.todoData);
  },
  render: function() {
    return (
      <li>{this.props.todoData.title}
        <input type="checkbox" id={this.props.id} checked={this.props.todoData.complete} onClick={this.parentToggleComplete}/>
        <label htmlFor={this.props.id} id={this.props.key}></label>
        <button onClick={this.tellParentToRemoveTodo}><i className="fa fa-trash"></i></button>
      </li>
    )
  }
})

ReactDOM.render(<App />, document.querySelector('#todo-app'));

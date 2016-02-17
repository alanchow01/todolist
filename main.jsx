'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

  getInitialState: function(){
    return {
      todos: [
        {title:'placeholder todo 1', complete: false},
        {title:'placeholder todo 2', complete: false},
        {title:'placeholder todo 3', complete: false},
        {title:'placeholder todo 4', complete: false},
        {title:'placeholder todo 5', complete: false}
      ]
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
    // this.setState()
  },

  // component instance
  // toggleComplete={this.toggleComplete} refers to toggleComplete method above

  renderTodos : function(todo, index) {
    return <Todo key = {index}
                id={index}
                toggleComplete={this.toggleComplete}
                todoData={todo}/>;
  },
  render: function () {
    return (
      <div className = "todo-list">
        <h1>Todo List</h1>
        <ul>
          { this.state.todos.map(this.renderTodos) } {/*.map() similar to forEach iterates through array*/}
        </ul>
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
  render: function() {
    return (
      <li>{this.props.todoData.title}
        <input type="checkbox" id={this.props.id} checked={this.props.todoData.complete} onClick={this.parentToggleComplete}/>
        <label htmlFor={this.props.id} id={this.props.key}></label>
        <button><i className="fa fa-trash"></i></button>
      </li>
    )
  }
})

ReactDOM.render(<App />, document.querySelector('#todo-app'));

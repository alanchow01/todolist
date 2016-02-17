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
  addTodo: function(e) {
    e.preventDefault();

    if(this.refs.addTodoValue.value) {
      this.state.todos.push({title: this.refs.addTodoValue.value, complete: false});
      this.setState({todos:this.state.todos});
      this.refs.addTodoValue.value = '';
    }
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
        <div>//add remove completed button</div>
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

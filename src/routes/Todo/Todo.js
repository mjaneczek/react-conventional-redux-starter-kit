import React from 'react'
import classes from './Todo.scss'
import { connect } from 'react-redux'

class Todo extends React.Component {

  handleAddTodo(event) {
    if (event.key === 'Enter' && event.target.value != '') {
      if(this.props.editId != null) {
        this.props.dispatch(['todo:editSuccess', event.target.value]);
      } else {
        this.props.dispatch(['todo:add', event.target.value]);
      }
      this.refs.todoInput.value = '';
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.editId);

    if(this.props.editId != null) {
      this.refs.todoInput.value = this.props.todos[this.props.editId];
    }
  }

  render () {
    console.log('rererender!!!!');

    return (
      <div>
        <div className="row">
          <p><input ref="todoInput" type="text" placeholder="New todo name" onKeyPress = {::this.handleAddTodo}/></p>
        </div>

        { this.props.todos && <div className="row">

          <ul className="list-group col-md-6 col-md-offset-3">
            <li className="list-group-item active">
              TODO list
            </li>

            {this.props.todos.map((todo, i) =>
              <li key={i} className="list-group-item">
                <button onClick={() => this.props.dispatch(['todo:delete', i])} type="button" className="btn btn-primary btn-xs pull-right">Delete</button>
                <button onClick={() => this.props.dispatch(['todo:edit', i])} type="button" className="btn btn-primary btn-xs pull-right">Edit</button>
                {todo}
              </li>
            )}
          </ul>
        </div> }
      </div>
    )
  }
}

export default connect((state) => ({
  todos: state.todo.todos,
  editId: state.todo.edit
}))(Todo)

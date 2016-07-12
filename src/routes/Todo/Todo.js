import React from 'react'

export default class Todo extends React.Component {

  handleAddTodo(event) {
    if (event.key === 'Enter' && event.target.value != '') {
      if(this.p('todo.edit') != null) {
        this.todo.editSuccess(event.target.value);
      } else {
        this.todo.add(event.target.value);
      }
      this.refs.todoInput.value = '';
    }
  }

  componentDidUpdate() {
    if(this.p('todo.edit') != null) {
      this.refs.todoInput.value = this.p('todo.todos')[this.p('todo.edit')];
    }
  }

  render () {
    return (
      <div>
        <div className="row">
          <p><input ref="todoInput" type="text" placeholder="New todo name" onKeyPress = {::this.handleAddTodo}/></p>
        </div>

        <div className="row">

          <ul className="list-group col-md-6 col-md-offset-3">
            <li className="list-group-item active">
              TODO list
            </li>

            {this.p('todo.todos').map((todo, i) =>
              <li key={i} className="list-group-item">
                <button onClick={() => this.todo.delete(i)} type="button" className="btn btn-primary btn-xs pull-right">Delete</button>
                <button onClick={() => this.todo.edit(i)} type="button" className="btn btn-primary btn-xs pull-right">Edit</button>
                {todo}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

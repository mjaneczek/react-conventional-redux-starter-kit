export default class TodoInteractor {
  state = { todos: [] };

  onAdd(text) {
    var existing_todos = this.state.todos || [];
    this.state = { todos: existing_todos.concat([text]) }
  }

  onEdit(id) {
    this.state = { todos: this.state.todos, edit: id}
  }

  onEditSuccess(newValue) {
    this.state.todos[this.state.edit] = newValue;
    this.state = { todos: this.state.todos.slice(), edit: null}
  }

  onDelete(id) {
    this.state.todos.splice(id, 1);
    this.state = { todos: this.state.todos.slice() }
  }
}

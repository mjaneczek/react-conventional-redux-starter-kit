export default class TodoInteractor {
  state = { todos: [], edit: null };

  onAdd(text) {
    return { todos: this.state.todos.concat([text]) }
  }

  onEdit(id) {
    return { todos: this.state.todos, edit: id}
  }

  onEditSuccess(newValue) {
    this.state.todos[this.state.edit] = newValue;
    return { todos: this.state.todos.slice(), edit: null}
  }

  onDelete(id) {
    this.state.todos.splice(id, 1);
    return { todos: this.state.todos.slice() }
  }
}

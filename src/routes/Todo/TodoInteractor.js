export default class TodoInteractor {
  state = { todos: [], edit: null };

  onAdd(text) {
    return { todos: this.state.todos.concat([text]) }
  }

  onEdit(id) {
    return { ...this.state, edit: id}
  }

  onEditSuccess(newValue) {
    let newTodos = this.state.todos.slice();
    newTodos[this.state.edit] = newValue;

    return { todos: newTodos, edit: null}
  }

  onDelete(id) {
    let newTodos = this.state.todos.slice();
    newTodos.splice(id, 1);

    return { todos: newTodos }
  }
}

import * as React from 'react';
import './App.css';
import List from './components/List';

export interface Item {
  id: number;
  label: string;
  done: boolean;
}

interface IState {
  items: Item[];
  completed: Item[];
  newTodo: string;
}

class App extends React.PureComponent<{}, IState> {
  public state: IState = {
    completed: [
      { id: 7, label: 'item 7', done: true },
    ],
    items: [
      { id: 1, label: 'item 1', done: false },
      { id: 2, label: 'item 2', done: false },
      { id: 3, label: 'item 3', done: false },
      { id: 4, label: 'item 4', done: false },
      { id: 5, label: 'item 5', done: false },
      { id: 6, label: 'item 6', done: false }
    ],
    newTodo: '',
  }

  public itemInput: any;

  constructor(props: any) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
  }

  public componentDidMount() {
    this.itemInput.focus();
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    // check if the item already exist in the list
    if (this.checkForDuplicates(this.state.newTodo)) {
      alert('This item you are trying to add already exists');
      return this.resetTodoValue();
    }
    const newTodo = {
      done: false,
      id: this.state.items.length + 1,
      label: this.state.newTodo,
    };
    this.setState({ items: [...this.state.items, newTodo] });
    this.resetTodoValue(); // empty the input field
    this.itemInput.focus(); // focus on it.
  }

  public handleChange(e: any) {
    this.setState({ newTodo: e.target.value });
  }

  public handleCheck(itemID: any) {
    const newItemState = this.state.items.filter((item) => {
      if (item.id === itemID) {
        this.setState({
          completed: [
            ...this.state.completed,
            { id: itemID, label: item.label, done: true }
          ]
        });
        return item.id !== itemID;
      }
      return item;
    });
    this.setState({ items: newItemState });
  }

  public checkForDuplicates(label: string) {
    const newItemsState = this.state.items.filter(item => item.label === label);
    const isDuplicate = newItemsState.length >= 1 && true;
    return isDuplicate;
  }

  public handleItemEdit({ id, label }: any) {
    const editValue = prompt('Edit this Item', label) || '';
    if (editValue) {
      // check if the item already exist in the list
      if (this.checkForDuplicates(editValue)) {
        return alert('This item you are trying to modify already exists');
      }
      this.setState({
        items: [...this.state.items.map(item => {
          if (item.id === id) {
            item.label = editValue;
          }
          return item;
        })]
      });
    }
  }

  public removeItem(itemID: number) {
    const newItemState = this.state.items.filter(item => item.id !== itemID);
    this.setState({
      items: [...newItemState]
    });
  }

  public resetTodoValue() {
    this.setState({ newTodo: '' });
  }

  public handleReset(e: any) {
    e.preventDefault();
    this.setState({ completed: [] });
  }

  public render() {
    return (
      <div className="app-container">
        <h1 className="header-text">Invisible Todo</h1>
        <form onSubmit={this.handleSubmit} className="input-form">
          <input
            onChange={this.handleChange}
            name="item"
            type="text"
            className="item-input"
            placeholder="Enter item here"
            value={this.state.newTodo}
            ref={input => this.itemInput = input}
          />
          <button type="submit" disabled={!this.state.newTodo}>
            <i className="fas fa-plus" />
          </button>
        </form>
        <div className="list-group">
          <List
            handleCheck={this.handleCheck}
            items={this.state.items}
            removeItem={this.removeItem}
            editItem={this.handleItemEdit}
          />
        </div>
        <div className="done-list">
          <div className="done-header">
            <h3>Item(s) Done</h3>
            <button title="Reset all" onClick={this.handleReset}>
              <i className="fas fa-redo" />
            </button>
          </div>
          <div className="list-group">
            <List
              items={this.state.completed}
              handleCheck={this.handleCheck}
              removeItem={this.removeItem}
              editItem={this.handleItemEdit}
            />
          </div>
        </div>
        <div className="bonus">With ❤️ from Gabriel Micah 😎</div>
      </div>
    )
  }
}

export default App;

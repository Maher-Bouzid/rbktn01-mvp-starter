import React from 'react';
import ListItem from './ListItem.jsx';
import $ from 'jquery';

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    $.post('/data', { username: this.props.username })
      .then(data => {
        this.setState({ data })
      })
  }
  addTodo(e) {
    e.preventDefault()
    let todo = document.querySelector('#todo').value;
    $.post('/todo/add', { todo, username: this.props.username })
      .then(data => {
        this.setState({ data })
        document.querySelector('#todo').value = "";
      })
  }
  showForm(e) {
    document.querySelectorAll('.hide').forEach(elm => {
      elm.style.display = 'none'
    })
    document.getElementsByClassName(e.target.id)[0].style.display = 'inline';
  }
  updateState(todo) {
    $.post('/todo/update/state', todo)
    .then(data => {
        this.setState({ data })
      })
  }
  updateTodos(todo) {
    $.post('/todo/update', { todo, username: this.props.username })
      .then(data => {
        document.querySelectorAll('.hide').forEach(elm => {
          elm.style.display = 'none'
        })
        this.setState({ data })
      })
  }

  deleteTodo(todo) {
    $.post('/todo/delete', { todo, username: this.props.username })
      .then(data => {
        this.setState({ data })
      })
  }
  render() {
    return (
      <div>
        <h1 style={{ width: "100%", textAlign: "center" }}>Welcome {this.props.username}</h1>
        <form className="form1">
          <input type="text" name="todo" placeholder="Add a Post..." id="todo" />
          <button style={{ marginTop: "20px" }} type="submit" onClick={this.addTodo.bind(this)}><i className='fa fa-plus'></i>  Add</button>
        </form>
        <h2 style={{ width: "100%", textAlign: "center" }} >Here is your Posts :</h2>
        {
          this.state.data.length ? this.state.data.map((elm, i) => (
            <ListItem data={elm} key={elm._id} id={i} updateTodos={this.updateTodos.bind(this)} showForm={this.showForm.bind(this)} updateTodos={this.updateTodos.bind(this)} deleteTodo={this.deleteTodo.bind(this)} updateState={this.updateState.bind(this) }/>
          )) : <div></div>
        }
      </div>
    )
  }
}




export default List;
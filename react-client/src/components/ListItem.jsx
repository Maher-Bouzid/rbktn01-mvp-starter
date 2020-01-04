import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: this.props.data.todo
    }
  }
  updateTodo(e) {
    let updatedTodo = this.props.data;
    updatedTodo.todo = this.state.todo;
    this.props.updateTodos(updatedTodo)
    e.preventDefault()
  }
  updateText(e) {
    this.setState({ todo: e.target.value })
  }
  renderDones(){
    if (this.props.data.done) {
      document.getElementById(this.props.data._id).classList.add('done');
    }else{
      document.getElementById(this.props.data._id).classList.remove('done');
  }
  }
  componentDidMount(){
    this.renderDones()

  }
  componentDidUpdate() {
    this.renderDones()
  }
  render() {
    return (
      <div className="form3">
        <section>
          <h3 id={this.props.data._id} onClick={this.props.showForm} >{this.props.data.todo}</h3>
          <div>
            <button onClick={() => { this.props.updateState(this.props.data) }}><i className='fa fa-check'></i></button>
            <button onClick={() => { this.props.deleteTodo(this.props.data) }}><i className='fa fa-times'></i></button>
          </div>
        </section>
        <form style={{ display: "none" }} className={`${this.props.id} hide`} action="">
          <input type='text' value={this.state.todo} id='text' onChange={this.updateText.bind(this)} />
          <button type='submit' value="update" onClick={this.updateTodo.bind(this)} >Update</button>
        </form>
      </div>
    )
  }
}

export default ListItem;
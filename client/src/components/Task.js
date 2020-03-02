import React, { Component } from 'react';
import { Alert } from 'reactstrap';

// Displays individual task along with state as complete/not-complete and option to toggle state
class Task extends Component {

  state = { visible: false};

  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  // Will change task isComplete state on-chain
  async toggleComplete(){
    console.log('Sending toggle transaction...');
    try{
      await this.props.toDoContract.methods.toggleComplete(this.props.task.id).send({from: this.props.accounts[0]});
      this.props.loadTasks();
    }catch(error){
      console.log(error);
      this.setState({visible: true, alertText: error.message});
    }
  }

  onDismiss = () =>{
    this.setState({visible: false });
  }

  render() {

    let description = <div>{this.props.task.description}</div>;

    // Allows user to mark task as complete
    let toggleButton =
      <button type="button" rel="tooltip" className="btn btn-success btn-sm btn-icon">
          <i className="tim-icons icon-check-2" onClick={this.toggleComplete}></i>
      </button>

    // If task is complete display description with strike through and change toggle button
    if(this.props.task.isComplete){
      description = <s>{this.props.task.description}</s>;

      toggleButton =
      <button type="button" rel="tooltip" className="btn btn-danger btn-sm btn-icon">
          <i className="tim-icons icon-simple-remove" onClick={this.toggleComplete}></i>
      </button>
    }

    return (
      <tr>
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>{this.state.alertText}</Alert>
        <td className="text-center">{this.props.task.id}</td>
        <td>{description}</td>
        <td className="td-actions text-right">
          {toggleButton}
        </td>
      </tr>
    )
  }
}

export default Task

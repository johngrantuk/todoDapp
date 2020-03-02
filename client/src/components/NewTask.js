import React, { Component } from 'react';
import { Alert } from 'reactstrap';

// Allows user to create a new task which is saved on-chain.
class NewTask extends Component {

  state = { task: null, visible: false};

  constructor(props) {
    super(props);
    this.makeNewTask = this.makeNewTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  async makeNewTask(){

    if(this.state.task == null){
      this.setState({visible: true, alertText: 'Please Enter Some Task Info'});
      return;
    }

    console.log('Sending transaction...');
    try{
      await this.props.toDoContract.methods.createTask(this.state.task).send({from: this.props.accounts[0]});           // Save task on-chain
      // Refresh interface
      this.props.loadTasks();
    }catch(error){
      console.log(error);
      this.setState({visible: true, alertText: error.message});
    }
  }

  updateTask(event) {
    this.setState({task: event.target.value});
  }

  onDismiss = () =>{
    this.setState({visible: false });
  }

  render() {

    return(

      <div>
        <Alert color="danger" id="NewTaskAlert" isOpen={this.state.visible} toggle={this.onDismiss}>{this.state.alertText}</Alert>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="title">NEW TASK</div>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="New Task" onChange={this.updateTask}/>
                    </div>
                  </form>
                  <button className="btn btn-fill btn-primary" id="makeNewTask" onClick={this.makeNewTask}>Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewTask;

import React, { Component } from 'react';
import Task from './Task.js';
import { Table } from 'reactstrap';

// Loads tasks in a Table
class AccountTasks extends Component {

  render() {

    // Filtering tasks by active user so only their tasks are displayed
    var tasks = this.props.tasks
      .filter(task => task.owner === this.props.accounts[0])
      .map(task => {
        return <Task key={task.id} task={task} accounts={this.props.accounts} toDoContract={this.props.toDoContract} loadTasks={this.props.loadTasks}/>
      })

    let taskDisplay =
      <Table id="taskDisplay">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Task Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks}

        </tbody>
      </Table>

    if(tasks.length === 0){
      taskDisplay = <h3 id="taskDisplay">No Tasks! Looks Like You're Nice & Relaxed 😊</h3>
    }

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <div className="title">YOUR TASKS</div>
          </div>
          <div className="card-body">
              { taskDisplay }
        </div>
        </div>
      </div>
    )
  }
}

export default AccountTasks

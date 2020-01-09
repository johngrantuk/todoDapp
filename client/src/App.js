import React, { Component } from "react";
import ToDo from "./contracts/ToDo.json";
import getWeb3 from "./utils/getWeb3";
import NewTask from './components/NewTask';
import AccountTasks from './components/AccountTasks';
import Address from './components/Address';

import { Container, Alert } from "reactstrap";

import "./black-dashboard/assets/css/black-dashboard-react.css";
import "./black-dashboard/assets/css/nucleo-icons.css";
import "./todo.css";

// !! Deploy to Test & git?

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    toDoContract: null,
    tasks: [],
    alertVisible: false
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      var accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ToDo.networks[networkId];

      // Some prettier alerts incase of loading issues.
      if(!web3){
        this.setState({alertVisible: true, alertText: "No Web3 Provider."});
        return;
      }
      if(!deployedNetwork){
        this.setState({alertVisible: true, alertText: "The Contract Isn't Deployed On Your Current Network"});
        return;
      }

      // Setup the contract
      const toDoContract = new web3.eth.Contract(
        ToDo.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Loads all tasks for account
      this.setState({ web3, accounts, toDoContract: toDoContract }, this.loadTasks);

      // Handles if user change MetaMask account
      window.ethereum.on('accountsChanged', (accounts) => {
        this.loadAccounts();
      })
    } catch (error) {
      // Catch any errors for any of the above operations.
      this.setState({alertVisible: true, alertText: "Issue Loading: " + error.message});
      console.error(error);
    }
  };

  async loadAccounts(){
    var accounts = await this.state.web3.eth.getAccounts();
    this.setState({accounts: accounts});
  };

  loadTasks = async () => {
    const { toDoContract } = this.state;

    // Load all tasks here & filter for Account in AccountTasks component.
    const noTasks = await toDoContract.methods.getNumberOfTasks().call();

    var tasks = [];
    for(var i = 0;i < noTasks;i++){
      var task = await toDoContract.methods.getTask(i).call();
      tasks.push({
        id: task[0],
        description: task[1],
        owner: task[2],
        isComplete: task[3],
      })
    }

    this.setState({ tasks: tasks});
  };

  render() {
    const { web3, accounts, toDoContract, tasks } = this.state;

    // Displaying any error info in a user friendly manner
    if (!web3 || !toDoContract) {
      return (
        <div className="App">
          <Container>
            <h1>Loading Web3, accounts, and Contract...</h1>
            <Alert color="danger" isOpen={this.state.alertVisible}>{this.state.alertText}</Alert>
          </Container>
        </div>
      );
    }

    return (
      <div className="App">
      <Container>
        <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismiss}>{this.state.alertText}</Alert>

        <h1>TO DO DAPP</h1>
        <Address address={accounts[0]} />
        <NewTask web3={web3} accounts={accounts} toDoContract={toDoContract} loadTasks={this.loadTasks}/>
        <AccountTasks web3={web3} accounts={accounts} toDoContract={toDoContract} tasks={tasks} loadTasks={this.loadTasks}/>
      </Container>
      </div>
    );
  }
}

export default App;

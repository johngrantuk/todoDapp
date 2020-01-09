pragma solidity >=0.4.21 <0.7.0;

contract ToDo {

  struct Task {
    uint id;
    string content;
    address owner;
    bool isComplete;
  }

  event TaskCreated(uint id, string content, address owner);
  event TaskStatusToggled(uint id, bool isComplete);

  modifier _taskExists_(uint id) {
    require(!(tasks[id].owner == address(0)), "ERR_NO_TASK");
    _;
  }

  uint[] private taskIds;
  uint private lastTaskId = 0;

  mapping(uint => Task) private tasks;

  function createTask(string memory _content)
    public
    returns (bool)
  {
    tasks[lastTaskId] = Task(lastTaskId, _content, msg.sender, false);
    taskIds.push(lastTaskId);
    lastTaskId++;
    emit TaskCreated(lastTaskId, _content, msg.sender);
    return true;
  }

  function getNumberOfTasks()
    public view
    returns (uint)
  {
    return lastTaskId;
  }

  function getTask(uint id)
    public view
    _taskExists_(id)
    returns(uint, string memory, address, bool)
  {
    return(id, tasks[id].content, tasks[id].owner, tasks[id].isComplete);
  }

  function toggleComplete(uint id)
    public
    _taskExists_(id)
  {
    require(tasks[id].owner == msg.sender, "ERR_NOT_OWNER");
    tasks[id].isComplete = !tasks[id].isComplete;
    emit TaskStatusToggled(id, tasks[id].isComplete);
  }
}

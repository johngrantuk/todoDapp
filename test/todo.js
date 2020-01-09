const ToDo = artifacts.require("./ToDo.sol");

const truffleAssert = require('truffle-assertions');

contract("ToDo", accounts => {

  let toDoContract;

  before(async () => {
    toDoContract = await ToDo.deployed();
  });

  it("...should have no tasks initially.", async () => {
    const numberTasks = await toDoContract.getNumberOfTasks();
    assert.equal(numberTasks, 0, "Should have no tasks initially.");
  });

  it('Fails binding tokens that are not approved', async () => {
    await truffleAssert.reverts(
        toDoContract.getTask(7),
        'ERR_NO_TASK',
    );
  });

  it("Creates A Task.", async () => {
    await toDoContract.createTask('This Is Task 1 For Account 0');

    const numberTasks = await toDoContract.getNumberOfTasks();
    assert.equal(numberTasks, 1, "Should have 1 task.");

    const task1 = await toDoContract.getTask(0);
    assert.equal(task1[0], 0, "ID should be 0");
    assert.equal(task1[1], 'This Is Task 1 For Account 0', "Task description should match");
    assert.equal(task1[2], accounts[0], "Owner should be main account");
    assert.equal(task1[3], false, "Should not be complete");
  });

  it("Creates A Task From Another Account.", async () => {
    await toDoContract.createTask('This Is Task 1 For Account 1', { from: accounts[1] });

    const numberTasks = await toDoContract.getNumberOfTasks();
    assert.equal(numberTasks, 2, "Should have 2 tasks.");

    const task1 = await toDoContract.getTask(1);
    assert.equal(task1[0], 1, "ID should be 0");
    assert.equal(task1[1], 'This Is Task 1 For Account 1', "Task description should match");
    assert.equal(task1[2], accounts[1], "Owner should be main account");
    assert.equal(task1[3], false, "Should not be complete");
  });

  it('Fails toggle if no task.', async () => {
    await truffleAssert.reverts(
        toDoContract.toggleComplete(7),
        'ERR_NO_TASK',
    );
  });

  it('Fails toggle if not owner.', async () => {
    await truffleAssert.reverts(
        toDoContract.toggleComplete(1),
        'ERR_NOT_OWNER',
    );
  });

  it("Toggles Task To Complete.", async () => {
    await toDoContract.toggleComplete(1, { from: accounts[1] });

    const task1 = await toDoContract.getTask(1);
    assert.equal(task1[0], 1, "ID should be 0");
    assert.equal(task1[1], 'This Is Task 1 For Account 1', "Task description should match");
    assert.equal(task1[2], accounts[1], "Owner should be main account");
    assert.equal(task1[3], true, "Should be complete");
  });

  it("Toggles Task Back To Not Complete.", async () => {
    await toDoContract.toggleComplete(1, { from: accounts[1] });

    const task1 = await toDoContract.getTask(1);
    assert.equal(task1[0], 1, "ID should be 0");
    assert.equal(task1[1], 'This Is Task 1 For Account 1', "Task description should match");
    assert.equal(task1[2], accounts[1], "Owner should be main account");
    assert.equal(task1[3], false, "Should be back to not complete");
  });

});

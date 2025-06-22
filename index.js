const readline = require('readline');
const fs = require('fs');
const { getStoredTasks, getFilteredObject } = require('./utils');

const FILE_NAME = 'tasks.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'task-cli: '
});

console.log("task-cli is running.  Type a command or enter 'help' to see all available commands.")
rl.prompt();

async function add(task) {
  const tasks = await getStoredTasks(FILE_NAME);

  const nextKey = Object.keys(tasks).length.toString();
  tasks[nextKey] = task;

  const jsonData = JSON.stringify(tasks, null, 2);

  if (task) {
    fs.writeFileSync(FILE_NAME, jsonData)
    console.log(`added task: ${task}`)
  } else {
    console.log(`task not added`)
    console.log('please enter a name for the task, ie: add do the dishes')
  }
}

async function read() {
  const tasksObject = await getStoredTasks(FILE_NAME);
  const tasks = Object.values(tasksObject);

  console.log(' ')
  tasks.forEach(task => {
    console.log(task)
  })
  console.log(' ')
}

async function deleteTask(taskToDelete) {
  const tasksObject = await getStoredTasks(FILE_NAME);
  const tasks = Object.values(tasksObject);

  if (!tasks.includes(taskToDelete)) {
    console.log(`delete failed, task '${taskToDelete}' not found`)
    console.log(`saved tasks: ${tasks.join(', ')}`)
  } else {
    const newTasksObject = getFilteredObject(tasksObject, taskToDelete);
    const jsonData = JSON.stringify(newTasksObject, null, 2);

    fs.writeFileSync(FILE_NAME, jsonData)

    console.log(`task '${taskToDelete}' deleted`)
    console.log(' ')
  }
}

rl.on('line', async (line) => {
  const input = line.trim();

  const [command, ...args] = input.split(' ');
  const task = args.join(' ');

  switch (command) {
    case 'add':
      await add(task)
      break;
    case 'read':
      await read()
      break;
    case 'delete':
      await deleteTask(task)
      break;
    case 'exit':
      rl.close();
      return
    case 'help':
      console.log(`available commands:
      help - list all avaialbe commands
      exit - exit task-cli`)
      break;

    default:
      console.log(`Unknown command: "${input}" enter "help" to see all avaialbe commands`)
  }

  rl.prompt();
});


rl.on('close', () => {
  console.log('exiting task-cli.')
  process.exit(0)
})

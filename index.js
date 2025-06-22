const readline = require('readline');
const fs = require('fs');
const { getStoredTasks } = require('./utils');

const FILE_NAME = 'tasks.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'task-cli: '
});

console.log("task-cli is running.  Type a command or enter 'help' to see all available commands.")
rl.prompt();

async function add(args) {
  const tasks = await getStoredTasks(FILE_NAME);

  const task = args.join(' ');

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

rl.on('line', (line) => {
  const input = line.trim();

  const [command, ...args] = input.split(' ');

  switch (command) {
    case 'add':
      add(args)
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

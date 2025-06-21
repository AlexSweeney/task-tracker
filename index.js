const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'task-cli: '
});

console.log("task-cli is running.  Type a command or enter 'help' to see all available commands.")
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();

  const [command, ...args] = input.split(' ');

  switch(command) {
  case 'add':  
    const task = args.join(' '); 

    const data = {
      0: task
    };

    const jsonData = JSON.stringify(data, null, 2);

    if(task) { 
      fs.writeFileSync('tasks.json', jsonData)
    } else {
      console.log(`task: ${task} not added`)
      console.log('please enter a name for the task, ie: add do dishes')
    }
    
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

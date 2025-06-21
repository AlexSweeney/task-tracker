const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'task-cli: '
});

console.log("task-cli is running.  Type a command or enter 'help' to see all available commands.")
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();

  switch(input) {
  case 'help': 
    console.log(`available commands:
      help - list all avaialbe commands
      exit - exit task-cli`)
    break;
  case 'exit': 
    rl.close();
    return
  default: 
      console.log(`Unknown command: "${input}" enter "help" to see all avaialbe commands`)
  }

  rl.prompt();
});

rl.on('close', () => {
  console.log('exiting task-cli.')
  process.exit(0)
})

const fs = require('fs');

async function getStoredTasks(fileName) {
  let tasks = {};
  const fileExists = fs.existsSync(fileName);

  if (fileExists) {
    try {
      const data = fs.readFileSync(fileName, 'utf-8');
      const storedTasks = JSON.parse(data);

      tasks = storedTasks;
    } catch (err) {
      console.error('Error reading or parsing file:', err);
    }
  }

  return tasks;
}

module.exports = {
  getStoredTasks
}
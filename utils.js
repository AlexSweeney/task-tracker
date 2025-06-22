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

function getFilteredObject(object, valueToRemove) {
  const filteredObject = {};
  const values = Object.values(object);

  const filteredValues = values.map(value => {
    return value !== valueToRemove && value
  }).filter(val => val);

  console.log('filteredValues', filteredValues)

  filteredValues.forEach((value, i) => {
    filteredObject[i] = value
  })

  console.log('filteredObject', filteredObject)

  return filteredObject;
}

module.exports = {
  getStoredTasks,
  getFilteredObject
}
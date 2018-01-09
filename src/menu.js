const inquirer = require('inquirer')

module.exports = async function() {
  const question = {
    type: 'input',
    name: 'path',
    message: 'Enter the file path:',
  }
  const { path } = await inquirer.prompt([question])
  return path
}

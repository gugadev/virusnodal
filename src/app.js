const chalk = require('chalk')
const ora = require('ora')
const clear = require('console-clear')
const showMenu = require('./menu')
const showWelcome = require('./art')
const showReport = require('./report')
const { analyze, getReport } = require('./request')

async function bootstrap() {
  clear(true) // clear console but retain history
  const code = await showWelcome()
  console.log(chalk.white.bold(code))
  const path = await showMenu()

  console.log()
  const spinner = ora(chalk.white.bold('Uploading file'))
  spinner.start()

  const resource = await analyze(path, (progress) => {
    switch (progress) {
      case 25: spinner.color = 'yellow'; break
      case 50: spinner.color = 'cyan'; break
      case 75: spinner.color = 'red'; break
      case 100: {
        spinner.color = 'green'
        spinner.stop()
      }
    }
  })

  const report = await getReport(resource)
  const output = showReport(report)
  console.log()
  console.log(chalk.white.bold.underline('Results:'))
  console.log()
  console.log(output)
}

bootstrap()

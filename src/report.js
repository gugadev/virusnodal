const chalk = require('chalk')
const { table, getBorderCharacters } = require('table')

function map(results) {
  return Object.entries(results).map(([k, v]) => {
    const version = v.version || 'Unknown'
    const result = v.result || 'No result'
    const detected = v.detected ? 'Yes' : 'No'
    return [k, version, result, detected]
  })
}

function header(text) {
  const plain = ['Antivirus', 'Version', 'Result', 'Detected']
  return plain.map(cell => chalk.bgGreen(chalk.white.bold(cell)))
}

function footer(detected, total) {
  return [
    chalk.bgWhite(chalk.rgb(0,0,0).bold('Detected')),
    chalk.bgGreen(chalk.white.bold(detected)),
    chalk.bgWhite(chalk.rgb(0,0,0).bold('Total')),
    chalk.bgRed(chalk.white.bold(total)),
  ]
}

module.exports = function ({ scans, positives, total }) {
  const data = map(scans)
  data.unshift(header())
  data.push(footer(positives, total))
  const config = {
    border: getBorderCharacters('norc'),
  }
  return table(data, config)
}

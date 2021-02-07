'use strict'
const co = require('co')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')
const prompt = require('co-prompt')
const { exec } = require('child_process')

const targetPath = path.resolve('./.git/hooks/pre-push')
const targetContent = fs.readFileSync(path.resolve(__dirname, '../scripts/f2-auto-merge.sh'))

module.exports = () => {
  co(function* () {
    const ok =
      (yield prompt(chalk.yellow('Inject f2-auto-merge git pre-push hook to current ".git/hooks" directory? [Y/n]'))) ||
      'Y'

    if (!/^y|yes|ok|true$/i.test(ok)) {
      console.log(chalk.red('Operation cancelled.\n'))
      process.exit()
    }

    fs.writeFile(targetPath, targetContent, undefined, err => {
      if (err) {
        console.log(chalk.red(err))
        console.log('\n')
        process.exit()
      }

      exec('chmod +x ./.git/hooks/pre-push', (err, stdout, stderr) => {
        if (err) {
          console.log(chalk.red(err))
          console.log('\n')
          process.exit()
        }
        console.log(`stdout: ${stdout}\n'`)
        console.log(`stderr: ${stderr}`)
      })

      console.log(chalk.green('Inject success! enjoy.\n'))
      process.exit()
    })
  })
}

'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const targetPath = path.resolve('./.git/hooks/pre-push')

module.exports = () => {
  co(function* () {
    const ok =
      (yield prompt(chalk.yellow('Delete f2-auto-merge git pre-push hook from current ".git/hooks" directory? [y/N]'))) ||
      'N'

    if (!/^y|yes|ok|true$/i.test(ok)) {
      console.log(chalk.red('Operation cancelled.\n'))
      process.exit()
    }

    fs.unlink(targetPath, err => {
      if (err) {
        console.log(chalk.red(err))
        console.log('\n')
        process.exit()
      }

      console.log(chalk.green('Delete success! have fun.\n'))
      process.exit()
    })
  })
}

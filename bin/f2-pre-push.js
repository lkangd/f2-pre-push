#!/usr/bin/env node --harmony
'use strict'
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

// 定义当前版本
program.version(require('../package').version)

// 定义使用方法
program.usage('<command>')

program
  .command('enable')
  .description('Enable f2 branch pre push hooks to current .git.')
  .alias('e')
  .action(() => {
    require('../command/enable')()
  })

program
  .command('disable')
  .description('Disable f2 branch pre push hooks to current .git.')
  .alias('d')
  .action(() => {
    require('../command/disable')()
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}

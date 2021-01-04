const fs = require('fs')
const colors = require('colors/safe')
const { kebabToCamelCase } = require('./utils')
const { exec } = require('child_process')

const defaultContent = name => `export const ${name} = () => {\n\n}`

module.exports = (type, content = defaultContent) => (name) => {
  if (!name) {
    return console.error(colors.red('The helper name is required.'))
  }

  const className = kebabToCamelCase(name)
  const filePath = `./src/${type}s/${name}.${type}.js`

  const fileContent = content(className)

  fs.writeFileSync(filePath, fileContent)
  fs.appendFile(
    `./src/${type}s/index.js`,
    `\nexport * from './${name}.${type}'`,
    function (err) {
      if (err) return console.error(colors.red(err))

      console.log(colors.green(`Created in ${filePath}`))
    }
  )

  exec(`code ./src/${type}s/index.js`)
  exec(`code ${filePath}`)
}

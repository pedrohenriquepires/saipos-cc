const fs = require('fs')
const colors = require('colors/safe')
const { kebabToPascalCase } = require('./utils')
const { exec } = require('child_process')

module.exports = componentName => {
  if (!componentName) {
    return console.error(colors.red('The component name is required.'))
  }

  const folderPath = `./src/ui/components/${componentName}`
  const filePath = `${folderPath}/${componentName}.component.jsx`
  const stylePath = `${folderPath}/${componentName}.style.scss`

  const className = kebabToPascalCase(componentName)

  const functionalComponentFileContent = `import React from 'react'
import './${componentName}.style.scss'

export const ${className} = () => {
  return (
    <div className="${componentName}">

    </div>
  )
}
`

  const styleFileContent = `.${componentName} {\n\n}`

  fs.mkdirSync(folderPath)
  fs.writeFileSync(filePath, functionalComponentFileContent)
  fs.writeFileSync(stylePath, styleFileContent)
  fs.appendFile(
    './src/ui/components/index.js',
    `\nexport { ${className} } from './${componentName}/${componentName}.component'`,
    function(err) {
      if (err) return console.error(colors.red(err))

      console.log(colors.green(`Component created in ${filePath}`))
    }
  )

  exec(`code ./src/ui/components/index.js`)
  exec(`code ${filePath}`)
}
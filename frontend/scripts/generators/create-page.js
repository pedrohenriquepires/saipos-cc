const fs = require('fs')
const colors = require('colors/safe')
const { kebabToPascalCase } = require('./utils')
const { exec } = require('child_process')

module.exports = pageName => {
  if (!pageName) {
    return console.error(colors.red('The page name is required.'))
  }

  const folderPath = `./src/ui/pages/${pageName}`
  const filePath = `${folderPath}/${pageName}.page.jsx`
  const stylePath = `${folderPath}/${pageName}.style.scss`

  const className = kebabToPascalCase(pageName)

  const functionalComponentFileContent = `import React from 'react'
import { createRoute } from 'app-route-manager'
import './${pageName}.style.scss'

export const ${className} = () => {
  return (
    <div className="${pageName}">
      <h1>${pageName}</h1>
    </div>
  )
}

createRoute({
  path: '/${pageName}',
  component: ${className}
})
`

  const styleFileContent = `.${pageName} {\n\n}`

  fs.mkdirSync(folderPath)
  fs.writeFileSync(filePath, functionalComponentFileContent)
  fs.writeFileSync(stylePath, styleFileContent)
  fs.appendFile(
    './src/ui/pages/index.js',
    `\nexport { ${className} } from './${pageName}/${pageName}.page'`,
    function (err) {
      if (err) return console.error(colors.red(err))

      console.log(colors.green(`Page created in ${filePath}`))
    }
  )

  exec(`code ./src/ui/pages/index.js`)
  exec(`code ${filePath}`)
}

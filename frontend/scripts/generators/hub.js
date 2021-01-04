const colors = require('colors/safe')
const { kebabToPascalCase } = require('./utils')
const creator = require('./creator')
const component = require('./create-component')
const page = require('./create-page')

const GENERATOR = {
  component,
  page,
  helper: creator('helper'),
  constant: creator('constant', name => `export const ${name} = {\n\n}`),
  provider: creator('provider', name => {
    const providerName = kebabToPascalCase(name)

    return (
      "import createGlobalState from 'react-create-global-state'\n" +
      `export const [useGlobal${providerName}, ${providerName}Provider] = createGlobalState()`
    )
  }),
  hook: name => {
    if (!/^use*/.test(name)) {
      return console.error(
        colors.red(`Hooks devem ter o prefixo 'use'. Ex: use-my-hook`)
      )
    }

    creator('hook')(name)
  },
}

const [, , type, name] = process.argv

const generator = GENERATOR[type]

if (!generator) {
  return console.error(colors.red(`Gerador ${type} não encontrado`))
}

generator(name)

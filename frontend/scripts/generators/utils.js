function kebabToPascalCase(text) {
  const parts = text.split('-')

  return parts
    .map(word => {
      return capitalizeFirstLetter(word)
    })
    .join('')
}

function kebabToCamelCase(text) {
  const parts = text.split('-')

  return parts
    .map((word, key) => {
      return key === 0 ? word : capitalizeFirstLetter(word)
    })
    .join('')
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  kebabToPascalCase,
  kebabToCamelCase,
  capitalizeFirstLetter
}

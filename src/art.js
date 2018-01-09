const { join } = require('path')
const art = require('ascii-art')

art.Figlet.fontPath = join(__dirname, 'fonts/')

module.exports = () => new Promise((resolve) => {
  art.font('VirusNodal', 'Ogre', (rendered) => {
    resolve(rendered)
  })
})

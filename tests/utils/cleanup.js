var user = require('../../server/models/user.js')

module.exports = function(callback) {
  // recreate User table
  user.sync({ force: true }).then(function() {
    // create username with username: user and 
    // password: user
    user.create({
      username: 'user',
      password: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O9D93HKwPKFNWBqiiuc/IoMtIurRCT36',
      salt: '$2a$10$QaT1MdQ2DRWuvIxtNQ1i5O'
    }).then(callback)
  })
}
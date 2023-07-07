const fs = require('fs')
const bugsArray = []
fs.writeFileSync('./bugs.json', JSON.stringify(bugsArray))

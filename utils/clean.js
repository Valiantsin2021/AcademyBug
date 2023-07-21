const fs = require('fs')
const bugsArray = []
fs.writeFileSync('./bugs.json', JSON.stringify(bugsArray))
fs.writeFileSync(`./test_execuction_${process.env.SHARD_INDEX}.json`, JSON.stringify(bugsArray))

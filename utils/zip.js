let AdmZip = require('adm-zip')
let zip = new AdmZip()
zip.addLocalFolder('./allure-report')
zip.writeZip('./allure-report.zip')

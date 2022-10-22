// const xlsxFile = require('read-excel-file/node');

// xlsxFile('/Users/stuartlong/Desktop/tech-interview-handbook/apps/portal/prisma/salaries.xlsx').then((rows) => {
//     console.log(rows)
// })

const reader = require("xlsx")

// Reading our test file
const file = reader.readFile('/Users/stuartlong/Desktop/tech-interview-handbook/apps/portal/prisma/salaries.xlsx')

let data = []

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

// Printing data
console.log(data.splice(0,100))
console.table(data.splice(0,100))
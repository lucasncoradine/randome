const fs = require("fs")
const { page, styled } = require("./template")

// grab page name from terminal argument
const [name] = process.argv.slice(2)
if (!name) {
  console.clear()
  throw new Error("You must include a page name.")
}

const dir = `./pages/${name}/`
const styleDir = `./styles/pages/${name}`

// throw an error if the file already exists
if (fs.existsSync(dir)) throw new Error("A page with that name already exists.")

// create the folder
fs.mkdirSync(dir)

function writeFileErrorHandler(err) {
  if (err) {
    console.clear()
    throw err
  }
}

// page.jsx
fs.writeFile(`${dir}/${name}.tsx`, page(name), writeFileErrorHandler)
// page.styled
fs.writeFile(
  `${styleDir}/${name.toLowerCase()}.styled.ts`,
  styled(name),
  writeFileErrorHandler
)

console.clear()
console.log(`Page ${name} created!`)

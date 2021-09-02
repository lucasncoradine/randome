const { component, styled } = require("./template")
const fs = require("fs")

// grab component name from terminal argument
const [name] = process.argv.slice(2)
if (!name) {
  console.clear()
  throw new Error("You must include a component name.")
}

const dir = `./components/${name}/`

// throw an error if the file already exists
if (fs.existsSync(dir))
  throw new Error("A component with that name already exists.")

// create the folder
fs.mkdirSync(dir)

function writeFileErrorHandler(err) {
  if (err) {
    console.clear()
    throw err
  }
}

// component.tsx
fs.writeFile(`${dir}/${name}.tsx`, component(name), writeFileErrorHandler)
// component.styled.ts
fs.writeFile(
  `${dir}/${name.toLowerCase()}.styled.ts`,
  styled(name),
  writeFileErrorHandler
)

// insert new component into 'components/index file
fs.readFile("./components/index.ts", "utf8", (err) => {
  if (err) {
    console.clear()

    throw err
  }

  const fileContent = `export { ${name} } from "./${name}/${name}"\n`

  fs.appendFile(`./components/index.ts`, fileContent, writeFileErrorHandler)
})

console.clear()
console.log(`Component ${name} created!`)

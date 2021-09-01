// component.tsx
exports.page = (name) => `import React from "react"
import { ${name}Container } from "./styles/pages/${name.toLowerCase()}.styled"

interface ${name}Props {
  
}

export const ${name}: React.FC<${name}Props> = () => {
  return (
    <${name}Container>
      ${name} Page
    </${name}Container>
  )
}

export default ${name}
`

// component.styled.ts
exports.styled = (name) => `import styled from "styled-components"
import { Container } from "@styles"

export const ${name}Container = styled(Container)\`\`
`

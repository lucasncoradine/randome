// component.tsx
exports.component = (name) => `import React from "react"
import { ${name}Wrapper } from "./${name.toLowerCase()}.styled"

interface ${name}Props {

}

export const ${name}: React.FC<${name}Props> = () => {
  return (
    <${name}Wrapper>
      ${name} Component
    </${name}Wrapper>
  )
}
`

// component.styled.ts
exports.styled = (name) => `import styled from "styled-components"

export const ${name}Wrapper = styled.div\`\`
`

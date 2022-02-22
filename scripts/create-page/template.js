// component.tsx
exports.page = (name) => `import React from "react"
import { ${name}PageContainer } from "@styles"

interface ${name}PageProps {
  
}

export const ${name}Page: React.FC<${name}PageProps> = () => {
  return (
    <${name}PageContainer>
      ${name} Page
    </${name}PageContainer>
  )
}

export default ${name}
`

// component.styled.ts
exports.styled = (name) => `import styled from "styled-components"
import { Container } from "@styles"

export const ${name}PageContainer = styled(Container)\`\`
`

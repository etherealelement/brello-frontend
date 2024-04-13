import { TextField, TitleComponent, ParagraphComponent } from "@/shared/ui"
import { Logo } from "@/shared/ui/logo"

function App() {
  return (
    <>
    <TextField placeholder="Enter text" size="large"></TextField>
    <TitleComponent children="Title"></TitleComponent>
    <ParagraphComponent children="Paragraph" fontSize="20px"></ParagraphComponent>
    <Logo></Logo>
    
    </>
  )}

export default App

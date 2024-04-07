import {createEffect, createEvent, createStore, sample} from "effector"
import {useList, useUnit} from "effector-react"
import { TextField, TitleComponent, ParagraphComponent } from "@/shared/ui"

function App() {
  return (
    <>
    <TextField placeholder="Enter text" size="large"></TextField>
    <TitleComponent children="Title"></TitleComponent>
    <ParagraphComponent children="Paragraph" fontSize="20px"></ParagraphComponent>

    
    </>
  )}

export default App

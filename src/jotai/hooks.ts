import { useAtom } from "jotai"
import { useCallback } from "react"
import { colourAtom } from "."

const COLOURS = [
  'bg-rose-300',
  'bg-fuchsia-300',
  'bg-violet-300',
  'bg-blue-300',
  'bg-cyan-300',
  'bg-amber-300',
]

export const useRandomColorAtom = () => {
  const [colour, setColour] = useAtom(colourAtom)

  const randomizeColour = useCallback(() => {
    const colourList = COLOURS.filter((defaultColour) => defaultColour !==  colour)
    const randomIndex = Math.floor(Math.random() * colourList.length)
    const newColor = colourList[randomIndex] || 'bg-amber-100'
    setColour(newColor)
  }, [colour, setColour])

  return {colour, randomizeColour}
}
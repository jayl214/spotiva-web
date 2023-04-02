import type { ReactElement } from "react"

interface IButtonProps {
  isDisabled?: boolean
  isRound?: boolean,
  hoverColour?: 'red' | 'green',
  onClick: ()=>void
  children: ReactElement | string
}

const HOVER_COLOUR_CLASS_MAP = {
  green: 'hover:bg-green-400',
  red: 'hover:bg-red-400'
}

export const Button = ({
  hoverColour = 'green',
  isDisabled = false,
  isRound = false,
  children,
  onClick
}:IButtonProps) => {
  const shapeClassName = isRound ? 'w-16' : 'px-4'
  const disabledClassName = isDisabled ? 'opacity-20' : `border-black ${HOVER_COLOUR_CLASS_MAP[hoverColour]}`

  return (
    <button disabled={isDisabled} className={`relative border-4 border-black rounded-full ${shapeClassName} border-2 ${disabledClassName} text-2xl h-16 flex justify-center items-center transition-all`} onClick={onClick}>
      {children}
    </button>
  )
}
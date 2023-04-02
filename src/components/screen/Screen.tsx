import type { ReactElement } from "react"

interface IScreenProps {
  children: ReactElement
}

export const Screen = ({
  children
}:IScreenProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      {children}
    </div>
  )
}
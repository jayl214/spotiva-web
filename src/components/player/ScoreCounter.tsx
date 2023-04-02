import { useEffect, useState } from "react"

interface IScoreCounter {
  currentPoints: number
  maxPoints: number
}

export const ScoreCounter = ({
  currentPoints,
  maxPoints,
}:IScoreCounter) => {

  const [displayedPoints, setDisplayedPoints] = useState(currentPoints)


  useEffect(() => {
    if(displayedPoints < currentPoints){
      setTimeout(() => {
        setDisplayedPoints(displayedPoints + 1)
      }, 100)
    }
  }, [currentPoints, displayedPoints])


  return (
    <div>
      {displayedPoints} / {maxPoints}
    </div>
  )

}
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { currentPointsAtom, gameStateAtom, maxPointsAtom, roundMapAtom } from "~/jotai"
import { EGameState } from "~/types"
import { Button } from "../button/Button"
import { ScoreCounter } from "../player/ScoreCounter"

const MESSAGE_MAP = {
  bad: 'Well hopefully you learned something...',
  ok: 'Not great, not terrible.',
  good: "You're pretty good!",
  perfect: "Perfect! You've done this before haven't you?",
}

const getMessage = (score: number) => {
  if(score >= 1){
    return MESSAGE_MAP.perfect
  }
  if(score >= .6){
    return MESSAGE_MAP.good
  }
  if(score >= .3) {
    return MESSAGE_MAP.ok
  }
  return MESSAGE_MAP.bad
}

export const GameOver = () => {

  const [scoreTransitionClass, setScoreTransitionClass] = useState('')
  const [messageOpacityClass, setMessageOpacityClass] = useState('opacity-0')
  useEffect(() => {
    setScoreTransitionClass('translate-y-36 scale-200 duration-300')
    setMessageOpacityClass('delay-300 opacity-1 duration-500')
  }, [])

  const [, setGameState] = useAtom(gameStateAtom)
  const [, setRoundMap] = useAtom(roundMapAtom)
  const [maxPoints, setMaxPoints] = useAtom(maxPointsAtom)
  const [currentPoints, setCurrentPoints] = useAtom(currentPointsAtom)

  const startNewGame = () => {
    //wipe game state
    setMaxPoints(0)
    setCurrentPoints(0)
    setRoundMap({})
    setGameState(EGameState.active)
  }

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className={`text-4xl h-1/5 flex items-end justify-center transition-all ${scoreTransitionClass}`}>
        <ScoreCounter
          currentPoints={currentPoints}
          maxPoints={maxPoints}
        />
      </div>
      <div className="h-4/5 flex flex-col items-center justify-center gap-8">
        <div className="flex items-center flex-col gap-2">
          <div className="text-xl">Game Over!</div>
          <div className={`transition-opacity ${messageOpacityClass}`}>{getMessage(currentPoints/maxPoints)}</div>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={startNewGame}>New game</Button>
        </div>
      </div>
    </div>
  )
}
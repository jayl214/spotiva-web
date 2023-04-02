import { useAtom } from "jotai"
import { gameStateAtom } from "~/jotai"
import { EGameState } from "~/types"
import { Button } from "../button/Button"
import { GameOver } from "../gameover/GameOver"
import { Player } from "../player/Player"
import { Screen } from "../screen/Screen"

export const Game = () => {

  const [gameState, setGameState] = useAtom(gameStateAtom)

  const startGame = () => setGameState(EGameState.active)

  const StartScreen = () => {
    return (
      <Screen>
        <Button onClick={startGame}>
          Start Game
        </Button>
      </Screen>
    )
  }
  
  const getGameScreen = () => {
    switch(gameState) {
      case EGameState.active:
        return <Player />
      case EGameState.inactive:
        return <StartScreen />
      case EGameState.endgame:
        return <GameOver />
    }
  }

  return (
    <Screen>
      {getGameScreen()}
    </Screen>
  )
}
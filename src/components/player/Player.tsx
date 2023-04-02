import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { diceCoefficient } from "dice-coefficient";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { currentPointsAtom, gameStateAtom, maxPointsAtom, roundMapAtom } from "~/jotai";
import { useRandomColorAtom } from "~/jotai/hooks";
import type { IResponses } from "~/types";
import { EGameState } from "~/types";
import { api } from "~/utils/api";
import { Button } from "../button/Button";
import { InputRow } from "./InputRow";
import { ScoreCounter } from './ScoreCounter';

const cleanString = (input:string | undefined) => input?.replace(/\W/g, '').trim() || '';

export const Player = () => {

  const [nameResponse, setNameResponse] = useState('')
  const [releaseYearResponse, setReleaseYearResponse] = useState(null as number | null)
  const [artistResponse, setArtistResponse] = useState('')
  const [scoreAnimationClassName, setScoreAnimationClassName] = useState('')

  const resetResponses = () => {
    setNameResponse('')
    setReleaseYearResponse(null)
    setArtistResponse('')
  }

  const [, setGameState] = useAtom(gameStateAtom)
  const [roundMap, setRoundMap] = useAtom(roundMapAtom)
  const [currentPoints, setCurrentPoints] = useAtom(currentPointsAtom)
  const [maxPoints, setMaxPoints] = useAtom(maxPointsAtom)
  const {randomizeColour} = useRandomColorAtom()

  const endGame = () => setGameState(EGameState.endgame)

  const { data: currentlyPlaying, refetch: refetchCurrentlyPlaying } = api.example.getCurrentlyPlaying.useQuery(
    undefined,
    {
      refetchInterval: 3000
    }
  );

  // if(!currentlyPlaying) {
  //   currentlyPlaying = DUMMY
  // }

  const {refetch: skipToNextSong} = api.example.skipToNextSong.useQuery(undefined, {enabled: false});
  const {refetch: skipToPrevSong} = api.example.skipToPrevSong.useQuery(undefined, {enabled: false});

  const songId = currentlyPlaying?.item?.id || '';
  const isSomethingPlaying = !!songId;
  const currentRound = roundMap[songId];
  const isResponsesSubmitted = !!currentRound?.responses

  const onSkipToNext = async () => {
    await skipToNextSong()
    void refetchCurrentlyPlaying()
  }

  const onSkipToPrev = async () => {
    await skipToPrevSong()
    void refetchCurrentlyPlaying()
  }

  const createNewRound = useCallback(() => {
    randomizeColour()
    const solutions = {
      name: currentlyPlaying?.item?.name || '',
      releaseYear: parseInt(currentlyPlaying?.item?.album?.release_date.slice(0,5) || ''),
      artist: (currentlyPlaying?.item?.artists?.[0]?.name || '') as string
    }
    const newRound = {
      id: songId,
      solutions,
      responses: undefined
    }
    setRoundMap({
      ...roundMap,
      [songId]: newRound
    })
    setMaxPoints(maxPoints + Object.keys(solutions).length);
  }, [currentlyPlaying, roundMap, maxPoints, randomizeColour, setMaxPoints, setRoundMap, songId])

  useEffect(() => {
    if (!songId) {
      // if nothing is currently playing, do nothing here, handled by conditional rendering below
      return
    }

    resetResponses()

    const isNewSong = !currentRound
    if(isNewSong){
      createNewRound()
    }
  }, [songId, currentRound, createNewRound])

  const submitResponses = () => {
    if(!currentRound) {
      return
    }

    const solutions = currentRound?.solutions
    
    const f1Scores = {
      nameF1: diceCoefficient(cleanString(nameResponse), cleanString(solutions?.name)),
      releaseYearF1: diceCoefficient(cleanString(releaseYearResponse?.toString()), cleanString(solutions?.releaseYear.toString())),
      artistF1: diceCoefficient(cleanString(artistResponse), cleanString(solutions?.artist)),
    }

    const correctness = {
      isNameCorrect: f1Scores.nameF1 >= .8,
      isReleaseYearCorrect: f1Scores.releaseYearF1 >= 1,
      isArtistCorrect: f1Scores.artistF1 >=.8
    }

    const responses = {
      name: nameResponse,
      releaseYear: releaseYearResponse,
      artist: artistResponse,
      correctness
    } as IResponses

    const currentRoundWithResponses = {
      ...currentRound,
      responses
    }

    setRoundMap({
      ...roundMap,
      [songId]: currentRoundWithResponses
    })
    
    const pointsToAdd = Object.values(correctness).filter((isCorrect) => isCorrect).length
    setCurrentPoints(currentPoints + pointsToAdd)
    if(pointsToAdd === 0) {
      setScoreAnimationClassName('animate-shake')
    }else{
      setScoreAnimationClassName('animate-quickBounce')
    }
  }

  return (
    <>
    {isSomethingPlaying ?
      <div className="flex flex-col justify-between h-full w-full">
        <div className="text-4xl h-1/5 flex items-end justify-center">
          <div className={scoreAnimationClassName}>
            <ScoreCounter
              currentPoints={currentPoints}
              maxPoints={maxPoints}
            />
          </div>
        </div>
        
        <div className='h-4/5 flex flex-col justify-start gap-8'>        
          <div className=" flex flex-col gap-8  items-center w-full pt-20">
            <InputRow
              label='Song Name'
              value={nameResponse}
              isSubmitted={isResponsesSubmitted}
              solution={currentRound?.solutions.name || ''}
              isCorrect={currentRound?.responses?.correctness.isNameCorrect}
              type='text'
              onChange={(input: string) => setNameResponse(input.toUpperCase())}
            />
            
            <InputRow
              label='Release Year'
              value={releaseYearResponse?.toString() || ''}
              isSubmitted={isResponsesSubmitted}
              solution={currentRound?.solutions.releaseYear.toString() || ''}
              isCorrect={currentRound?.responses?.correctness.isReleaseYearCorrect}
              type='number'
              onChange={(input:string) => setReleaseYearResponse(parseInt(input))}
            />

            <InputRow
              label='Artist Name'
              value={artistResponse}
              solution={currentRound?.solutions.artist || ''}
              isCorrect={currentRound?.responses?.correctness.isArtistCorrect}
              isSubmitted={isResponsesSubmitted}
              type='text'
              onChange={(input: string) => setArtistResponse(input.toUpperCase())}
            />
          </div>

          <div className='flex justify-center'>
            <Button onClick={submitResponses} isDisabled={isResponsesSubmitted || !currentRound}>
              Submit
            </Button>
          </div>

          <div className="">
            <div className='flex justify-center gap-8'>
              <Button onClick={() => void onSkipToPrev()} isRound={true}>
                <TbPlayerTrackPrevFilled />
              </Button>
              <Button onClick={endGame} hoverColour='red'>
                End game
              </Button>
              <Button onClick={() => void onSkipToNext()} isRound={true}>
                <TbPlayerTrackNextFilled />
                </Button>
            </div>
          </div>
        </div>
      </div> :
      'Start playing a playlist on Spotify!'
      }
    </>
  )

}
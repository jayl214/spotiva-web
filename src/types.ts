

export enum EGameState {
  inactive = 'inactive',
  active = 'active',
  endgame = 'endgame'
}

export interface IGameFields {
  name: string,
  releaseYear: number,
  artist: string,
  //albumName: string
}

export interface ICorrectness {
  isNameCorrect: boolean,
  isReleaseYearCorrect: boolean,
  isArtistCorrect: boolean
}

export interface IResponses extends IGameFields {
  correctness: {
    isNameCorrect: boolean,
    isReleaseYearCorrect: boolean,
    isArtistCorrect: boolean
  }
}
// export type IResponses = IGameFields & ICorrectness

interface IRound {
  id: string,
  solutions: IGameFields,
  responses: IResponses | undefined,
}

export interface IRoundMap {
  [songId:string]: IRound
}
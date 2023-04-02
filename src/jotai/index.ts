import { atom } from "jotai";
import type { IRoundMap } from "~/types";
import { EGameState } from "~/types";

export const gameStateAtom = atom(EGameState.inactive)
export const roundMapAtom = atom({} as IRoundMap)
export const maxPointsAtom = atom(0)
export const currentPointsAtom = atom(0)

export const colourAtom = atom('bg-amber-100')
import type { HTMLInputTypeAttribute } from "react";
import { ImCheckmark, ImCross } from 'react-icons/im';


interface IInputRow {
  label: string;
  value: string;
  solution: string;
  isSubmitted: boolean;
  isCorrect?:boolean;
  type: HTMLInputTypeAttribute;
  onChange: (value:string) => void
}

export const InputRow = ({
  label,
  value,
  solution,
  isSubmitted,
  isCorrect,
  type,
  onChange
}:IInputRow) => {

  const words = label.split(' ')
  const labelWords = () => <>
    {words.map((word)=>{
      return <>{word}<br/></>
    })}
  </>

  const getSolutionTranslationClassName = () => {
    if(!isSubmitted){
      return 'translate-x-full'
    }
    if(!isCorrect){
      return 'bg-red-400 translate-x-[calc(100%-3rem)] group-hover:translate-x-0'
    }
    return 'bg-green-400 translate-x-0'
  }

  const getInputTextClassName = () => {
    if(!isSubmitted){
      return ''
    }
    if(!isCorrect){
      return 'text-red-400'
    }
    return 'text-green-400'
  }

  return (
    <div className="flex border-b-4 border-black w-full">
      <div className="w-20">
        {labelWords()}
      </div>
      <div className="flex items-center w-full">
        <div className=" group relative rounded-full py-0 h-10 w-full overflow-hidden">
          <input
            className={`bg-white rounded-full px-4 py-0 h-10 w-full ${getInputTextClassName()}`}
            placeholder="answer here"
            type={type}
            max={type==='number' ? 2025 : undefined}
            value={value}
            disabled={isSubmitted}
            onChange={(e) => onChange(e.target.value)} />

          <div
            className={`absolute rounded-full h-10 flex w-full items-center text-white top-0 transition-all ${getSolutionTranslationClassName()}`}
          >
            <div className="w-[3rem] flex justify-center">
              {isCorrect ? <ImCheckmark /> : <ImCross />}
            </div>
            {solution.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  )
}
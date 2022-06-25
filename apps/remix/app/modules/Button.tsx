import type {ButtonHTMLAttributes} from 'react'

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`
        bg-blue-500 
        hover:bg-blue-700 
        text-white 
        font-bold 
        rounded 
        py-1 
        px-2
        leading-none
      `}
    />
  )
}

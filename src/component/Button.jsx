import React from 'react'

function Button({
    children,
    type = 'button',
    className = '',
    textColor = 'text-white',
    bgColor = 'bg-blue-600',
    ...props

}) {
  return (
    <button 
    className={`py-2 px-4 rounded-lg ${textColor} ${bgColor} ${className}`}{...props} 
    >{children}</button>
  )
}

export default Button
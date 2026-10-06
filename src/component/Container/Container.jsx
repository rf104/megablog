import React from 'react'

function Container({ children, className = '', size = 'default' }) {
  const width = size === 'narrow' ? 'max-w-3xl' : 'max-w-6xl'
  return <div className={`mx-auto w-full ${width} px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export default Container

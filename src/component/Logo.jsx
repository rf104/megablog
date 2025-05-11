import React from 'react'
import lg from '../photos/42.png'

function Logo({width = '50px'}) {
  return (
    <div>
        <img src={lg} alt="" width={width} />
    </div>
  )
}

export default Logo
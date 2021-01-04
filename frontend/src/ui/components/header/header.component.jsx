import React from 'react'
import './header.style.scss'

import { Logo } from 'app-images'

export const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <Logo />
      </div>
    </div>
  )
}

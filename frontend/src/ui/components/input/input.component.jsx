import React, { useState } from 'react'
import './input.style.scss'

export const Input = ({ type, name, label, id, error, value }) => {
  const [inputValue, setInputValue] = useState(value)

  const renderSuggestion = () => {
    if (error && error.suggestion) {
      return (
        <div className="input__suggestion">
          Você quis dizer{' '}
          <a onClick={() => setInputValue(error.suggestion)}>
            {error.suggestion}
          </a>
          ?
        </div>
      )
    }
  }

  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        id={id}
        type={type}
        name={name}
      />

      <div className="input__errors">
        {error && error.message}
        {renderSuggestion()}
      </div>
    </div>
  )
}

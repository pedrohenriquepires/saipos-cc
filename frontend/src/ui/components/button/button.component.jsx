import React from 'react'
import PropTypes from 'prop-types'

import './button.style.scss'

const getVariantsClass = variants =>
  variants ? variants.map(v => `button--${v}`).join(' ') : null

export const Button = ({ onClick, children, variants, type, disabled }) => {
  return (
    <button
      type={type}
      className={`button ${getVariantsClass(variants)}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  variants: PropTypes.arrayOf(PropTypes.oneOf(['icon', 'success', 'error'])),
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  disabled: false,
  variants: ['default'],
}

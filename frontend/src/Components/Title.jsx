import React from 'react'
import './Styles/Title.css'

const Title = ({ title }) => {
  return (
    <div className="form-title">
      <h2>{title}</h2>
      <div></div>
    </div>
  )
}

export default Title
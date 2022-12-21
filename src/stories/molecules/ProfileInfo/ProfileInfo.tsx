import React from 'react'
import { InputInfo } from '../../atoms/InputInfo'
import './profileInfo.scss'

export const ProfileInfo = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="profile-info" ref={ref}>
      <div className="profile-info-container">
        <InputInfo placeHolder="Michael John" />
        <InputInfo placeHolder="Professional Title" />
        <InputInfo placeHolder="Short and engaging pitch about yourself." />
      </div>
    </div>
  )
})

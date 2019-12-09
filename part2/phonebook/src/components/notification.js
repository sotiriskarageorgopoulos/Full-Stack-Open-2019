import React from 'react'
import '../styles/index.css'

const Notification = ({message}) => {
  if(message === '') return(<></>)
  else{
      return (
          <div className="add-notification-style">
            <h1>{message}</h1>
          </div>
      )
  }
}

export default Notification
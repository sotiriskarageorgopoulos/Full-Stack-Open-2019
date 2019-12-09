import React from 'react'
import '../styles/index.css'

const Notification = ({addMesg,deleteMesg}) => {
  console.log(addMesg)
  if(addMesg === undefined && deleteMesg === undefined){ return(<></>) }
  else if(addMesg !== undefined){
      return (
          <div className="add-notification-style">
            <h1>{addMesg}</h1>
          </div>
      )
  }
  else if(deleteMesg !== undefined){
    return (
      <div className="delete-notification-style">
        <h1>{deleteMesg}</h1>
      </div>
  )
  }
  return (<></>)
}

export default Notification
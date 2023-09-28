import React from 'react';

export default function Die (props) {

  const styles = {backgroundColor: props.isHeld ? 
    "rgb(89, 227, 145)" : "white"}

  return (
    <div className="die" style={styles} onClick={() => {props.handleClick(props.id)}}>
      <h2>
        {props.value}
      </h2>
    </div>
  )
}
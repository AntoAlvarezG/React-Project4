import React from 'react';

export default function Die (props) {
  return (
    <div className='die' onClick={props.holdDice}>
        {
          !props.isHeld 
          ? <img className='dots' src={`./images/${props.value}.png`} alt={`${props.value}`} />
          : <img className='dots' src={`./images/clicked${props.value}.png`} alt={`${props.value}`} />
        }
    </div>
  )
}

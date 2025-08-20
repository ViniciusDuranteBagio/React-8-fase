import { useState } from 'react';
import './index.css';

export default function Square(){
  return(
  <>
    <div className='board-now'>
      <button className="square">X</button>
      <button className="square">X</button>
      <button className="square">X</button>
    </div>  
    <div className='board-now'>
      <button className="square">X</button>
      <button className="square">X</button>
      <button className="square">X</button>
    </div>  
    <div className='board-now'>
      <button className="square">X</button>
      <button className="square">X</button>
      <button className="square">X</button>
    </div>  
  </>
  )
}

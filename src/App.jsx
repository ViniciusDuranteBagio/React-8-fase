import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Ola from './Ola.jsx'
import Lista from './Lista.jsx'



function App() {
  const [count, setCount] = useState(0);

  function mais(){
    setCount(previousCount => previousCount + 1);
  }

  function menos(){
    setCount(previousCount => previousCount - 1);
  }

  return (
    <>
      <Ola nome="Guilherme"></Ola>
      <div className='card'>
        <button onClick={menos}>
          -
        </button>
        <button>
          count is {count}
        </button>
        <button onClick={mais}>
          +
        </button>
      </div>

      <div>
        <Lista> 
        </Lista>
      </div>
   </>
  )
}

export default App

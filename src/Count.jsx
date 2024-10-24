import React, { useState } from 'react'

const Count = () => {

    const [count, setCount] = useState(0);

    function incrementCount(){
        setCount(count+1);
    }
  return (
    <div>
        <p>{count}</p>
        <button onClick={incrementCount}>Add</button>
    </div>
  )
}

export default Count
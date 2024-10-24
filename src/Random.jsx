import React, { useState } from 'react'

const Random = () => {
  //const products=["the best", "Hazard", "King", "Palmer"];
  const [inputTodo,setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function enterTodo(event){
    const text = event.target.value;
    setInputTodo(text);
  }

  function addTodo(){
   setTodos((prev)=>{
    return [...prev,inputTodo]
   })
   setInputTodo("")
  }


  return (
    <div>
      <input onChange={enterTodo} type="text" placeholder="enter todo" value={inputTodo}/>
      <button onClick={addTodo}>add</button>
    {todos.map((prod, index)=>(
        <ol>
          <li key={index}> {prod}</li>
        </ol>
        
    ))}
  </div>
  )
}

export default Random
import React, {useEffect, useRef, useState} from "react";

export default function App(){

  const INITIAL_TIMER = 10

  const [text, setText] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIMER)
  const [isTimeRunning, setIsTimeRunning] = useState(()=>false)
  const [wordCount, setWordCount] = useState(0)
  const textRef = useRef(null)


  useEffect(()=>{
    if(isTimeRunning && timeRemaining > 0){
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 1000)
    } else if(timeRemaining === 0){
      endGame()
    }
  }

  ,[timeRemaining,isTimeRunning])


  const updateText = (e) => {
    if(e.target.name === 'text'){
      setText(e.target.value)
    }
  }

  const startGame = () =>{
    setText("")
    setWordCount(0)
    setTimeRemaining(INITIAL_TIMER)
    setIsTimeRunning(true)
    textRef.current.disabled = false
    textRef.current.focus()

  }

  const endGame =()=>{
    setIsTimeRunning(false)
    setWordCount(getWordCount(text))
  }

  const getWordCount = (textcontent) => {
    return textcontent.trim().split(' ').filter(x => x !== "").length
  }

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea 
        ref={textRef}
        name="text" 
        value={text} 
        onChange={updateText}
        disabled={!isTimeRunning}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button 
        onClick={startGame}
        disabled={isTimeRunning}
        >Start</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  )
}
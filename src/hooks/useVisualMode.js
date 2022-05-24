import {useState} from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  function transition(nextMode, replace = false) {
    
    if(replace) {
      setHistory((prev) => [...prev.slice(0, prev.length-1)]);
    }
    setHistory((prev) =>{
      //const newHist = [...prev, nextMode]
      //console.log("newHist ",newHist)
       return [...prev, nextMode]
      });
    setMode(nextMode);

  };

  function back() {
    //console.log("Back: ", history)
    if(history.length === 1) return undefined
    setMode(history[history.length-2])
    setHistory((prev) => [...prev].slice(0, history.length-1));

  };

  return { mode, transition, back};
}
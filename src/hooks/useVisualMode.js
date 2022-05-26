import { useState } from "react";

 /* Hook to manipulate and track comonents. Returns mode (state), transition(func), back(func) 
 *
 * @param {initial} mode (string), the initial mode for a passed appointment component.
 * @return {mode (state), transition(func), back(func)}.
 * */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /* Transitions an appointment components state and track history. 
  *
  * @param {nextMode} mode (string), the next mode to transition to rendering a differnt appointment component.
  * @param {replace} if true (default false) replace the last history recorded in turn creating a double back.
  * @return nothing.
  * */
  function transition(nextMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
    setHistory((prev) => [...prev, nextMode]);
    setMode(nextMode);
  }

  /* Transitions an appointment components back one state in the history. */
  function back() {
    if (history.length === 1) return;

    setMode(history[history.length - 2]);
    setHistory((prev) => [...prev].slice(0, history.length - 1));
  }

  return { mode, transition, back };
}

import {createEvent, createStore, sample} from "effector"
import {useUnit} from "effector-react"

const $counter = createStore<number>(0);
const increment = createEvent();
const decrement = createEvent();
sample({
  clock: increment,
  source: $counter,
  fn: (counter: number) => counter + 1,
  target: $counter,
})
sample({
  clock: decrement,
  source: $counter,
  fn: (counter: number) => counter === 0 ? 0 : counter - 1,
  target: $counter,
})
function App() {
  const [counter, handleIncrement, handleDecrement] = useUnit([$counter,increment,decrement]);
  return (
    <>
    <button onClick={handleIncrement}>+</button>
    <span>{counter}</span>
    <button onClick={handleDecrement}> - </button>
    </>
  )
}

export default App

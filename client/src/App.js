import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  const style = {
    border: "1px solid white",
    textTransform: "capitalize",
    fontWeight: "bolder",
  };

  const booleanVal = !false;

  return (
    <div className="App">
      <h1>Click on the button below to see changes in state?</h1>
      <p>{count}</p>

      {booleanVal && (
        <button
          style={{
            ...style,
            height: "100px",
            width: "100px",
            backgroundColor: "red",
          }}
          onClick={() => setCount(count + 1)}
          children="click me"
        />
      )}
    </div>
  );
}
export default App;

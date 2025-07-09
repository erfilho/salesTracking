import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>
        <h2 className="text-4xl font-bold text-amber-600"> Hello world! </h2>
        <button onClick={handleCount}> Contando: {count} </button>
      </div>
    </>
  );
}

export default App;

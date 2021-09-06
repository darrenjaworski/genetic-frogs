import { Environment } from "./components/Environment";
import { frogReducer, initialData } from "./data/main";
import { Frog as FrogComponent } from "./components/Frog";
import { useReducer } from "react";

function App() {
  const [data, dispatch] = useReducer(frogReducer, initialData);

  return (
    <div>
      <h1>{`generation number ${data.generationNumber}`}</h1>
      <button onClick={() => dispatch({ type: "generate" })}>generate</button>
      <button onClick={() => dispatch({ type: "newBackground" })}>
        new background color
      </button>
      <Environment bg={data.backgroundColor}>
        {data.frogs.map((frog) => {
          return <FrogComponent key={frog.uuid} frog={frog} />;
        })}
      </Environment>
    </div>
  );
}

export default App;

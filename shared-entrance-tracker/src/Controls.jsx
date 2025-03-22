import {useTrackerState} from "./TrackerStateContext.jsx";
import Connection from "./Connection.jsx";

function Controls() {

  const {setSelectedEntranceName, currentWorld, setCurrentWorld} = useTrackerState();

  function toggleStackedView() {
    setSelectedEntranceName(null);
    setCurrentWorld((prevState) => prevState === "☀️" ? "🌙" : "☀️");
  }

  return (
    <div className={"controls-container"}>
      <Connection/>
      <button className='ui stack-toggle-button' onClick={toggleStackedView}>
        {currentWorld}
      </button>
    </div>
  );
}

export default Controls;
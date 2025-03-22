import {useTrackerState} from "./TrackerStateContext.jsx";
import {useWebRTC} from "./WebRTCContext.jsx";



const EntranceMenu = () => {
  const {state, currentWorld, selectedEntranceName, entranceOptions} = useTrackerState();
  const {sendUpdate} = useWebRTC();

  function handleSelection(selectedEntrance) {
    const update = {
      type: "state-change",
      world: currentWorld,
      entranceName: selectedEntranceName,
      newState: selectedEntrance,
    }

    sendUpdate(update);
  }

  function isSelected(option) {
    if (selectedEntranceName && state[currentWorld][selectedEntranceName].state === option.icon) {
      return " selected";
    }
    return "";
  }

  return (
    <>
      <div className={"container-header"}><h3>Entrances</h3></div>
      <div className="entrances-container container">
        {Object.entries(entranceOptions).map(([key, value], index) =>
            key === "❌" || key === "✔️" ? (
                <button
                    className={"entrance-menu-icon" + isSelected(value)}
                    key={index}
                    onClick={() => {
                      if (selectedEntranceName) handleSelection(key);
                    }}
                >
                  {value.icon}
                </button>
            ) : (
                <img
                    className={"entrance-menu-icon" + isSelected(value)}
                    key={index}
                    src={value.icon}
                    alt={value.icon}
                    onClick={() => {
                      if (selectedEntranceName) handleSelection(key);
                    }}
                />
            )
        )}
      </div>
    </>
  );
};

export default EntranceMenu;

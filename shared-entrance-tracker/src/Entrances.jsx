import {useTrackerState} from "./TrackerStateContext.jsx";

const Entrances = () => {
  const {state, currentWorld} = useTrackerState();
  const entranceList = Object.entries(state?.[currentWorld] ?? {});
  const {selectedEntranceName, setSelectedEntranceName} = useTrackerState();

  function handleClick(entranceName) {
    setSelectedEntranceName(entranceName);
  }

  return (
    <div>
      <div className="entrances-overlay">
        {entranceList.map(([name, entrance], index) => {
          // Determine button color based on state
          let color;
          let image = null;
          switch (entrance.state) {
            case "✔️":
              color = (entrance.notes && entrance.notes.length > 0) ? "green" : "blue";
              break;
            case "❌":
              color = "black";
              break;
            case "./assets/icon1.png":
              color = "orange";
              break;
            default:
              color = "transparent";
              image = entrance.state
          }

          return image === null ? (
            <button
              key={index}
              className={"entrance" + (selectedEntranceName === name ? " selected" : "")}
              style={{
                left: `${entrance.x}%`,
                top: `${entrance.y}%`,
                backgroundColor: color,
              }}
              onClick={() => handleClick(name)}
            />
          ) : (
            <img className={"entrance" + (selectedEntranceName === name ? " selected" : "")} style={{
              left: `${entrance.x}%`,
              top: `${entrance.y}%`,
              backgroundColor: color,
            }}
                 alt={image}
                 src={image}
                 onClick={() => handleClick(name)}>
            </img>
          );
        })}
      </div>
    </div>
  );
};

export default Entrances;
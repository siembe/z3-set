import {useTrackerState} from "./TrackerStateContext.jsx";

const Entrances = () => {
    const {state, currentWorld, entranceOptions, selectedEntranceName, setSelectedEntranceName} = useTrackerState();
    const entranceList = Object.entries(state?.[currentWorld] ?? {});

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
                        default:
                            color = "transparent";
                            image = entranceOptions[entrance.state].icon
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
                        <div className={"entrance-background" + (selectedEntranceName === name ? " selected" : "")} style={{
                            left: `${entrance.x}%`,
                            top: `${entrance.y}%`,
                        }} key={index}>
                            <img className={"entrance-image"} style={{
                                left: `${entrance.x}%`,
                                top: `${entrance.y}%`,
                                backgroundColor: color,
                            }}
                                 alt={image}
                                 src={image}
                                 onClick={() => handleClick(name)}>
                            </img>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Entrances;
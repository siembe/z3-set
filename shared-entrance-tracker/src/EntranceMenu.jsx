import {useTrackerState} from "./TrackerStateContext.jsx";
import {useWebRTC} from "./WebRTCContext.jsx";

const iconOptions = [
  {icon: "✔️"},
  {icon: "❌"},
  {icon: null},
  {icon: "./paradox_top.png"},
  {icon: "./paradox_middle.png"},
  {icon: "./paradox_bottom.png"},
  {icon: "./assets/icon1.png"},
  {icon: "./assets/icon2.png"},
  {icon: "./assets/icon3.png"},
  {icon: "./assets/icon4.png"},
  {icon: "./assets/icon5.png"},
  {icon: "./assets/icon6.png"},
  {icon: "./assets/icon7.png"},
  {icon: "./assets/icon8.png"},
  {icon: "./assets/icon9.png"},
  {icon: "./assets/icon10.png"},
  // Add more options as needed
];

const EntranceMenu = () => {
  const {state, currentWorld, selectedEntranceName} = useTrackerState();
  const {sendUpdate} = useWebRTC();

  function handleSelection(selectedIcon) {
    const update = {
      type: "state-change",
      world: currentWorld,
      entranceName: selectedEntranceName,
      newState: selectedIcon.icon,
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
      <div className="entrance-menu-container container">
        <div className="entrance-menu-content">
          {iconOptions.map((option, index) => (
            option.icon === "❌" || option.icon === "✔️" ? (
              <button className={"entrance-menu-icon" + isSelected(option)} key={index}
                      onClick={() => {
                        if (selectedEntranceName) handleSelection(option)
                      }}>{option.icon}</button>
            ) : (
              <img
                className={"entrance-menu-icon" + isSelected(option)}
                key={index}
                src={option.icon}
                alt={option.icon}
                onClick={() => {
                  if (selectedEntranceName) handleSelection(option)
                }}
              />
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default EntranceMenu;

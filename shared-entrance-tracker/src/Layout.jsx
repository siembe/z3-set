import Controls from "./Controls.jsx";
import Map from "./Map.jsx";
import Notes from "./Notes.jsx";
import EntranceMenu from "./EntranceMenu.jsx";
import Items from "./Items.jsx";
import lightWorld from "./assets/Zelda3LightOverworldBG.png";
import darkWorld from "./assets/Zelda3DarkOverworldBG.png";
import {useTrackerState} from "./TrackerStateContext.jsx";

function Layout() {

  const {currentWorld, selectedEntranceName} = useTrackerState();

  return (
    <>
      <div className={"layout-left"}>
        <Controls/>
        <Map map={currentWorld === "☀️" ? lightWorld : darkWorld}/>
      </div>
      <div className={"layout-right"}>
        {selectedEntranceName && (<>
          <Notes/>
          <Items/>
          <EntranceMenu/>
        </>)}
      </div>
    </>
  );
}

export default Layout;
import Controls from "./Controls.jsx";
import Map from "./Map.jsx";
import Notes from "./Notes.jsx";
import EntranceMenu from "./EntranceMenu.jsx";
import Items from "./Items.jsx";
import {useTrackerState} from "./TrackerStateContext.jsx";

function Layout() {

  const {currentWorld, selectedEntranceName} = useTrackerState();

  return (
    <>
      <div className={"layout-left"}>
        <Controls/>
        <Map map={currentWorld}/>
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
import {useWebRTC} from "./WebRTCContext.jsx";
import {useTrackerState} from "./TrackerStateContext.jsx";

function Items() {

    const {state, currentWorld, selectedEntranceName, itemOptions} = useTrackerState();
    const {sendUpdate} = useWebRTC();

    function handleSelection(selectedItem) {

        let itemState;
        if (state[currentWorld][selectedEntranceName].items) {
            const currentItems = state[currentWorld][selectedEntranceName].items;
            if (currentItems.includes(selectedItem)) {
                itemState = currentItems.filter(item => item !== selectedItem); // remove
            } else {
                itemState = [...currentItems, selectedItem]; // add
            }
        } else {
            itemState = [selectedItem];
        }

        const update = {
            type: "item-change",
            world: currentWorld,
            entranceName: selectedEntranceName,
            items: itemState
        }

        sendUpdate(update);
    }

    function isSelected(option) {
        const items = selectedEntranceName && state[currentWorld][selectedEntranceName].items;
        if (items && items.includes(option)) {
            return " selected";
        }
        return "";
    }

    return (
        <>
            <div className={"container-header"}><h3>Items</h3></div>
            <div className="items-container container">
                {Object.entries(itemOptions).map(([key, value], index) =>
                    <img
                        className={"item-menu-icon" + isSelected(key)}
                        key={index}
                        src={value.icon}
                        alt={value.icon}
                        onClick={() => {
                            if (selectedEntranceName) handleSelection(key);
                        }}
                    />
                )}
            </div>
        </>

    );
}

export default Items;
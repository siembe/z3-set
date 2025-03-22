import {useTrackerState} from "./TrackerStateContext.jsx";
import {useEffect, useRef} from "react";
import {useWebRTC} from "./WebRTCContext.jsx";

function Notes() {

  const {selectedEntranceName, getSelectedEntrance, currentWorld, state} = useTrackerState();
  const textAreaRef = useRef(null);
  const selectedEntranceRef = useRef(null);
  const {sendUpdate} = useWebRTC();

  useEffect(() => {
      selectedEntranceRef.current = getSelectedEntrance();
      if (selectedEntranceRef.current && selectedEntranceRef.current.notes) {
        console.log(selectedEntranceRef.current.notes);
        textAreaRef.current.value = selectedEntranceRef.current.notes;
      } else {
        textAreaRef.current.value = "";
      }
    }, [state, selectedEntranceName]
  );

  function formatText(input) {
    // List of small words to keep lowercase unless they are the first word
    const smallWords = ["of", "the", "and", "or", "in", "on", "at", "to", "for", "with", "but", "by", "a", "an"];

    // Insert a space before each uppercase letter (except the first one)
    let formatted = input.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Move numbers inside parentheses
    formatted = formatted.replace(/(\d+)$/, ' ($1)');

    if (formatted === 'cave (45)')
      formatted = 'cave 45';

    // Capitalize first letter of each word, but keep small words lowercase if they are not the first word
    formatted = formatted.split(" ").map((word, index) => {
      let lowerWord = word.toLowerCase();
      return (index === 0 || !smallWords.includes(lowerWord))
        ? lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1)
        : lowerWord;
    }).join(" ");

    return formatted;
  }

  function handleInput(text) {

    const update = {
      type: "note-change",
      world: currentWorld,
      entranceName: selectedEntranceName,
      notes: text.target.value,
    }

    sendUpdate(update);
  }

  return (
    <>
      <h2>{selectedEntranceName && formatText(selectedEntranceName)}</h2>
      <div className={"container-header"}><h3>Notes</h3></div>
      <div className={"notes-container container"}>
        <textarea ref={textAreaRef} className={"notes-textarea"}
                  defaultValue={selectedEntranceRef.current ? selectedEntranceRef.current.notes : ""}
                  onInput={handleInput}></textarea>
      </div>
    </>
  );
}

export default Notes;
import {createContext, useContext, useState} from 'react'
import {useWebRTC} from './WebRTCContext.jsx'

const TrackerStateContext = createContext(null);

export const TrackerStateProvider = ({children}) => {
  const [state, setState] = useState({
    "☀️": {
      // Northwest Hyrule
      thievesHideaway: {x:18.3, y:14.5, state: '✔️'},
      lostWoodsGamble: {x:18.3, y:1.4, state: '✔️'},
      lumberjackTree: {x:33.3, y:2.9, state: '✔️'},
      lumberjackHut: {x:33.5, y:6.0, state: '✔️'},
      deathMountainDescentBottom: {x:35.8, y:14.8, state: '✔️'},
      oldManEntrance: {x:35.3, y:17.9, state: '✔️'},
      lightFortuneTeller: {x:18.8, y:32.0, state: '✔️'},
      sanctuaryBonkRocks: {x:39.3, y:29.9, state: '✔️'},
      sanctuary: {x:46.1, y:26.4, state: '✔️'},
      sanctuaryLedge: {x:56.7, y:26.9, state: '✔️'},
      kingsTomb: {x:60.2, y:30.0, state: '✔️'},
      uselessFairy: {x:66.8, y:27.6, state: '✔️'},
      // Death Mountain
      oldManExit: {x:40.5, y:18.6, state: '✔️'},
      oldMansHomeFront: {x:44.9, y:22.6, state: '✔️'},
      oldMansHomeBack: {x:53.3, y:15.6, state: '✔️'},
      deathMountainDescentTop: {x:39.5, y:13.4, state: '✔️'},
      spectacleRockLeft: {x:45.4, y:13.6, state: '✔️'},
      spectacleRockRight: {x:48.7, y:14.4, state: '✔️'},
      spectacleRockTop: {x:48.7, y:9.9, state: '✔️'},
      towerOfHera: {x:56.0, y:3.9, state: '✔️'},
      paradoxTop: {x:86.0, y:5.9, state: '✔️'},
      spiralTop: {x:79.8, y:8.6, state: '✔️'},
      mimicCave: {x:84.4, y:8.6, state: '✔️'},
      spiralBottom: {x:79.5, y:12.4, state: '✔️'},
      fairyAscentTop: {x:81.8, y:11.0, state: '✔️'},
      fairyAscentBottom: {x:81.8, y:13.6, state: '✔️'},
      hookshotFairy: {x:84.0, y:14.4, state: '✔️'},
      paradoxMid: {x:86.1, y:14.4, state: '✔️'},
      paradoxBottom: {x:86.2, y:21.6, state: '✔️'},
      // Kakariko
      well: {x:5.0, y:42.1, state: '✔️'},
      blindsHut: {x:12.8, y:42.1, state: '✔️'},
      elderLeft: {x:15.05, y:42.1, state: '✔️'},
      elderRight: {x:17.3, y:42.1, state: '✔️'},
      snitchLeft: {x:5.1, y:46.1, state: '✔️'},
      snitchRight: {x:20.65, y:47.6, state: '✔️'},
      chickenHut: {x:9.85, y:53.1, state: '✔️'},
      sickKid: {x:15.7, y:53.1, state: '✔️'},
      bushHouse: {x:20.34, y:53.1, state: '✔️'},
      bombShack: {x:3.0, y:58.9, state: '✔️'},
      kakarikoShop: {x:11.0, y:57.75, state: '✔️'},
      tavernBack: {x:16.1, y:57.0, state: '✔️'},
      tavernFront: {x:16.1, y:59.5, state: '✔️'},
      blacksmith: {x:30.5, y:52.5, state: '✔️'},
      magicBat: {x:32.4, y:55.5, state: '✔️'},
      library: {x:15.6, y:65.2, state: '✔️'},
      brothersLeft: {x:11.0, y:71.2, state: '✔️'},
      brothersRight: {x:13.8, y:71.2, state: '✔️'},
      kakarikoGamble: {x:21.5, y:69.4, state: '✔️'},
      // Eastern Hyrule
      waterfallCave: {x:90.2, y:14.2, state: '✔️'},
      witchHut: {x:80.0, y:33.0, state: '✔️'},
      sahasrala: {x:81.1, y:44.5, state: '✔️'},
      easternPalace: {x:95.9, y:38.9, state: '✔️'},
      lakeHyliaFairy: {x:82.3, y:64.0, state: '✔️'},
      longFairyCave: {x:97.9, y:69.6, state: '✔️'},
      // Lake Hylia
      lakeHyliaFortuneTeller: {x:64.8, y:79.9, state: '✔️'},
      lakeHyliaShop: {x:72.8, y:76.4, state: '✔️'},
      iceRodCave: {x:89.0, y:76.4, state: '✔️'},
      goodBeeCave: {x:91.7, y:76.4, state: '✔️'},
      rupeeCave20: {x:90.2, y:78.9, state: '✔️'},
      capacityFairy: {x:79.4, y:84.8, state: '✔️'},
      miniMoldormCave: {x:65.4, y:93.7, state: '✔️'},
      // Central Hyrule
      linksHouse: {x:54.7, y:68, state: '✔️'},
      bonkFairyLight: {x:47.3, y:65.2, state: '✔️'},
      cave45: {x:26.6, y:82.8, state: '✔️'},
      uncle: {x:55.25, y:43, state: '✔️'},
      hyruleCastleMain: {x:50, y:44.5, state: '✔️'},
      hyruleCastleLeft: {x:45, y:38.5, state: '✔️'},
      hyruleCastleRight: {x:55, y:38.5, state: '✔️'},
      hyruleCastleTower: {x:50, y:39.5, state: '✔️'},
      lightHypeFairy: {x:59.5, y:77.5, state: '✔️'},
      dam: {x:47.0, y:93.5, state: '✔️'},
      // Desert
      desertLeft: {x:3.5, y:79.5, state: '✔️'},
      desertBack: {x:7.45, y:76.3, state: '✔️'},
      desertRight: {x:11.3, y:79.5, state: '✔️'},
      desertFront: {x:7.45, y:80.0, state: '✔️'},
      checkerboardCave: {x:17.8, y:78.0, state: '✔️'},
      aginahsCave: {x:19.8, y:82.2, state: '✔️'},
      desertFairy: {x:28.1, y:88.7, state: '✔️'},
      rupeeCave50: {x:31.3, y:95.7, state: '✔️'},
    },
    "🌙": {
      // Death Mountain
      darkDeathMountainFairy: {x:40.5, y:18.6, state: '✔️'},
      spikeCave: {x:57.2, y:14.4, state: '✔️'},
      gannonsTower: {x:56.3, y:3.9, state: '✔️'},
      turtleRock: {x:94.1, y:7.8, state: '✔️'},
      hookShotCaveBack: {x:80.2, y:1.7, state: '✔️'},
      hookShotCaveFront: {x:83.2, y:6.4, state: '✔️'},
      superBunnyCaveTop: {x:86.0, y:5.9, state: '✔️'},
      darkDeathMountainLedgeLeft: {x:79.8, y:8.6, state: '✔️'},
      darkDeathMountainLedgeRight: {x:84.4, y:8.6, state: '✔️'},
      turtleRockLedge: {x:81.8, y:11.0, state: '✔️'},
      darkDeathMountainCaveShop: {x:84.0, y:14.4, state: '✔️'},
      superBunnyCaveBottom: {x:86.1, y:14.4, state: '✔️'},
      // Northwest Dark World
      skullWoodsFront: {x:18.7, y:14.5, state: '✔️'},
      skullWoodsRight: {x:14.6, y:14.1, state: '✔️'},
      skullWoodsLeft: {x:5.9, y:12.4, state: '✔️'},
      skullWoodsBack: {x:3.9, y:5.6, state: '✔️'},
      darkLumberjackShop: {x:33.5, y:6.0, state: '✔️'},
      bumperCaveTop: {x:35.8, y:14.8, state: '✔️'},
      bumperCaveBottom: {x:35.3, y:17.9, state: '✔️'},
      darkFortuneTeller: {x:18.75, y:32.0, state: '✔️'},
      darkSanctuaryHint: {x:46.1, y:26.4, state: '✔️'},
      curiosityShop: {x:33.2, y:45.3, state: '✔️'},
      chestGame: {x:5.1, y:46.1, state: '✔️'},
      thievesTown: {x:12.5, y:48.4, state: '✔️'},
      cHouse: {x:20.65, y:47.6, state: '✔️'},
      darkWorldShop: {x:20.34, y:53.1, state: '✔️'},
      brewery: {x:11.0, y:57.75, state: '✔️'},
      hammerPegs: {x:31.6, y:60.1, state: '✔️'},
      // Eastern Dark World
      darkWorldPotionShop: {x:80.5, y:33.0, state: '✔️'},
      palaceOfDarknessHint: {x:84.8, y:50.5, state: '✔️'},
      palaceOfDarkness: {x:95.9, y:38.9, state: '✔️'},
      darkLakeHyliaFairy: {x:82.3, y:64.0, state: '✔️'},
      eastDarkWorldHint: {x:97.9, y:69.6, state: '✔️'},
      // South Dark World
      archeryGame: {x:21.5, y:69.4, state: '✔️'},
      darkLakeHyliaShop: {x:64.8, y:79.9, state: '✔️'},
      darkLakeHyliaLedgeFairy: {x:89.0, y:76.4, state: '✔️'},
      darkLakeHyliaHint: {x:91.7, y:76.4, state: '✔️'},
      darkLakeHyliaSpikeCave: {x:90.2, y:78.9, state: '✔️'},
      icePalace: {x:79.7, y:85.8, state: '✔️'},
      bombShop: {x:54.7, y:68, state: '✔️'},
      bonkFairyDark: {x:47.3, y:65.2, state: '✔️'},
      pyramidExit: {x:43.3, y:48.5, state: '✔️'},
      pyramidFairy: {x:47.7, y:48.5, state: '✔️'},
      hypeCave: {x:59.5, y:77.5, state: '✔️'},
      swampPalace: {x:47.0, y:93.5, state: '✔️'},
      // Mire
      mireShed: {x:3.5, y:79.5, state: '✔️'},
      darkDesertFairy: {x:11.3, y:79.5, state: '✔️'},
      miseryMire: {x:7.45, y:80.0, state: '✔️'},
      darkDesertHint: {x:19.8, y:82.2, state: '✔️'},
    }
  });
  const {onDataReceived, onDataChannelSetup} = useWebRTC();
  const [currentWorld, setCurrentWorld] = useState("☀️");
  const [selectedEntranceName, setSelectedEntranceName] = useState(null);
  const getSelectedEntrance = () => {
    if (!selectedEntranceName)
      return null;

    return state[currentWorld][selectedEntranceName];
  }

  onDataReceived.push(handleUpdate);
  onDataChannelSetup.push(fullSync)

  function fullSync() {
    return {type: 'full-sync', state};
  }

  function handleUpdate(data) {
    console.log("📩 Received update", data);

    if (data.type === "state-change") {
      setState((prevState) => ({
        ...prevState,
        [data.world]: {
          ...prevState[data.world],
          [data.entranceName]: {
            ...prevState[data.world][data.entranceName],
            state: data.newState,
          },
        },
      }));
    } else if (data.type === "note-change") {
      setState((prevState) => ({
        ...prevState,
        [data.world]: {
          ...prevState[data.world],
          [data.entranceName]: {
            ...prevState[data.world][data.entranceName],
            notes: data.notes,
          },
        },
      }));
    } else if (data.type === "full-sync") {
      setState(data.state);
    }

    console.log(state);
  }

  return (
    <TrackerStateContext.Provider value={{state, selectedEntranceName, setSelectedEntranceName, currentWorld, setCurrentWorld, getSelectedEntrance}}>
      {children}
    </TrackerStateContext.Provider>
  );
}

export const useTrackerState = () => {
  const context = useContext(TrackerStateContext);
  if (!context) {
    throw new Error('useTrackerState must be used within a TrackerStateProvider');
  }
  return context;
}
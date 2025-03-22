import Entrances from "./Entrances.jsx";
import {useEffect} from "react";

function Map({map}) {

    const mapImages = {
        "☀️": "/Zelda3LightOverworldBG.png",
        "🌙": "/Zelda3DarkOverworldBG.png",
}

    useEffect(() => {
        Object.entries(mapImages).forEach(([key, value]) => {
            const img = new Image();
            img.src = value;
        });
    }, []);

    return (
        <div className="map-container">
            <img className="map" src={mapImages[map]} alt="Map"/>
            <Entrances/>
        </div>
    );
}

export default Map;

import Entrances from "./Entrances.jsx";

function Map({map})  {

  return (
    <div className="map-container">
      <img className="map" src={map} alt="Map" />
      <Entrances/>
    </div>
  );
}

export default Map;

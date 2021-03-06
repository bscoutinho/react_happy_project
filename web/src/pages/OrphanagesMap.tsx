import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "../styles/pages/orphanage-map.css";

import mapMarkerImg from "../images/map-marker.svg";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"></img>

          <h2>Choose a orphanage in the map</h2>
          <p>Many childrens are waiting your visit</p>
        </header>

        <footer>
          <strong>Lisbon</strong>
          <span>Portugal</span>
        </footer>
      </aside>

      <Map
        center={[38.7436883, -9.1952226]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        {/* OpenStreetMap */}
        {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}

        {/* MapBox */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnNjb3V0aW5obyIsImEiOiJja2dkZnM2aWUwMm1xMnRrZmdtMWUwejA3In0.VduQZdmP8q6-JeFnIV1rXg`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} key={orphanage.id}>
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}

      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;

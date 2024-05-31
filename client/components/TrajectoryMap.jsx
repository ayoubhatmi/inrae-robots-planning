"use client";

import Map, { Source, Layer } from "react-map-gl";
import { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { convertWKBToCoordinates } from "@/lib/utils/map-utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const TrajectoryMap = ({ data, styles, isMontoldre = false }) => {
  const mapRef = useRef(null);
  const isDataValid = Array.isArray(data) && data.length > 0;

  // Group points by id
  const groupedPoints = isDataValid
    ? data.reduce((acc, { point, id }) => {
        if (!acc[id]) acc[id] = [];
        const coordinates = convertWKBToCoordinates(point);
        if (coordinates) acc[id].push(coordinates);
        return acc;
      }, {})
    : {};

  // Create GeoJSON features for each trajectory
  const trajectoryGeoJSONs = Object.entries(groupedPoints).map(
    ([id, coordinates]) => ({
      type: "Feature",
      properties: { id },
      geometry: {
        type: "LineString",
        coordinates,
      },
    })
  );

  const layerStyle = {
    id: "trajectory",
    type: "line",
    paint: {
      "line-color": "#0000FF",
      "line-width": 3,
    },
  };

  const initialCoordinates = trajectoryGeoJSONs.length
    ? trajectoryGeoJSONs[0].geometry.coordinates[0]
    : [3.4438053725502584, 46.337344991089594];

  const initialViewStateMontoldre = {
    longitude: 3.4438053725502584,
    latitude: 46.337344991089594,
    zoom: 13.5,
  };

  const initialViewState = {
    longitude: initialCoordinates[0],
    latitude: initialCoordinates[1],
    zoom: 15.5,
  };

  return (
    <div className="w-full">
      {!isDataValid ? (
        <p className="text-lg font-medium">
          No defined trajectories for this plot!
        </p>
      ) : (
        <Map
          ref={mapRef}
          initialViewState={
            isMontoldre ? initialViewStateMontoldre : initialViewState
          }
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{
            ...styles,
          }}
          attributionControl={false}
        >
          {trajectoryGeoJSONs.map((geoJSON, index) => (
            <Source
              key={index}
              id={`trajectory-${index}`}
              type="geojson"
              data={geoJSON}
            >
              <Layer {...layerStyle} id={`layer-${index}`} />
            </Source>
          ))}
        </Map>
      )}
    </div>
  );
};

export default TrajectoryMap;

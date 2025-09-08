import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface IndiaMapProps {
    onRegionClick?: (regionName: string) => void;
}

// TopoJSON for India map (publicly available, can be replaced with a more detailed one later)
const INDIA_GEO_JSON = "/india-states.geojson";
const IndiaMap: React.FC<IndiaMapProps> = ({ onRegionClick }) => {
    return (
        <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1000, center: [80, 22] }}>
                <Geographies geography={INDIA_GEO_JSON}>
                    {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo: any) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => {
                                    const name = geo.properties.st_nm || geo.properties.NAME_1 || geo.properties.NAME;
                                    if (onRegionClick) onRegionClick(name);
                                }}
                                style={{
                                    default: {
                                        fill: "#E0E0E0",
                                        outline: "none",
                                        stroke: "#607D8B",
                                        strokeWidth: 0.75,
                                    },
                                    hover: {
                                        fill: "#90CAF9",
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: "#1976D2",
                                        outline: "none",
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default IndiaMap; 
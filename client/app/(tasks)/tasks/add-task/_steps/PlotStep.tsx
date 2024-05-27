"use client";

import PlotMap from "@/components/PlotMap";

const PlotStep = () => {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold">Plot</h2>
      <p className="text-muted-foreground mb-2 text-sm">
        Select a plot on the map.
      </p>
      <PlotMap />
    </div>
  );
};

export default PlotStep;

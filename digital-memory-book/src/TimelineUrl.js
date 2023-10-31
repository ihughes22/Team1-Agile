import React from "react";
import { useParams } from "react-router-dom";
import TimelineContent from "./TimelineContent";

const TimelineUrl = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>{name}</h1>
      <TimelineContent name={name} />
    </div>
  );
};

export default TimelineUrl;

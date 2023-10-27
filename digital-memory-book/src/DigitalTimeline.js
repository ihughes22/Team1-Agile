import React from "react";
import { Button } from "react-bootstrap";

function DigitalTimeline() {
  function newTimeline() {}
  return (
    <div>
      <Button onClick={newTimeline}>New Timeline</Button>
    </div>
  );
}

export default DigitalTimeline;

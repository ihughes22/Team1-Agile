import React from "react";
import { useParams } from "react-router-dom";

import PostUploader from "./PostUploader";

const TimelineUrl = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>{name}</h1>
      <PostUploader />
    </div>
  );
};

export default TimelineUrl;

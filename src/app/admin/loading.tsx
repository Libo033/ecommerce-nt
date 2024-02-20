import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div className="page2">
      <Backdrop sx={{ color: "#fff" }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default loading;

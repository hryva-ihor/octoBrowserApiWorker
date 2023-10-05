import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

const Notfoundpage = () => {
  return (
    <Box p={2}>
      <Typography variant="h2" component="div" gutterBottom>
        Error
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        Not found page
      </Typography>
      <NavLink to="/API-worker">
        <Typography variant="h6" component="div" gutterBottom>
          Pls go home
        </Typography>
      </NavLink>
    </Box>
  );
};

export default Notfoundpage;

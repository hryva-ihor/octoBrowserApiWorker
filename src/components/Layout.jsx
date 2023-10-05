import { Box } from "@mui/system";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Appbar from "./Appbar/Appbar";

const Layout = () => {
  return (
    <Box width="100%">
      <Appbar />
      <Outlet />
    </Box>
  );
};

export { Layout };

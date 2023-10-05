import { Route, Routes } from "react-router";

import Notfoundpage from "./pages/Notfoundpage";
import { Box } from "@mui/system";
import { Layout } from "./components/Layout";

import { Loginpage } from "./pages/Loginpage";
import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import { useState } from "react";
import { ModalContext } from "./context/ModalContext";
import Registerpage from "./pages/Registerpage";
// import { useSelector } from "react-redux";
import { ModalLogout } from "./components/ModalLogout";
import AboutPage from "pages/Abautpage";

function App() {
  // const { status, error } = useSelector((state) => state.albums);
  const [openModal, setOpenModal] = useState(false);
  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      <Box
        width="1800px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="API-worker"
                element={
                  <RequireAuth>
                    <AboutPage />
                  </RequireAuth>
                }
              />

              <Route path="login" element={<Loginpage />} />
              <Route path="register" element={<Registerpage />} />
              <Route path="*" element={<Notfoundpage />} />
            </Route>
          </Routes>
        </AuthProvider>
        {openModal ? <ModalLogout /> : ``}
      </Box>
    </ModalContext.Provider>
  );
}

export default App;

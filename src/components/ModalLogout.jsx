import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { ModalContext } from "../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slices/userSlice";

export const ModalLogout = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);
  // const { email } = useAuth();
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(Boolean);
  const navigate = useNavigate();
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleLeave = () => {
    dispatch(removeUser());
    navigate("/", { replace: true });
    handleClose();
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 250, sm: 400 },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Typography sx={{ color: "green" }} variant="span">
              {email}
            </Typography>
            , do you want to log out?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={handleLeave}>log out</Button>
            <Button onClick={handleClose}>Stay</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

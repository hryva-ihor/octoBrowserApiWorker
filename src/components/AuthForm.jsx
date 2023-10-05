import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export const AuthForm = (props) => {
  const {
    title,
    handleSubmit,
    invalidEmail,
    invalidPass,
    invalidPassText,
    invalidEmailText,
  } = props;
  // console.log(invalidPassText, invalidEmailText);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const location = useLocation();
  const [btnVisibleSignUp, setBtnVisibleSignUp] = useState(true);
  const [btnVisibleSignIn, setBtnVisibleSignIn] = useState(true);
  useMemo(() => {
    if (location.pathname === "/register")
      setBtnVisibleSignUp(!btnVisibleSignUp);
    if (location.pathname === "/login") setBtnVisibleSignIn(!btnVisibleSignIn);
  }, [location.pathname]);
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      alignItems="center"
      flexDirection="column"
      mt="10%"
    >
      <Typography variant="h4">{title}</Typography>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper-email">Email</InputLabel>
        <Input
          error={invalidEmail}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          value={email}
          name="useremail"
          id="component-helper-email"
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          {invalidEmail ? invalidEmailText : `Enter your email`}
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper-pass">Password</InputLabel>
        <Input
          error={invalidPass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
          value={pass}
          name="userpass"
          id="component-helper-pass"
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          {invalidPass ? invalidPassText : `Enter your password`}
        </FormHelperText>
      </FormControl>
      <Button
        onClick={(e) => {
          handleSubmit(e, email, pass);
        }}
        type="submit"
        variant="outlined"
      >
        Log in
      </Button>
      {/* {btnVisibleSignUp && (
        <Typography>
          Don't have an account yet? <Link to="/register">Sign Up</Link>
        </Typography>
      )}
      {btnVisibleSignIn && (
        <Typography>
          Already have an accaunt? <Link to="/login">Sign in</Link>
        </Typography>
      )} */}
    </Box>
  );
};

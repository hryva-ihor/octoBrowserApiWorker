import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AuthForm } from "../components/AuthForm";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "store/slices/userSlice";

const Registerpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const [invalidPassText, setInvalidPassText] = useState("");
  const [invalidEmailText, setInvalidEmailText] = useState("");

  // const location = useLocation();
  // console.log(location.pathname);
  // const [btnVisible, setBtnVisible] = useState(true);
  // useMemo(() => {
  //   if (location.pathname === "/register") setBtnVisible(!btnVisible);
  // }, [location.pathname]);
  const handleRegister = (e, email, pass) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );
        localStorage.setItem("email", String(user.email));
        localStorage.setItem("token", String(user.accessToken));
        localStorage.setItem("id", String(user.uid));
        setInvalidEmail(false);
        setInvalidPass(false);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case "auth/user-not-found":
            setInvalidEmail(true);
            setInvalidEmailText("User not found");
            // alert("user not found");
            setInvalidPass(false);

            break;
          case "auth/invalid-email":
            setInvalidEmail(true);
            setInvalidEmailText("Invalid email");
            // alert("invalid email");
            setInvalidPass(false);

            break;
          case "auth/email-already-in-use":
            setInvalidEmail(true);
            setInvalidEmailText("Email already in use");
            // alert("invalid email");
            setInvalidPass(false);

            break;
          case "auth/wrong-password":
            // alert("wrong-password");
            setInvalidPass(true);
            setInvalidEmail(false);
            setInvalidPassText("Wrong password");
            break;
          case "auth/weak-password":
            // alert("weak password, min 6 symbols");
            setInvalidPass(true);
            setInvalidEmail(false);
            setInvalidPassText("Weak password, min 6 symbols");
            break;
          default:
            break;
        }
      });
  };
  return (
    <AuthForm
      invalidPass={invalidPass}
      invalidEmail={invalidEmail}
      invalidPassText={invalidPassText}
      invalidEmailText={invalidEmailText}
      title="Sign up"
      handleSubmit={handleRegister}
    />
  );
};

export default Registerpage;

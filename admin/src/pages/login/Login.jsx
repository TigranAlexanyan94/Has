import React from "react";
import { useLogin } from "react-admin";
import { useFormik } from "formik";
import  UserSchema   from '../../schema/UserSchema';
import { Button } from "@mui/material";
import "./Login.less";

const FIELDS = {
  USERNAME: 'name',
  PASSWORD: 'password',
}

const Login = () => {
  const login = useLogin();

  const formik = useFormik({
    initialValues: {
      [FIELDS.USERNAME]: '',
      [FIELDS.PASSWORD]: ''
    },
   
    // validationSchema: UserSchema,
    onSubmit: (values) => {
      const{ name, password } = values;

      login({ name, password }).catch(() =>
        console.log("Invalid username or password")
      );
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div className="Wrapper">
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="LoginForm">
          <input
            id="usernameField"
            name="name"
            type="text"
            className={errors[FIELDS.USERNAME] ? "border-error" : "border"}
            placeholder="Please enter your name"
            value={values[FIELDS.USERNAME]}
            onChange={handleChange}
          />
          {errors[FIELDS.USERNAME] && touched[FIELDS.USERNAME] ? (
            <p className="error">{errors[FIELDS.USERNAME]}</p>
          ) : null}
          <input
            id="passwordField"
            name="password"
            type="password"
            className={errors[FIELDS.PASSWORD] ? "border-error" : "border"}
            placeholder="Please enter your password"
            value={values[FIELDS.PASSWORD]}
            onChange={handleChange}
          /> 
          {errors[FIELDS.PASSWORD] && touched[FIELDS.PASSWORD] ? (
            <p className="error">{errors[FIELDS.PASSWORD]}</p>
          ) : null} 
          <div className="checkBox">
            <input type="checkbox" id="check" />
            <label htmlFor="check">Remember me</label>
          </div>
          <Button id="login" type="submit">
            Sign IN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

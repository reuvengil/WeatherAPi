import { Button } from "@material-ui/core";
import React, { Component } from "react";
import cookie from "react-cookies";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  logIn() {
    cookie.save("token", "True", { path: "/" });
  }
  render() {
    return (
      <>
      <div className='d-flex justify-content-between'>
        <Button color="primary" href='/' variant="contained">Home</Button>
      </div>
      <form
        onSubmit={() => {
          this.logIn();
          return false;
        }}
        className="form-signin text-center needs-validation"
      >
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          pattern="(Admin|admin)"
          required
          autoFocus
        />
        <input
          type="password"
          name="form_password"
          className="form-control"
          placeholder="Password"
          required
          pattern="(Admin|admin)"
        ></input>
        <button className="btn btn-dark" type="submit">
          Sign in
        </button>
      </form>
      </>
    );
  }
}

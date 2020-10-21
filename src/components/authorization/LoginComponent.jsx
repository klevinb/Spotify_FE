import React, { useState } from "react";
import { Container, Image, Button, FormControl, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch, props) => ({
  setUser: (user) => dispatch({ type: "ADD_USER", payload: user }),
});

function LoginComponent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios(`${process.env.REACT_APP_API_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        email,
        password,
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      console.log("here");
      const res = await axios(`${process.env.REACT_APP_API_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(res.data);
      props.setUser(res.data);
      if (res.status === 200) {
        props.history.push("/");
      }
    }

    if (!res.isOk) {
      // display an error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <>
      <Container fluid className='loginPage'>
        <Image src='/spotify_navigation_logo_black.png' alt='black logo' />
      </Container>
      <Container>
        <div className='loginContent d-flex flex-column'>
          <span>To continue, log in to Spotify.</span>
          <Button
            id='facebookBtn'
            onClick={() =>
              alert(
                "We haven't implemented this feature yet, you can log in with your credentials"
              )
            }
          >
            CONTINUE WITH FACEBOOK
          </Button>
          <Button
            id='appleBtn'
            onClick={() =>
              alert(
                "We haven't implemented this feature yet, you can log in with your credentials"
              )
            }
          >
            CONTINUE WITH APPLE
          </Button>
          <div className='d-flex justify-content-between'>
            <hr />
            <p>OR</p>
            <hr />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <FormControl
                type='text'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className='mr-sm-2'
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <FormControl
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className='mr-sm-2'
              />
            </Form.Group>
            <div className='d-flex justify-content-between'>
              <Form.Group controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Remeber me' />
              </Form.Group>
              <Button variant='success' id='loginBtn' type='submit'>
                LOG IN
              </Button>
            </div>
            <div className='d-flex justify-content-center'>
              <Link to=''>Forgot your password?</Link>
            </div>
            <hr />
            <div className='signupSection  d-flex flex-column'>
              <span>Don't have an account?</span>
              <Button
                id='signupBtn'
                onClick={() => props.history.push("/login?signup")}
              >
                SIGN UP FOR SPOTIFY
              </Button>
              <hr />
              <span className='terms'>
                If you click "Log in with Facebook" and are not a Spotify user,
                you will be registered and you agree to Spotify's{" "}
                <span>Terms & Conditions</span> and <span>Privacy Policy</span>.
              </span>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default connect(null, mapDispatchToProps)(withRouter(LoginComponent));

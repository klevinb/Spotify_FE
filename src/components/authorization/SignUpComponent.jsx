import React, { useState } from "react";
import { Container, Image, Button, FormControl, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function SignUpComponent(props) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");
  const [password, setpassword] = useState("");
  const [profileName, setprofileName] = useState("");
  const [birthday, setbirthday] = useState("");
  const [gender, setgender] = useState("");

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePass = (pass) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(pass));
  };

  const signUp = async () => {
    const resp = await axios(
      `${process.env.REACT_APP_API_URL}/users/register`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          profileName,
          email,
          password,
          birthday,
          gender,
        },
        method: "POST",
      }
    );
    if (resp.status === 201) props.history.push("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <>
      <Container fluid className='signupPage'>
        <Image src='/spotify_navigation_logo_black.png' alt='black logo' />
      </Container>
      <Container>
        <div className='signupContent d-flex flex-column'>
          <span id='title'>Sign up for free to start listening.</span>
          <Button
            id='facebookBtn'
            onClick={() =>
              alert(
                "We haven't implemented this feature yet but you can sign up"
              )
            }
          >
            SIGN UP WITH FACEBOOK
          </Button>
          <div className='d-flex justify-content-between'>
            <hr />
            <p>OR</p>
            <hr />
          </div>
          <span>Sign up with your email address</span>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>What's your email</Form.Label>
              <FormControl
                type='email'
                placeholder='Enter your email.'
                className='mr-sm-2'
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              {email && !validateEmail(email) && (
                <div className='errorMessage'>Email is not valid</div>
              )}
            </Form.Group>
            <Form.Group controlId='formBasicEmailCheck'>
              <Form.Label>Confirm your email</Form.Label>
              <FormControl
                type='email'
                placeholder='Enter your email again.'
                className='mr-sm-2'
                value={confirmEmail}
                onChange={(e) => setconfirmEmail(e.currentTarget.value)}
                required
              />
              {confirmEmail && !(email === confirmEmail) && (
                <div className='errorMessage'>Emails should be identic</div>
              )}
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Create a password</Form.Label>
              <FormControl
                type='password'
                placeholder='Create a password.'
                className='mr-sm-2'
                value={password}
                onChange={(e) => setpassword(e.currentTarget.value)}
                required
              />
              {password && !validatePass(password) && (
                <div className='errorMessage'>
                  Should contain at least 8 chars, 1 digit, 1 letter
                </div>
              )}
            </Form.Group>
            <Form.Group controlId='formBasicName'>
              <Form.Label>What should we call you?</Form.Label>
              <FormControl
                type='text'
                placeholder='Enter a profile name.'
                className='mr-sm-2'
                value={profileName}
                onChange={(e) => setprofileName(e.currentTarget.value)}
                required
              />
              <Form.Text className='text-muted'>
                This appears on your profile.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId='formBasicDate'>
              <Form.Label>What's your date of birth?</Form.Label>
              <FormControl
                type='date'
                className='mr-sm-2'
                onChange={(e) => setbirthday(e.currentTarget.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='formBasicDate'>
              <Form.Label>What's your gender?</Form.Label>
              <div className='d-flex justify-content-between'>
                <div className='radio'>
                  <label>
                    <input
                      type='radio'
                      value='M'
                      checked={gender === "M"}
                      onChange={(e) => setgender(e.target.value)}
                    />
                    Male
                  </label>
                </div>
                <div className='radio'>
                  <label>
                    <input
                      type='radio'
                      value='F'
                      checked={gender === "F"}
                      onChange={(e) => setgender(e.target.value)}
                    />
                    Female
                  </label>
                </div>
                <div className='radio'>
                  <label>
                    <input
                      type='radio'
                      value='non-binary'
                      checked={gender === "non-binary"}
                      onChange={(e) => setgender(e.target.value)}
                    />
                    Non-binary
                  </label>
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId='formBasicCheckbox'>
              <Form.Check
                type='checkbox'
                value='check'
                label={`Share my registration data with Spotify's content providers for marketing purposes. Note that your data may be transferred to a country outside of the EEA as described in our privacy policy.`}
              />
            </Form.Group>
            <div className='signupSection  d-flex flex-column'>
              <span className='terms'>
                By clicking on Sign up, you agree to{" "}
                <span>Spotify's Terms and Conditions of Use</span>.
              </span>
              <span className='terms'>
                To learn more about how Spotify collects, uses, shares and
                protects your personal data please read Spotify's
                <span> Privacy Policy</span>.
              </span>
              <Button id='registerButton' type='submit'>
                SIGN UP
              </Button>
              <div className='d-flex justify-content-center'>
                <span>
                  Have an account?{" "}
                  <span onClick={() => props.history.push("/login")}>
                    Log in
                  </span>{" "}
                  .
                </span>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default withRouter(SignUpComponent);

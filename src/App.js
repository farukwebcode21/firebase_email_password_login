import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./App.css";
import app from "./firebase/firebase.init";

const auth = getAuth(app);

function App() {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleGooglePassword = (e) => {
    e.preventDefault();
    setSuccess(false);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    ) {
      setPassword(
        "Min 8 Letter al least a symobol & upper and lowercase letter and number"
      );
      return;
    }
    setPassword("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        setPassword(error.message);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Email and Password Registation </h2>
      <Form onSubmit={handleGooglePassword}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            required
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            required
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <p className="text-danger">{password}</p>
        {success && <p className="text-success">User Create Success</p>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default App;

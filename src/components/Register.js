import React, {useState} from 'react'
import {Form, Button, Card, Alert} from "react-bootstrap";
import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

function Register() {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerpasswordConfirm, setRegisterPasswordConfirm] = useState("");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const register = async(e) =>{
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)
        }catch (error){
            
            console.log(error.message)
        }
        setError("Failed to create an account");
        setLoading(false)
    }
  return (
    <div>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {/* {currentUser} */}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form  onClick={register}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  required onChange={(event) =>{setRegisterEmail(event.target.value)}}/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"  required required onChange={(event) =>{setRegisterPassword(event.target.value)}}/>
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password"  required onChange={(event) =>{setRegisterPasswordConfirm(event.target.value)}}/>
                    </Form.Group>

                    <Button type="submit"  className="w-100">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? Log in
        </div>
    </div>
  )
}

export default Register
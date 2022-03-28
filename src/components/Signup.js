import React, {useState, useRef} from 'react';
import {Container,Card, Form, Button, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";


function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();

    const {signup} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('password do not match')
        }

        try{
            setError('')
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
            navigate("/dashboard")
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }
  return (
      <>
      <div className='background'>
      <Container className='d-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}>
        <div className='w-100' style={{maxWidth: "500px"}}>
            <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="name" ref={nameRef} required />
                    </Form.Group>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>

                    <Form.Group id="passwordconfirm">
                        <Form.Label>Password Confirm</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>

                    <Button type="submit" className='w-100 Button ' disabled={loading}>Sign up</Button>
                </Form>
            </Card.Body>

        </Card>
        <div className='w-100 text-center mt-2 bottom-text'>
            Already have an account?<Link to="/" className='bottom-link'> Log in </Link>
        </div>
        </div>
      </Container>
      </div>
      
      </>
    
  )
}

export default Signup
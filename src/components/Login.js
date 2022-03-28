import React, {useState, useRef} from 'react';
import {Container,Card, Form, Button, Alert} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";


function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {login} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            setError('')
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/dashboard")
        } catch {
            setError('Failed to login')
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
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>

                    <Button type="submit" className='w-100 Button' disabled={loading}>Log In</Button>
                </Form>
            </Card.Body>

        </Card>
        <div className='w-100 text-center mt-2 bottom-text'>
            Dont have an account? <Link to="/signup" className='bottom-link'>Sign Up</Link> 
        </div>
        </div>
      </Container>
      </div>
      </>
    
  )
}

export default Login
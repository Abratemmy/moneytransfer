import { getAuth } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import {Container,Card, Form, Button, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import app from "../firebase";

function Transaction() {
    const [error, setError] = useState("");
     const {currentUser, logout} = useAuth();

     const [first, setFirst] = useState("USD");
     const [second, setSecond] = useState("EUR");
     const [rate, setRate] = useState([]);
     const [loading, setLoading] = useState(false)

     const [amount, setAmount] = useState(1000)

     const checkAmount= () =>{
         if(amount > 1000){
             setError("You don't have sufficient amount in your wallet")
         }
         else{
             console.log("success")
             setError("")
         }
     }

    async function handleLogout(){
        setError('');
        try{
            await logout();
        }catch{
            setError("failed to log out")
        }
    }
    const getRate = (first, second) => {
        axios({
          method: "GET",
          url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=57d2065a0214b14bc6c9`,
        })
          .then((response) => {
            console.log(response.data);
            try{
                checkAmount()
            }catch{
                console.log("error")
            }
            
            setRate(response.data);
            
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const options = [ "EUR", "NGN", "USD"];
  return (
    <>
        <div className='dashboard-main'>
            <div className='dashboard'>
                <nav className="container">
                    <h1>A<span className="big">T</span><span className='small'>MoneyTransfer</span></h1>
                    <div className='dashboard-mail'>
                        <p>Email: <strong>{currentUser.email}</strong></p>
                        <Button className='button' onClick={handleLogout}>Log Out</Button>
                    </div>
                    
                </nav>
            </div>

            <Container className='d-flex align-items-center justify-content-center' style={{marginTop:"40px"}}>
                <div className='w-100' style={{maxWidth: "600px"}}>
                    <Card>
                        <Card.Body>
                            <p> {error && <Alert variant="danger">{error}</Alert>}</p>
                            <h2 className="text-center mb-4">New Transaction</h2>
                            <div className='row'>
                                <div className='col-6'>
                                    <h6>From : {currentUser.email}</h6>
                                </div>

                                <div className='col-6'>
                                    <h6>To : </h6>
                                </div>
                            </div>

                            <Form.Group id="amount">
                                <Form.Label>Amount to be transferred in Dolla ($) </Form.Label>
                                <Form.Control type="number" required  onChange={(e) => setAmount(e.target.value)}/>
                            </Form.Group>
                         
                            {/* <Form.Group id="amount">
                                <Form.Label>Amount to be transferred </Form.Label>
                                <Form.Control type="text" required  />
                            </Form.Group>
                            <h2 value={first}  onChange={(e) => setFirst(e.target.value)}>USD</h2> */}

                            <Form.Group id="currency">
                                <Form.Label>Currency to be converted into</Form.Label>
                                <select id="template-select" onChange={(e) => setSecond(e.target.value)} value={second}>
                                    {options.map(option=><option key={option}>{option}</option>)}
                                </select>
                            </Form.Group>


                            <Button type="submit" className='w-100 Button 'onClick={()=>{getRate(first, second)}} >Convert</Button>
                            <p> {first} = {amount * rate[`${first}_${second}`] } {second}</p>

                            <div className='surety'>
                                <p>Are you sure you want to send the amount {amount * rate[`${first}_${second}`] } ?</p>
                                <Button style={{marginRight:"20px"}}>YES</Button><Button>NO</Button>
                            </div>
                        </Card.Body>
                    </Card>


                   
              
                </div>
            </Container>
        </div>
    </>
  )
}

export default Transaction
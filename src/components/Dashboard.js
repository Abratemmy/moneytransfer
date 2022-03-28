import React,{useState} from 'react';
import {Button, Alert} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";
import "./dashboard.css"

function Dashboard() {
     const [error, setError] = useState("");
     const {currentUser, logout} = useAuth();
     let navigate = useNavigate();

    async function handleLogout(){
        setError('');
        try{
            await logout();
            navigate("/")
        }catch{
            setError("failed to log out")
        }
    }
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

            <div className='container'>
                {error && <Alert variant="danger">{error}</Alert>}
            </div>

            <div className='dashboard-content'>
                <h1 className='text-center'>Money Transfer Bank</h1>
            </div>

            <div className='transaction-result'>
                 <div className='top'>
                    <h3>Transaction</h3>

                    <div><Link to="/transaction" className='link' >New Transaction</Link></div>
                    
                </div>

                <div className='initial'>You gained <span>$1000 </span>for your initial transaction</div>
                <table>
                
                <tr>
                    <th>ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Currency</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
               
                
                </table>
            </div>
        </div>
      </>
    
  )
}

export default Dashboard
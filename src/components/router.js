import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import Transaction from './Transaction';



const Router = ()=>(
    <Routes>
        <Route exact path ='/moneytransfer' caseSensitive={false} element={<Login/>} />
        <Route exact path ='/signup' caseSensitive={false} element={<Signup/>} />
        <Route exact path ='/dashboard' caseSensitive={false} element={<Dashboard/>} />
        <Route exact path ='/transaction' caseSensitive={false} element={<Transaction/>} />
        
       
    </Routes>
)
export default Router
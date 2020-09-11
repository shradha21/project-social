import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import LoginPage from './LoginPage'
import DashBoard from './DashBoard'


function App(){

    return (
       <BrowserRouter>
            <div>
                <Route path= "/" component= {LoginPage} />
                <Route path= "/dashboard/:id" component= {DashBoard} />
            </div>

       </BrowserRouter>
    )
}

export default App
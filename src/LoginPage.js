import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

 
class LoginPage extends React.Component {
    constructor() {
    super()
    this.state= {
        email: '',
        users: [],
        error_msg: ''
    }
    }


    handleChange=(e)=> {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    

    handleSubmit = (e) => {
        e.preventDefault()
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then((response) => {
            //console.log(response.data)
            const usersData= response.data
            
            const userEmail= usersData.find(ele => ele.email === this.state.email)
            
                if(userEmail){
                    localStorage.setItem('storedId',userEmail.id)
    
                    this.setState({
                        users: userEmail
                    })
                }else if(!this.state.users.includes('@')) {
                    this.setState({
                        error_msg: 'Please enter valid and correct email format'
                    })
                }
            })
        } 
       
        
    render() {
        //console.log(this.state)
        return (
                localStorage.length !== 0 ? (<Redirect to= {`/DashBoard/${localStorage.getItem('storedId')}`} />) :

            <div className= "container-fluid"> 
                <div className= "row"> 
                  <div className= "col-md-4"></div>
                    <div className= "col-md-4">
                        
                    <form className= "form-container"  onSubmit= {this.handleSubmit}>
                    <h3>Login</h3>

                    <div className= "form-group">
                    <input 
                        type= "text" 
                        name= "email" 
                        value= {this.state.email} 
                        onChange= {this.handleChange} 
                        placeholder= "Email"
                    /> <br/>
                    </div>

                    <button type= "submit" className= "btn btn-primary">submit</button>
                    </form>
                   
                    <h3 style= {{color: "red"}}> {this.state.error_msg} </h3> 
                    </div>
                        <div className= "col-md-4"></div>
                    </div> 
            </div>
            
        )
    }
}

export default LoginPage
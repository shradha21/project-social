import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class DashBoard extends React.Component {
    constructor() {
    super()
    this.state= {
        user: {},
        posts: [],
        status: false
    
    }
    }

    componentDidMount() {
        const userId= localStorage.getItem('storedId')
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
            //console.log(response.data)
            const user= response.data        
            this.setState({
                user
            })

        })
        axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)    
        .then((response) => {
           //console.log(response.data)
            const posts= response.data
            this.setState({
                posts
            })
        })
    
    }


    handleClick = () => {
        localStorage.clear()
        this.setState({
            status: true
        })
    }

    render() {
        return (
            <div>
                {this.state.status && <Redirect to= "/"  /> }
                <button className = "btn btn-primary" onClick= {this.handleClick}>Logout</button>

                
                {Object.keys(this.state.user).length !== 0 && (
                <div>    
                    <h3>{this.state.user.name}</h3>
                    <h6>{this.state.user.email}</h6>
                    <h6>{this.state.user.phone}</h6>
                    <h6>{this.state.user.company.name}</h6>
                    <h6>{this.state.user.company.catchPhrase}</h6>
                </div>    
    
                )}
                

                 <ul>
                    {
                        this.state.posts.map((post) => {
                            return (
                                <div>
                                    <li key= {post.id}> {post.title} </li>
                                    <li> {post.body} </li>
                                </div> 
                            )
                        })
                    }
                </ul> 
                
            </div>      
        )
            
    }
}

export default DashBoard
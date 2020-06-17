import React from 'react'
import {connect} from 'react-redux'
import {startRegisteruser} from '../../action/userAction'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })

    }
    handleSubmit=(e)=>{
    e.preventDefault()
    const formData={
        username:this.state.username,
        email:this.state.email,
        password:this.state.password
    }
    const redirect=()=>{
        return this.props.history.push('/login')
    }
    this.props.dispatch(startRegisteruser(formData,redirect))
    this.setState({
        username:'',
        email:'',
        password:''
    })
            
    }
    render(){
        return(
            <div className='box-container'>
                <h1 className='title1'>Register With Us</h1>

                <form  onSubmit={this.handleSubmit}>
                   <label htmlFor='username'>Username:</label> <input
                   className='login-input'
                     type='text' 
                     id='username'
                     name='username'
                     value={this.state.username} 
                     onChange={this.handleChange}/><br/>
                       <label htmlFor='email'>Email:</label> <input
                       className='login-input'
                     type='email' 
                     id='email' 
                     name='email'
                     value={this.state.email} 
                     onChange={this.handleChange}/><br/>
                       <label htmlFor='password'>Password:</label> <input
                       className='login-input'
                     type='password' 
                     id='password' 
                     name='password'
                     value={this.state.password} 
                     onChange={this.handleChange}/><br/>
                     
                     
                    
                    <input className='button' type='submit' value='register'/>
                </form>
            </div>
        )
    }
}
export default connect()( Register)
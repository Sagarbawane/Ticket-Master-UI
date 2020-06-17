import React from 'react'
import {connect} from 'react-redux'
import {startLoginUser} from '../../action/userAction'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
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
        email:this.state.email,
        password:this.state.password
       }
       const redirect=()=>{
        return this.props.history.push('/dashboard')
    }
       this.props.dispatch(startLoginUser(formData,redirect))
    }
    render(){
        return(
            <div className='box-container'>
                <h1 className='title1'>Login </h1>

                <form onSubmit={this.handleSubmit}>
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
                     
                     
                    
                    <input className='button' type='submit' value='login'/>
                </form>
            </div>
        )
    }
}
export default connect()(Login)
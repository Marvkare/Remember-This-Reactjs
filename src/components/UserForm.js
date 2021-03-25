import React, { Component } from 'react'
import axios from 'axios'
import '../index.css'

export default class UserForm extends Component {


    state = {
        username: '',
        email: '',
        password: '',
        signup: this.props.signup,
        hide: 'hide'
    }
    start() {
        if(this.state.signup) return this.state.hide = ''   
    }


    onSubmit = async (e) => {
        e.preventDefault()
        if (this.props.signup) {
            const res = await axios.post('http://localhost:3002/auth/signup', {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password

            })
           
        }
        const res = await axios.post('http://localhost:3002/auth/signin', {
            username: this.state.username,
            password: this.state.password

        })
        
        localStorage.setItem('token', res.data)
        window.location.href = '/templates'
        
        

    }

    onChangeDate = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {

        return (

            <div>
                {this.start()}
                <div className="App">
                    <form onSubmit={this.onSubmit}>
                        <div className={this.state.hide}>
                            <h2>Email:</h2>
                            <input

                                name='email'
                                value={this.state.email}
                                onChange={this.onChangeDate}
                                type='text'

                            />
                        </div>
                        <div>
                            <h2>Username</h2>
                            <input
                                name='username'
                                value={this.state.username}
                                onChange={this.onChangeDate}
                                type='text'

                            />
                        </div>
                        <div>
                            <h2>Password</h2>
                            <input
                                name='password'
                                onChange={this.onChangeDate}
                                value={this.state.password}
                                type='text'
                            />
                        </div>
                        <button > Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

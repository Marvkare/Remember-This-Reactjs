import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Templates extends Component {

    state = {
        templates: [],
        addwords: this.props.addwords
    }

    start(){
        console.log(this.props.addwords)
    }

    async componentDidMount() {
        this.getTemplates()
    }

    async getTemplates (){

        const config = {
            headers:{
                "x-access-token": localStorage.getItem('token')
            }
        }
        const res = await axios.get('http://localhost:3002/templates', config)
        this.setState({templates: res.data})
        
    }

    deleteNote = async (id) =>{
         const config = {
            headers:{
                "x-access-token": localStorage.getItem('token')
            }
        }
        await axios.delete('http://localhost:3002/templates/' + id, config)
    }
    render() {
        return (
            
            <div>
                {this.start}
                {this.state.templates.map(templates =>(
                    <div>
                        <h3>{templates.title}</h3>
                        <p>{templates.description}</p>
                        <div>
                            <p>{templates.wordsR}</p>
                        </div>
                        <Link to={'/addWords/'+ templates._id}>Add Words</Link>
                        <button onClick= {()=> this.deleteNote(templates._id)} >Delete</button>
                    </div>
                ))}
                <Link to={'/addTemplate'}>Add new Template </Link>
            </div>
        )
    }
}

import axios from 'axios'
import React, {useState, Component } from 'react'
import '../index.css'
import { nanoid } from 'nanoid'

export default class TemplateForm extends Component {

    state = {
        title: '',
        description: '',
        wordsR: [],
        wordsL: [],
        wordsLC: [],
        wordsRC: [],
        wordsLE: '',
        wordsRE: '',
        addwords: false,
        hide: 'hide',
        editing: false
    }


    componentDidMount = async () => {

        const config = {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
        if (this.props.match.params.id) {
            this.state.hide = ''
            const res = await axios.get('http://localhost:3002/templates/id/' + this.props.match.params.id, config)
            this.setState({
                title: res.data[0].title,
                description: res.data[0].description,
                wordsR: res.data[0].wordsR,
                wordsL: res.data[0].wordsL,
                editing: true,
            })


        }



    }


    onSubmit = async (e) => {
        e.preventDefault()
        const newTemplate = {
            title: this.state.title,
            description: this.state.description,
            wordsR: this.state.wordsRC.concat(this.state.wordsR),
            wordsL: this.state.wordsLC.concat(this.state.wordsL)
        }
        const config = {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
        if (this.state.editing) {
            await axios.put('http://localhost:3002/templates/' + this.props.match.params.id, newTemplate, config)
        } else {
            await axios.post('http://localhost:3002/templates', newTemplate, config)
        }
        this.componentDidMount()

    }

    onInputChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
    }


    getData = (e) => {
        if (this.state.wordsRE == '' && this.state.wordsLE == '') {
            console.log('words is empty')
        } else {
            this.state.wordsLC.unshift(this.state.wordsLE)
            this.state.wordsRC.unshift(this.state.wordsRE)
            this.state.wordsLE = ''
            this.state.wordsRE = ''
            console.log(this.state.wordsRC + '>' + this.state.wordsLC)
        }


    }
    deleteWords = (e) => {
        console.log(this.state.wordsL, this.state.wordsR)
        this.state.wordsL.splice(e.target.id, 1)
        this.state.wordsR.splice(e.target.id, 1)

        console.log(this.state.wordsL, this.state.wordsR)
    }
    render() {
        return (
            <div>

                <form onSubmit={this.onSubmit}>
                    <div>
                        <p>Title</p>
                        <input

                            name="title"
                            onChange={this.onInputChange}
                            type="text"
                            value={this.state.title}
                            required
                        />
                    </div>
                    <div>
                        <p>Description</p>
                        <input

                            name="description"
                            onChange={this.onInputChange}
                            value={this.state.description}
                            type="text"
                            required />

                    </div>


                    <div>
                        <p>Words Left ←</p>

                        {
                            this.state.wordsL.map((wordsL, i) => (
                                <div>
                                    <p key={nanoid}>{wordsL}</p>

                                </div>


                            ))
                        }


                        <p>Words Rigth → </p>
                        {
                            this.state.wordsR.map((wordsR, i) => (
                                <div>
                                    <p key={i} id={i} onClick={this.deleteWords}>{wordsR} </p>

                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <p>New Words Rigth</p>

                        {
                            this.state.wordsLC.map((wordsLC, i) => (
                                <div>
                                    <p key={nanoid}>{wordsLC}</p>

                                </div>


                            ))
                        }


                        <p>New Words Left</p>
                        {
                            this.state.wordsRC.map((wordsRC, i) => (
                                <div>
                                    <p key={i} id={i} onClick={this.deleteWords}>{wordsRC} </p>

                                </div>
                            ))
                        }
                    </div>
                    <a onClick={this.getData} >addWords</a>
                    <input

                        onChange={this.onInputChange}
                        value={this.state.wordsLE}
                        name="wordsLE"

                    />
                    <input
                        onChange={this.onInputChange}
                        value={this.state.wordsRE}
                        name="wordsRE"


                    />
                    <button  >Create</button>
                </form>

            </div>
        )
    }

}


import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

function TemplateForm() {
    let [params, setParams] = useState(useParams())
    let [title, setTitle] = useState()
    let [description, setDescription] = useState()
    let [newWordL, setNewWordL] = useState()
    let [newWordR, setNewWordR] = useState()
    let [wordsL, setWordsL] = useState([])
    let [wordsR, setWordsR] = useState([])
    let [editing, setEditing] = useState(false)
    let [indice, setIndice] = useState()
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const config = {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
        if (params.id) {
            const res = await axios.get('http://localhost:3002/templates/id/' + params.id, config)
            console.log(res.data[0])
            setTitle(res.data[0].title)
            setDescription(res.data[0].description)
            setWordsL(res.data[0].wordsL)
            setWordsR(res.data[0].wordsR)



        }
    }

    const addWords = (e, i) => {

        if (newWordL === '' || newWordR == '' || newWordL == undefined || newWordR == undefined) {
            console.log('inputs empty')
        } else {
            console.log(editing)
            if (editing) {
                
                const L = wordsL
                const R = wordsR
                L[indice] = newWordL
                R[indice] = newWordR
                setWordsL(L)
                setWordsR(R)
                setNewWordL('')
                setNewWordR('')

            } else {
                setWordsL([...wordsL, newWordL])
                setWordsR([...wordsR, newWordR])
                setNewWordL('')
                setNewWordR('')
            }

        }

    }

    const hadleDeleteWords = (i) => {
        let R = wordsL
        let L = wordsR
        R.splice(i, 1)
        L.splice(i, 1)
        setWordsL(L)
        setWordsL(R)
        setNewWordL('Deleted')
        setNewWordR('Deleted')
        setNewWordL(undefined)
        setNewWordR(undefined)
        console.log('dele')

    }

    const editWords = (i) => {
        setEditing(true)
        setIndice(i)
        console.log(i)
        setNewWordL(wordsL[i])
        setNewWordR(wordsR[i])
        console.log(editing)
    }

    const onInputChange = (e) => {
        if (e.target.name == 'newWordL') setNewWordL(e.target.value)
        if (e.target.name == 'newWordR') setNewWordR(e.target.value)
    }

    const onSubmit = async (e) => {
        //e.preventDefault()

        const newTemplate = {
            title,
            description,
            wordsR,
            wordsL
        }
        console.log(newTemplate)
        const config = {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
        if (params.id) {
            await axios.put('http://localhost:3002/templates/' + params.id, newTemplate, config)
        } else {
            await axios.post('http://localhost:3002/templates', newTemplate, config)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>{title}</h2>
                <p>{description}</p>
                <h3>Words Left</h3>
                {
                    wordsL.map((wordsL, i) => (
                        <div>
                            <p key={i} onClick={() => editWords(i)}>{wordsL}</p>
                        </div>
                    ))
                }
                <h3>Words Rigth</h3>
                {
                    wordsR.map((wordR, i) => (
                        <div>
                            <p key={i}  >{wordR}</p>
                            <a onClick={() => hadleDeleteWords(i)}>X</a>
                            <a onClick={() => editWords(i)}>✏️ </a>
                        </div>
                    ))
                }

                <a onClick={addWords}>addWord</a>
                <input
                    onChange={onInputChange}
                    value={newWordL}
                    name="newWordL"
                    type="text" />
                <input
                    onChange={onInputChange}
                    value={newWordR}
                    name="newWordR"
                    type="text" />
                <button>Save changes</button>
            </form>
        </div>
    )

}



export default TemplateForm;
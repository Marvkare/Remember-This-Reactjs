/**Remember this */
import { Component } from 'react'
import { BrowserRouter as Router, Route, useParams} from 'react-router-dom'
import UserForm from './components/UserForm'
import Templates from './components/Templates'
import TemplateForm from './components/TemplateForm'
import Template from './components/Template.js'
import Index from './components/Index.js'
import './index.css'


function App() {


  return (
    <Router>
      <Route path="/" exact /> 

      <Route path="/signup"> <UserForm signup={true} /></Route>
      <Route path="/signin"> <UserForm /></Route>
      <Route path="/userProfile"> <UserForm /></Route>
      <Route path="/editProfile"> <UserForm /></Route>

      <Route path="/templates"> <Templates /></Route>
      <Route path="/template"> <Template /></Route>
      <Route path="/addTemplate" component={TemplateForm}/> 
      <Route path="/addWords/:id"   render={(props)=> <TemplateForm {...props}/>}/> 
      <Route path="/deleteTemplate"> <Templates /></Route>
      <Route path="/addReader"> <UserForm /></Route>



    </Router>


  );


}

export default App;

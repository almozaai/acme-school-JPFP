import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import School from './School';
import Schools from './Schools';
import Students from './Students';
import Form from './Form';
import store from './store';
import {getSchools} from './store';
import { getStudents } from './store';

const { Component } = React;
const { render } = ReactDOM;


const root = document.getElementById('root');  
class _App extends React.Component{
   async componentDidMount(){
       await this.props.fetchSchools()
       await this.props.fetchStudents()
    }
    render(){
         
        return(
            <HashRouter>
                <Route component= { Nav } />
                <Form />
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route exact path='/schools' component={Schools} />
                    <Route path='/schools/:id'  component={School} />
                    <Route path='/students' component= {Students}/>
                </Switch> 
            </HashRouter>
        )
    }
}

const App = connect(null, (dispatch)=>{
    return {
        fetchSchools: ()=> dispatch(getSchools()),
        fetchStudents: () => dispatch(getStudents())
    }
})(_App)

render(<Provider store={ store }><App /></Provider>, root);
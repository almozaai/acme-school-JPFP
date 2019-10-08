import React from 'react';
import { connect } from 'react-redux';
import { createStudent } from './store';

class _Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        firstName: '',
        lastName: '',
        email: '',
        GPA: ''
    }
    this.create = this.create.bind(this);
    this.handelChange = this.handelChange.bind(this)
     }

    async create(e){ 
        e.preventDefault()
         await this.props.create(this.state)
     }

    handelChange(e){
        
        const schoolId = e.target.options[e.target.selectedIndex].value
        this.setState({...this.state, schoolId: schoolId})
    }

    render(){
        const schools  = this.props.schools;
        const { firstName, lastName, email, GPA, schoolId} = this.state
        return (
        <form onSubmit={(e)=>this.create(e)}>
            First name: <input name="firstName" value={ firstName } onChange={(ev)=> this.setState({ firstName: ev.target.value})} />
            Last name: <input name="lastName" value={ lastName } onChange={(ev)=> this.setState({ lastName: ev.target.value})} />
            Email: <input name="email" value={ email } onChange={(ev)=> this.setState({ email: ev.target.value})} />
            GPA<input name="GPA" value={ GPA } onChange={(ev)=> this.setState({ GPA: ev.target.value*1})} />
            <select className='schoolImage' onChange={(e) => this.handelChange(e)}>
                <option> --No Enrolled-- </option>
                {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                </select>
            <button type="submit" >Save</button>
        </form>
        );
    }
}

const Form = connect(({schools}) =>{
    return{
        schools
    }
} , (dispatch) => {
    return {
        create: (student) => dispatch(createStudent(student))
    };
})(_Form);

export default Form;

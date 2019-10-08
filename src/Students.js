import React from 'react';
import { connect } from 'react-redux';
import { destroyStudent } from './store';

class _Students extends React.Component{
    componentDidMount(){
        this.props.destroy()
    }
    handelChange(e, id){
        if(e.target.options[e.target.selectedIndex].value == ''){
           id = '' 
        }
        id = e.target.options[e.target.selectedIndex].value
    }
    
    render(){
        const { schools, students } = this.props
    return (
        <div>
            <ul>
                {
                    students.map(student => <li key={student.id}><div className='container'>
                    <div className='title'>
                    <h3>{student.firstName} {student.lastName}</h3>
                    </div>
                    <div className='image portrait-crop'>
                        
                    <img src={student.schoolId? schools.find(school => school.id === student.schoolId).imageUrl: ''}/>
                    </div>
                    <div>
                    <h3 className='third'>GPA {student.GPA}</h3>
                    <select className='schoolImage' onChange={(e) => this.handelChange(e, student.schoolId)}>
                    <option value = ''> --No Enrolled-- </option>
                    {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                    </select>
                    <button className="destroy" type='button' onClick={ () => destroy(student)}>Destroy Student</button>
                    </div>
                </div></li>)
                }
            </ul>
        </div>
    )
}
}
const Students = connect(({ schools, students })=>{ 
    return{
        schools,
        students
    }
    }, (dispatch) => {
    return{
        destroy: (student) => dispatch(destroyStudent(student))
    }
    })(_Students)

    export default Students;
import React from 'react';
import { connect } from 'react-redux';
import { destroyStudent, updateStudent } from './store';

class _Students extends React.Component{
    
    handelChange(e, student){
        if(e.target.options[e.target.selectedIndex].value === ''){
            student.schoolId = null;
        }
        else {
            student.schoolId = e.target.options[e.target.selectedIndex].value
        }
        
        console.log('ID', student.schoolId)
        this.props.update(student)

    }
    
    render(){
        const { schools, students } = this.props
        console.log(students, 'sstudents')
    return (
        <div>
            <ul className="grid-cont">
                {
                    students.map(student => <li key={student.id}><div className='container'>
                        <div className="content-wrap">
                    <div className='title'>
                    <h3 key={student.id}>{student.firstName} {student.lastName}</h3>
                    </div>
                    <div className='image portrait-crop'>
                        
                    <img  key={student.id} src={student.schoolId? schools.find(school => school.id === student.schoolId).imageUrl: ''}/>
                    </div>
                    <div>
                    <h6  className='third'>GPA: {student.GPA}</h6>
                    <select className='schoolImage' onChange={(e) => this.handelChange(e, student)}>
                    <option value = '' > --No Enrolled-- </option>
                    {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                    </select>
                    </div>
                    <footer id='footer'>
                    <button  className="destroy" type='button' onClick={ (e) => this.props.destroy(student)}>Destroy Student</button>
                    </footer>
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
        destroy: (student) => dispatch(destroyStudent(student)),
        update: (student) => dispatch(updateStudent(student))
    }
    })(_Students)

    export default Students;
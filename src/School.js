import React from 'react';
import { connect } from 'react-redux';
import { destroyStudent, updateStudent } from './store';

class _School extends React.Component {
    handelChange(e, studentNull){
        
        const id = e.target.options[e.target.selectedIndex].value
        const student = studentNull.find(student => student.id === id)
        console.log('id', id)
        student.schoolId = this.props.match.params.id
        this.props.update(student)
    }

    handelChangeSchool(e, student){
        const schoolId = e.target.options[e.target.selectedIndex].value;
        student.schoolId = schoolId
        this.props.update(student)
    }
    
    render(){
    const { schools, students } = this.props;
    const id = this.props.match.params.id;
    
    const school = schools.find(school => school.id === id);
    const studentsRdeux = students.filter(student => student.schoolId === school.id)
    const studentNull = students.filter(student => student.schoolId === null)
    if(!school){
        return null
    }
     return (
         <div>
        <div>
            <select className='schoolImage' onChange={(e) => this.handelChange(e, studentNull)}>
                <option value = {null}> --No Enrolled-- </option>
                {studentNull.map(student => <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>)}
            </select>
         </div>        
        <div >
            <h2>{school.name}</h2>
            <ul className="grid-cont">
                {
                    studentsRdeux.map(student => <li key={student.id}><div className='container'><div className="content-wrap">
                    <div className='title'>
                    <h3>{student.firstName} {student.lastName}</h3>
                    </div>
                    <div className='image portrait-crop'>
                            <img src={school.imageUrl}/>
                    </div>
                    
                    <h6 className='third' >GPA: {student.GPA}</h6>
                    <select className='schoolImage' onChange={(e) => this.handelChangeSchool(e, student)}>
                    <option value = {null}> --No Enrolled-- </option>
                    {schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)}
                    </select>
                    </div>
                    <footer id='footer'>
                    <button className="destroy" type='button' onClick={ (e) => this.props.destroy(student)}>Destroy Student</button>
                    </footer>
                </div></li>)
                }
            </ul>
        </div>
        </div>
     )
}
}

const School = connect(({ schools, students })=>{
    return{
        schools,
        students
    }
}, (dispatch) => {
    return {
        destroy: (student) => dispatch(destroyStudent(student)),
        update: (student) => dispatch(updateStudent(student))
    }
})(_School)

export default School;
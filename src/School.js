import React from 'react';
import { connect } from 'react-redux';

const _School = ({ schools, match }) => {
    const id = match.params.id;
    const school = schools.find(school => school.id === id);
    
     return (
        <div>
            <h2>{school.name}</h2>
            <ul>
                {
                    school.students.map(student => <li key={student.id}><div className='container'>
                    <div className='title'>
                    <h3 key={student.id}>{student.firstName} {student.lastName}</h3>
                    </div>
                    <div className='image portrait-crop'>
                            <img key={student.id} src={school.imageUrl}/>
                    </div>
                    <div>
                    <h3 className='third' key={student.id}>GPA {student.GPA}</h3>
                    </div>
                </div></li>)
                }
            </ul>
        </div>
     )
}

const School = connect(({ schools })=>{
    return{
        schools
    }
})(_School)

export default School;
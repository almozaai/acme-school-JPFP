import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


const _Schools = ({ schools, students }) => {
        
    return (
        <div className='schools'>
            {schools.map(school => <Link key={school.id} to={`/schools/${school.id}`}><div className='container'>
                    <div className='title'>
                    <h3 key={school.id}>{school.name}</h3>
                    </div>
                    <div className='image portrait-crop'>
                            <img key={school.id} src={school.imageUrl}/>
                    </div>
                    <div>
                    <h3 className='third' key={school.id}>{students.filter(student => student.schoolId === school.id).length}</h3>
                    </div>
                </div></Link>)}
        </div>         
        
    )
};

const Schools = connect(({ schools, students})=>{
    return {
        schools,
        students
    }
})(_Schools)

export default Schools;
import React from 'react';
import {connect} from 'react-redux'
const _Home = ({ schools, students }) => {
    const h = [];
    schools.forEach(school => {
        const U = {}
        const average = students.reduce((acc, el)=>{
            if(el.schoolId === school.id){
                acc = acc + el.GPA/ school.students.length;
            } 
            return acc
        }, 0)
        U.id = school.id;
        U.average = average;
        h.push(U)
    })
    const max = Math.max(...h.map(el => el.average));
    const topSchoolId = h.filter(el => el.average === max)
    const topSchool = schools.filter(el => el.id === topSchoolId[0].id)
    const mostSchool = schools.map(school => {
            return students.filter(student => student.schoolId === school.id)
    })
    
    mostSchool.sort()
    
    const themost = mostSchool[mostSchool.length - 1]
   const mostSchoolname = schools.find(school => {
    return themost.filter(most => most.schoolId === school.id)
})
const theName = mostSchoolname?mostSchoolname.name:''
    return(
        <div className='home'>
            <p>Our most popular school is {topSchool.length?topSchool[0].name:''}</p>
            <p>Our top performing school is {theName} with an average GPA of {max.toFixed(2)}</p>
        </div>
    )
}

const Home = connect(({students, schools}) => {
    return{
        students,
        schools
    }
})(_Home)

export default Home;
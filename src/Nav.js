import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav =  ({ schools, students}) => {
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
    <nav>
        <Link to='/'>Acme School</Link>
        <Link to={ theName? `/schools/${topSchool[0].id}`: '/schools/'}>
        Most Popular  {theName? topSchool[0].name: ''}  ({themost?themost.length:0})
         </Link>
        <Link to={ topSchool.length? `/schools/${topSchool[0].id}`: '/schools/'}>
        Top School {topSchool.length? topSchool[0].name: ''}
         </Link>
        
        <Link to='/schools'>School ({schools.length})</Link>
        <Link to='/students'>Student ({students.length})</Link>
    </nav>
    )
};

const Nav = connect(({ schools, students}) =>{
    return {
        schools,
        students
    }

})(_Nav)

export default Nav;
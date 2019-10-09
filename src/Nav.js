import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav =  ({ schools, students}) => {
    const h = [];
    schools.forEach(school => {
        const U = {}
        const average = school.students.reduce((acc, el)=>{
            acc = acc + el.GPA/ school.students.length;
            return acc
        }, 0)
        U.id = school.id;
        U.average = average;
        h.push(U)
    })
    const max = Math.max(...h.map(el => el.average));
    const topSchoolId = h.filter(el => el.average === max)
    const topSchool = schools.filter(el => el.id === topSchoolId[0].id)
    
    console.log('top school',topSchool)
    
    return(
    <nav>
        
        <Link to={ topSchool.length? `/schools/${topSchool[0].id}`: '/schools/'}>
        Top School {topSchool.length? topSchool[0].name: ''} 
        {/*
            Why get error here and empty erray after click on the link
        */ }
         </Link>
        <Link to='/'>Acme School</Link>
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
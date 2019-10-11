import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunks from 'redux-thunk';
import axios from 'axios';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//constant
const SET_SCHOOL = 'SET_SCHOOL';
const SET_STUDENT = 'SET_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

//actions creator
const setSchool = (schools) => ({ type: SET_SCHOOL, schools })
const setStudents = (students) => ({ type: SET_STUDENT, students });
const _createStudent = (student) => ({ type: CREATE_STUDENT, student });
const _destroyStudent = (student) => ({ type: DESTROY_STUDENT, student });
const _updateStudent = (student) => ({ type: UPDATE_STUDENT, student })

//thunks
const getSchools = () => {
    return async(dispatch) => {
        const schools = (await axios.get('/api/schools')).data;
        return dispatch(setSchool(schools));
    }
}

const getStudents = () => {
    return async(dispatch)=> {
        const students = (await axios.get('/api/students')).data;
        return dispatch(setStudents(students));
    };
};

const createStudent = (student) => {
    return async(dispatch) => {
        const created = (await axios.post('/api/students', student)).data;
        return dispatch(_createStudent(created));
    };
};

const updateStudent = (student) => {
    return async(dispatch) => {
        const updated = (await axios.put(`/api/students/${student.id}`, student)).data;
        return dispatch(_updateStudent(updated))
    }
}

const destroyStudent = (student) => {
    return async(dispatch) => {
        await axios.delete(`/api/students/${student.id}`, student)
        return dispatch(_destroyStudent(student));
    };
};


//store & combineReducers
const store = createStore(
    combineReducers({
        schools: (state = [], action) => {
            if(action.type === SET_SCHOOL){
                return action.schools;
            } 
            return state;
        },
    students: (state = [], action) => {
        if(action.type === SET_STUDENT){
            return action.students
        }
        if(action.type === CREATE_STUDENT){
            return [...state, action.student];
        }
        if(action.type === DESTROY_STUDENT){
            return state.filter(student => student.id !== action.student.id)
        }
        if(action.type === UPDATE_STUDENT){
            return state.map(student => student.id === action.student.id ? action.student: student);
        }
        
        return state
    }
    }), composeEnhancers(
         applyMiddleware(thunks)
        )
)

export default store;

export { getSchools, getStudents, updateStudent, destroyStudent, createStudent }
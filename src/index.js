//constant
const { Component } = React;
const { render } = ReactDOM;
const { HashRouter, Route, Switch, Link } = ReactRouterDOM;
const { createStore, combineReducers, applyMiddleware } = Redux;
const { Provider, connect } = ReactRedux;

const root = document.getElementById('root');


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
    console.log(student)
    return async(dispatch) => {
        const created = (await axios.post('/api/students', student)).data;
        return dispatch(_createStudent(created));
    };
};

const updateStudent = (student) => {
    return async(dispatch) => {
        const updated = (await axios.put(`/api/students/${student.id}`, student)).data;
        return dispatch(_updateStudent(student))
    }
}

const destroyStudent = (student) => {
    return async(dispatch) => {
        await axios.delete(`/api/students/${student.id}`, student)
        return dispatch(_destroyStudent(student));
    };
};


//store
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
            return state.map(student => student.id === action.student.id ? action.student : student);
        }
        return state
    }
    }), applyMiddleware(ReduxThunk.default)
)




//Nav
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
    console.log(topSchool)
    
    return(
    <nav>
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

//Home
const Home = () => {
    return(
        <div className='home'>
            <h2>School and Students</h2>
        </div>
    )
}

//Form
class _Form extends Component{
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


//Schools
const _Schools = ({ schools, students }) => {
    
    return (
        <div className='schools'>
            {schools.map(school => <Link to={`/schools/${school.id}`}><div className='container'>
                    <div className='title'>
                    <h3>{school.name}</h3>
                    </div>
                    <div className='image portrait-crop'>
                            <img src={school.imageUrl}/>
                    </div>
                    <div>
                    <h3 className='third'>{school.students.length}</h3>
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

//School
const _School = ({ schools, match }) => {
    const id = match.params.id;
    const school = schools.find(school => school.id === id);
    
     return (
        <div>
            <h2>{school.name}</h2>
            <ul>
                {
                    school.students.map(student => <li><div className='container'>
                    <div className='title'>
                    <h3>{student.firstName} {student.lastName}</h3>
                    </div>
                    <div className='image portrait-crop'>
                            <img src={school.imageUrl}/>
                    </div>
                    <div>
                    <h3 className='third'>GPA {student.GPA}</h3>
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

//Students
class _Students extends Component{
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
                    students.map(student => <li><div className='container'>
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

//App    
class _App extends Component{
   async componentDidMount(){
       await this.props.fetchSchools()
       await this.props.fetchStudents()
    }
    render(){
         
        return(
            <HashRouter>
                <Route component= { Nav } />
                <Form />
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route exact path='/schools' component={Schools} />
                    <Route path='/schools/:id'  component={School} />
                    <Route path='/students' component= {Students}/>
                    </Switch> 
            </HashRouter>
        )
    }
}

const App = connect(null, (dispatch)=>{
    return {
        fetchSchools: ()=> dispatch(getSchools()),
        fetchStudents: () => dispatch(getStudents())
    }
})(_App)

render(<Provider store={ store }><App /></Provider>, root);
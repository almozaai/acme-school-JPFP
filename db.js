const Sequelize = require('sequelize');
const { STRING, BOOLEAN, UUID, UUIDV4, DECIMAL } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_scholl_JPFP_db');

const uudiDefinition = {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
}

const School = conn.define('school', {
    id: uudiDefinition,
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    imageUrl: {
        type: STRING,
        unique: true,
        validate: {
            isUrl: true
        }
    }
});

const Student = conn.define('student', {
    id: uudiDefinition,
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    GPA: {
        type: DECIMAL,
        allowNull: false
    }
});

Student.belongsTo(School);
School.hasMany(Student);

const mapPromise = (items, model) => Promise.all(items.map(item => model.create(item)));

const syncAndSeed = async() => {
    await conn.sync({ force: true });

    const schools = [
        { name: 'MIT', imageUrl: 'https://bit.ly/30M5div' },
        { name: 'Harvard', imageUrl: 'https://bit.ly/2VdiJu2' },
        { name: 'UCLA', imageUrl: 'https://bit.ly/2nj4TtR' },
        { name: 'CCNY', imageUrl: 'https://bit.ly/2OipRnx' },
        { name: 'Brown', imageUrl: 'https://bit.ly/2AIiC0j' },
        { name: 'Apex Tech', imageUrl: 'https://bit.ly/336horE' },
    ];

    const [MIT, HV, UCLA, CCNY, BRWN, AT] = await mapPromise(schools, School);

    const students = [
        { firstName: 'Saleh', lastName: 'Saeed', email: 's.saeed@harvard.com', GPA: 3, schoolId: HV.id },
        { firstName: 'Shadh', lastName: 'Saleh', email: 's.saleh@mit.com', GPA: 4, schoolId: MIT.id },
        { firstName: 'Rahaf', lastName: 'Saleh', email: 'r.saleh@ucla.com', GPA: 3.5, schoolId: UCLA.id },
        { firstName: 'Rawa', lastName: 'Saleh', email: 'ra.saleh@ccny.com', GPA: 3, schoolId: CCNY.id },
        { firstName: 'Atheer', lastName: 'Saleh', email: 'a.saleh@brown.com', GPA: 3.5, schoolId: BRWN.id },
        { firstName: 'Ahmed', lastName: 'Saleh', email: 'ah.saleh@apextech.com', GPA: 3.5, schoolId: AT.id }
        
    ];

    const [ SalehSaeed, ShahdSaleh, RahafSaleh, RawaSaleh, AtheerSaleh, AhmedSaleh ] = await mapPromise(students, Student)
    
};

module.exports = {
    syncAndSeed,
    models: {
        Student,
        School
    }
}


    
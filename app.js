const express = require('express');
const app = express();
const sequelize = require('./utils/database');

const Users = require('./models/users');
const AboutMe = require('./models/aboutme');
const ContactMe = require('./models/contactme');
const Duties = require('./models/duties');
const TechUsed = require('./models/techused');
const TechnicalSkills = require('./models/technicalSkills');
const Socials = require('./models/socials');
const Projects = require('./models/projects');
const Home = require('./models/home');
const Experience = require('./models/experience');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: 'THIS IS GOING ON',
  });
});

Users.hasOne(Home);
Home.belongsTo(Users);

Users.hasMany(Socials);
Socials.belongsTo(Users);

Users.hasOne(AboutMe);
AboutMe.belongsTo(Users);

Users.hasMany(TechnicalSkills);
TechnicalSkills.belongsTo(Users);

Users.hasMany(Experience);
Experience.belongsTo(Users);

Experience.hasMany(Duties);
Duties.belongsTo(Experience);

Users.hasMany(Projects);
Projects.belongsTo(Users);

Projects.hasMany(TechUsed);
TechUsed.belongsTo(Projects);

Users.hasOne(ContactMe);
ContactMe.belongsTo(Users);

const port = 8000;

sequelize
  .sync()
  // .sync({ force: true })
  .then(results => {
    console.log('CREATED TABLES');

    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });

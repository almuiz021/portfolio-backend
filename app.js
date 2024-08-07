const express = require('express');
const morgan = require('morgan');
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

const userRoutes = require('./routes/users');
const dataRoutes = require('./routes/data');
const CrudRoutes = require('./routes/dataCRUD');

app.use(express.json());
app.use(morgan('dev'));

app.use(async (req, res, next) => {
  try {
    const user = await Users.findByPk(1);
    req.user = user;
  } catch (error) {
    console.log(error);
  }

  next();
});

app.use('/api/test/users', userRoutes);
app.use('/api/test/all', dataRoutes);
app.use('/api/test/add/home', CrudRoutes);

Users.hasOne(Home);
Home.belongsTo(Users);

Home.hasMany(Socials);
Socials.belongsTo(Home);

Users.hasOne(AboutMe);
AboutMe.belongsTo(Users);

AboutMe.hasMany(TechnicalSkills);
TechnicalSkills.belongsTo(AboutMe);

Users.hasMany(Experience);
Experience.belongsTo(Users);

Users.hasMany(Duties);
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
    return Users.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return Users.create({
        first_name: 'Abdulmuiz',
        last_name: 'Ghori',
        username: 'muiz',
        email: 'almuiz@gmail.com',
        password: '123456',
      });
    }
    return user;
  })
  .then(user => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });

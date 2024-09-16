const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());
const sequelize = require('./utils/database');

dotenv.config({ path: './config.env' });

const Users = require('./models/users');
const AboutMe = require('./models/aboutme');
const ContactMe = require('./models/contactme');
const Duties = require('./models/duties');
const TechUsed = require('./models/techused');
const TechnicalSkills = require('./models/technicalskills');
const Socials = require('./models/socials');
const Projects = require('./models/projects');
const Home = require('./models/home');
const Experience = require('./models/experience');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/users');
const dataRoutes = require('./routes/data');
const socialsRoutes = require('./routes/socialsRoutes');
const homeRoutes = require('./routes/homeRoutes');
const aboutMeRoutes = require('./routes/aboutmeRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const expRoutes = require('./routes/experiencesRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/test/auth', authRoutes);
app.use('/api/test/users', userRoutes);
app.use('/api/test/all', dataRoutes);
app.use('/api/test/home', homeRoutes);
app.use('/api/test/socials', socialsRoutes);
app.use('/api/test/aboutme', aboutMeRoutes);
app.use('/api/test/skills', skillsRoutes);
app.use('/api/test/experience', expRoutes);
app.use('/api/test/projects', projectsRoutes);
app.use('/api/test/contactme', contactRoutes);

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
Duties.belongsTo(Users);

Users.hasMany(Projects);
Projects.belongsTo(Users);

Projects.hasMany(TechUsed);
TechUsed.belongsTo(Projects);

Users.hasOne(ContactMe);
ContactMe.belongsTo(Users);

const port = process.env.PORT;

sequelize
  .sync()
  // .sync({ force: true })
  .then(user => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });

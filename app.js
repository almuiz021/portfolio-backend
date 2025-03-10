const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const https = require('https');

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://foliofy.in',
      'https://foliofy.netlify.app',
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

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
const Educations = require('./models/education');
const ContactUs = require('./models/contactUs');

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
const checkCredRoutes = require('./routes/checkCredRoutes');
const educationRoutes = require('./routes/educationRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');

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
app.use('/api/test/education', educationRoutes);
app.use('/api/test/contactme', contactRoutes);
app.use('/api/test/checkcreds', checkCredRoutes);
app.use('/api/test/contactus', contactUsRoutes);

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

Users.hasMany(TechUsed);
Projects.hasMany(TechUsed);
TechUsed.belongsTo(Projects);
TechUsed.belongsTo(Users);

Users.hasMany(Educations);
Educations.belongsTo(Users);

Users.hasOne(ContactMe);
ContactMe.belongsTo(Users);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

const port = process.env.PORT;

sequelize
  // .sync()
  .sync({ alter: true })
  // .sync({ force: true })
  .then(user => {
    console.log('Connected Successfully');
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });

const keepAlive = () => {
  https
    .get(SERVER_URL, res => {
      console.log(`Pinged server. Status code: ${res.statusCode}`);
    })
    .on('error', err => {
      console.error(`Error pinging server: ${err.message}`);
    });
};

const KEEP_ALIVE_INTERVAL = 14 * 60 * 1000;

setInterval(keepAlive, KEEP_ALIVE_INTERVAL);

keepAlive();

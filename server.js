/*
********************************************************************************
*  WEB322 – Assignment 04
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  Name: Marsela Gjeka    Student ID: 153019237  Date: 07/03/2025
*
********************************************************************************/

const express = require('express');
const path = require('path');
const projectData = require('./modules/projects');

const app = express();
const PORT = process.env.PORT || 3000;

// pretty-print JSON 
app.set('json spaces', 2);

// serve everything in /public at the web root
app.use(express.static(path.join(__dirname, 'public')));

// configure EJS
app.set('views',  path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// initialize data and then start listening
projectData.initialize()
  .then(() => {

    // Home
    app.get('/', (req, res) => {
      res.render('home', { page: '/' });
    });

    // About
    app.get('/about', (req, res) => {
      res.render('about', { page: '/about' });
    });

    // Projects list with optional partial‐match filter
    app.get('/solutions/projects', (req, res, next) => {
      const { sector } = req.query;
      projectData.getAllProjects()
        .then(projects => {
          if (sector) {
            const q = sector.toLowerCase();
            projects = projects.filter(p =>
              p.sector.toLowerCase().includes(q)
            );
          }
          // always render (even if projects is empty)
          res.render('projects', {
            page: '/solutions/projects',
            projects
          });
        })
        .catch(next);
    });

    // Single project detail
    app.get('/solutions/projects/:id', (req, res, next) => {
      const id = parseInt(req.params.id, 10);
      projectData.getProjectById(id)
        .then(project => {
          if (!project) {
            const err = new Error(`Project with ID ${id} not found`);
            err.status = 404;
            throw err;
          }
          res.render('project', { project });
        })
        .catch(next);
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).render('404', {
        page: '',
        message: "Sorry, we can't find that page."
      });
    });

    // error handler
    app.use((err, req, res, next) => {
      console.error(err);
      if (err.status === 404) {
        return res.status(404).render('404', {
          page: '',
          message: err.message
        });
      }
      res.status(500).send('Internal Server Error');
    });

    // start server
    app.listen(PORT, () =>
      console.log(`Server listening on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('Failed to initialize project data:', err);
  });

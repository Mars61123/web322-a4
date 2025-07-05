/*
********************************************************************************
*  WEB322 – Assignment 02
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  Name: Marsela Gjeka    Student ID: 153019237  Date: 05/29/2025
*
********************************************************************************/

const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");
let projects = [];

// load and merge project data with sector names
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = projectData.map(proj => {
        const sec = sectorData.find(s => s.id === proj.sector_id);
        return { ...proj, sector: sec ? sec.sector_name : "" };
      });
      resolve();
    } catch {
      reject("Unable to initialize projects");
    }
  });
}

// return all projects
function getAllProjects() {
  return new Promise((resolve, reject) => {
    projects.length ? resolve(projects) : reject("No projects available");
  });
}

// return project by id
function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const proj = projects.find(p => p.id === +id);
    proj ? resolve(proj) : reject("Project not found");
  });
}

// return projects matching sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const list = projects.filter(p => p.sector.toLowerCase().includes(sector.toLowerCase()));
    list.length ? resolve(list) : reject("No projects found for that sector");
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

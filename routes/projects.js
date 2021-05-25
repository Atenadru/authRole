const express = require("express");
const router = express.Router();
const { projects } = require("../data");
const { authUser } = require("../basicAuth");
const {
  canViewProject,
  canDeleteProject,
  scopedProjects,
} = require("../permissions/project");

router.use("/:projectId", setProject, authUser, authDeleteProject);

router.get("/", authUser, (req, res) => {
  res.json(scopedProjects(req.user, projects));
});

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

router.delete("/:projectId", (req, res) => {
  res.send("Deleted Project");
});

/* 
  ? setProject is a middleware that intercepts a request.params.projecId and Through this parameter we look for the project that matches the ID that we intercept and send it again in the req.project to be captured in the VERBS that the middleware implements
*/

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("Project not found");
  }
  next();
}

/* 
? authGetProject is a middleware that intercepts tow request (req.user,req.project) To be passed as arguments to canViewProject, this method tells us if the user has viewing access.
*/

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}
/* 
? authDeleteProject is a middleware that intercepts tow request (req.user,req.project) To pass as arguments to canDeleteProject, this method tells us if the user has delete access.
*/
function authDeleteProject(req, res, next) {
  if (!canDeleteProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

module.exports = router;

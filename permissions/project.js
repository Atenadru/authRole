const { ROLE } = require("../data");

/* 
  ? canViewProject is a method that returns true or false esto lo consigue comparando convinaciones entre las propiedasdes de user, project y el objeto importado ROLE
    project.userid igual a user.id
*/

function canViewProject(user, project) {
  return user.role === ROLE.ADMIN || project.userId === user.id;
}

function scopedProjects(user, projects) {
  if (user.role === ROLE.ADMIN) return projects;
  return projects.filter((project) => project.userId === user.id);
}

function canDeleteProject(user, project) {
  return project.userId === user.id;
}

module.exports = {
  canViewProject,
  scopedProjects,
  canDeleteProject,
};

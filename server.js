const express = require("express");
const app = express();
const { ROLE, users } = require("./data");
const { authUser, authRole } = require("./basicAuth");
const projectRouter = require("./routes/projects");

app.use(express.json());
app.use(setUser);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});

app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

//setUsuer intercepta req.body.userId y busca en la base de datos si un usuarioid coninside con id del req.body.userid de encontrarlo lo setea en el req.user y continua. la existencia de req.user es verificada en el middleware authUser 🎡.
function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}
const port = 3009;
app.listen(port, () => {
  console.log(`listen on localhost:${port}`);
});

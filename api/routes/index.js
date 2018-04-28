
const routes = require('express').Router();


bookRoutes = require("./bookRoutes");
genreRoutes = require("./genreRoutes");
userRoutes = require("./userRoutes");

routes.use("/",bookRoutes);
routes.use("/",genreRoutes);
routes.use("/",userRoutes);


routes.use("/didi", function(req, res) {
    res.status(200).send({url: "didi paaaaageeee"})
});


module.exports = routes;
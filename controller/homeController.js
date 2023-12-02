const express = require("express");
const path = require("path");

const homeController = (req,res) => {
    res.sendFile(path.resolve("fontend","index.html"))
            res.sendFile(path.resolve("fontend","index.html"))

};
modules.exports = homeController;
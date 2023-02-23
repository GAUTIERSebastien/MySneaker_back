const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const middlewareAuth = {
  isLogged(req, res, next) {
    const authHeader = req.headers.token;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        console.log(decoded);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(401).json({ error: 'Token invalide' });
      }
    } else {
      res.status(401).json({ error: 'Token manquant' });
    }
  },
};

module.exports = middlewareAuth;

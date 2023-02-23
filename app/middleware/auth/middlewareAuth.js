const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const middlewareAuth = {
  isLogged(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(401).json({ error: 'Token invalide' });
      }
    } else {
      res.status(401).json({ error: 'Token manquant' });
    }
  },
  isAdmin(req, res, next) {
    const idRole = req.user.id_role;
    if (idRole === 1) {
      next();
    } else {
      res.status(401).send('vous n\'avez pas les droits de réaliser cette action');
    }
  },
};

module.exports = middlewareAuth;

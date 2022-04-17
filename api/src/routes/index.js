const { Router } = require('express');

const videoGames = require('./videogames.js');
const videoGame = require('./videogame.js');
const genres = require('./genres.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/videogames', videoGames);

router.use('/videogame', videoGame);

router.use('/genres', genres);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

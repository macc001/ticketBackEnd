const expres = require("express");
const router = expres.Router();

const usuario = require("../controllers/user.controllers");

router.post("/buscar", usuario.validar_ci);
router.post("/insert", usuario.insert_ticket);
router.post("/login", usuario.login);
router.post("/mostrar", usuario.mostrar);

module.exports = router;

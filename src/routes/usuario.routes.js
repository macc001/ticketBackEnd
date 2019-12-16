const expres = require("express");
const router = expres.Router();

const usuario = require("../controllers/user.controllers");

router.post("/buscar", usuario.validar_ci);
router.post("/insert", usuario.insert_ticket);
// rol 1 admin - rol 0 usuario normal
router.post("/login", usuario.login);
router.post("/mostrar", usuario.mostrar);
// en proceso v2
router.post("/registrar-profesor", usuario.regProfe);
router.post("/entregar-profesor", usuario.entregarProf);
router.post("/cerrar-sesion", usuario.cerrarSesion);

module.exports = router;

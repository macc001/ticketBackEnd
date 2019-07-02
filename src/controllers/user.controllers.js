var mysql = require("mysql");
const globalDB = require("../models/database");

async function validar_ci(req, res) {
  var { ci } = req.body;
  var connection = mysql.createConnection(globalDB);
  connection.connect();
  if (ci) {
    const queryy = "CALL buscar_ticket2(?);";
    await connection.query(queryy, [ci], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(200).send({
          err
        });
      }
    });
  } else {
    res.status(200).send({
      messagge: "complete el campo ci"
    });
  }
  connection.end();
}

async function insert_ticket(req, res) {
  var { id_user, id_ticket } = req.body;
  var connection = mysql.createConnection(globalDB);
  connection.connect();
  if (id_user) {
    if (id_ticket) {
      const queryy = "CALL markar_ticket(?,?);";
      await connection.query(
        queryy,
        [id_user, id_ticket],
        (err, rows, fields) => {
          if (!err) {
            if (rows[0][0].exito === 0) {
              res.json({
                Status: "ticket ya fue agregado",
                ok: false
              });
            } else {
              res.json({
                Status: "ticket agregado exitosamente",
                ok: true
              });
            }
          } else {
            res.status(200).send({
              err
            });
          }
        }
      );
    } else {
      res.status(200).send({
        messagge: "complete el campo id_ticket"
      });
    }
  } else {
    res.status(200).send({
      messagge: "complete el campo id_user"
    });
  }
  connection.end();
}

async function login(req, res) {
  var { user, passw } = req.body;
  var connection = mysql.createConnection(globalDB);
  connection.connect();
  if (user) {
    if (passw) {
      const queryy = "CALL login_usuario(?,?);";
      await connection.query(queryy, [user, passw], (err, rows, fields) => {
        if (!err) {
          if (rows[0][0].exito === 0) {
            res.json({
              ok: false,
              status: "error"
            });
          } else {
            res.json({
              ok: true,
              status: rows[0]
            });
          }
        } else {
          res.status(200).send({
            err
          });
        }
      });
    } else {
      res.status(200).send({
        messagge: "complete el campo password"
      });
    }
  } else {
    res.status(200).send({
      messagge: "complete el campo user"
    });
  }
  connection.end();
}

async function mostrar(req, res) {
  var { id_user } = req.body;
  var connection = mysql.createConnection(globalDB);
  connection.connect();
  if (id_user) {
    const queryy = "CALL lista_cant(?);";
    await connection.query(queryy, [id_user], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.status(200).send({
          err
        });
      }
    });
  } else {
    res.status(200).send({
      messagge: "complete el campo id_user"
    });
  }
  connection.end();
}

module.exports = { validar_ci, insert_ticket, login, mostrar };

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

async function regProfe(req, res) {
  var { item, ci, nombre, sie, colegio, distrito } = req.body;
  var connection = mysql.createConnection(globalDB);
  connection.connect();
  if (item) {
    if (ci) {
      if (nombre) {
        if (sie) {
          if (colegio) {
            if (distrito) {
              const queryy = "CALL insertar_profesor(?,?,?,?,?,?);";
              await connection.query(
                queryy,
                [item, ci, nombre, sie, colegio, distrito],
                (err, rows, fields) => {
                  // si no hay fila insertada mostrar mensaje de error
                  if (!err) {
                    res.json(rows[0]);
                  } else {
                    res.status(200).send({
                      err
                    });
                  }
                }
              );
            } else {
              res.status(200).send({
                messagge: "complete el campo distrito"
              });
            }
          } else {
            res.status(200).send({
              messagge: "complete el campo colegio"
            });
          }
        } else {
          res.status(200).send({
            messagge: "complete el campo sie"
          });
        }
      } else {
        res.status(200).send({
          messagge: "complete el campo nombre"
        });
      }
    } else {
      res.status(200).send({
        messagge: "complete el campo ci"
      });
    }
  } else {
    res.status(200).send({
      messagge: "complete el campo item"
    });
  }
  connection.end();
}

async function entregarProf(req, res) {
  var { ci, observacion } = req.body;
  var connection = mysql.createConnection(globalDB);
  connection.connect();
  if (ci) {
    if (observacion) {
      const queryy = "CALL Actualizar_Observacion(?,?);";
      await connection.query(queryy, [ci, observacion], (err, rows, fields) => {
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
        messagge: "complete el campo observacion"
      });
    }
  } else {
    res.status(200).send({
      messagge: "complete el campo ci"
    });
  }
  connection.end();
}

module.exports = {
  validar_ci,
  insert_ticket,
  login,
  mostrar,
  regProfe,
  entregarProf
};

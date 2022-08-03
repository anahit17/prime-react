const { Client } = require("../model/Client");
class ClientController {
  static async getClients(req, res) {
    const clients = await Client.findAll();
    res.send({ clients });
  }

  static async addNewClient(req, res) {
    await Client.create({ ...req.body });
    res.redirect("/getClients");
  }

  static async destroyClient(req, res) {
    await Client.destroy({ where: { id: req.params.id } });
    res.send("deleted");
  }

  static async editClient(req, res) {
    await Client.update({ ...req.body }, { where: { id: req.params.id } });
    res.send("updated");
  }
}
module.exports = ClientController;

const { Supplier } = require("../model/Supplier");
class SupplierController {
  static async getSuppliers(req, res) {
    const suppliers = await Supplier.findAll();
    res.send({ suppliers });
  }

  static async addNewSupplier(req, res) {
    await Supplier.create({ ...req.body });
    res.redirect("/getSuppliers");
  }

  static async destroySupplier(req, res) {
    await Supplier.destroy({ where: { id: req.params.id } });
    res.send("deleted");
  }

  static async editSupplier(req, res) {
    await Supplier.update({ ...req.body }, { where: { id: req.params.id } });
    res.send("updated");
  }
}
module.exports = SupplierController;

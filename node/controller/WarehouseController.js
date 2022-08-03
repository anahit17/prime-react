const { Warehouse } = require("../model/Warehouse");
class WarehouseController {
  static async getWarehouse(req, res) {
    const warehouse = await Warehouse.findAll();
    res.send({ warehouse });
  }

  static async addNewWarehouse(req, res) {
    let cloneData = {
      ...req.body,
      FacId: JSON.stringify(req.body.FacId)
    };
    await Warehouse.create({ ...cloneData });
    res.redirect("/getWarehouse");
  }

  static async destroyWarehouse(req, res) {
    await Warehouse.destroy({ where: { id: req.params.id } });
    res.send("deleted");
  }

  static async editWarehouse(req, res) {
    await Warehouse.update({ ...req.body }, { where: { id: req.params.id } });
    res.send("updated");
  }
}
module.exports = WarehouseController;

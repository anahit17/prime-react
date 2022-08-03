const { StorageLocation } = require("../model/StorageLocation");

class StorageLocationController {
  static async getStorageLocation(req, res) {
    const storageLocation = await StorageLocation.findAll();
    res.send({ storageLocation });
  }

  static async addNewStorageLocation(req, res) {
    let cloneData = {...req.body, FacId: JSON.stringify(req.body.FacId)}
    await StorageLocation.create({ ...cloneData });
    res.redirect("/getStorageLocation");
  }

  static async destroyStorageLocation(req, res) {
    await StorageLocation.destroy({ where: { id: req.params.id } });
    res.send("deleted");
  }

  static async editStorageLocation(req, res) {
    await StorageLocation.update({ ...req.body }, { where: { id: req.params.id } });
    res.send("updated");
  }
}
module.exports = StorageLocationController;

const { Customer } = require("../model/Customer");
class CustomerController {
  static async getCustomers(req, res) {
    const customers = await Customer.findAll();
    res.send({ customers });
  }

  static async addNewCustomer(req, res) {
    await Customer.create({ ...req.body });  
    res.redirect("/getCustomers");
  }

  static async destroyCustomer(req, res) {
    await Customer.destroy({ where: { id: req.params.id } });
    res.send("deleted");
  }

  static async editCustomer(req, res) {
    await Customer.update({ ...req.body }, { where: { id: req.params.id } });
    res.send("updated");
  }
}
module.exports = CustomerController;

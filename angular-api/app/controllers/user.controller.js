const { mongo } = require('mongoose');
const db = require('../models');
const Contact = db.contact;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

// CRUD
exports.userBoard = async (req, res) => {
  let contacts = await Contact.find({});
  if (contacts.length != 0) {
    res.status(200).send(contacts);
  } else {
    res.status(200).send({ message: "Contacts doesn't created yet" });
  }
};

exports.userBoardAdd = (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
  });

  contact.save((err, contact) => {
    if (err) {
      console.error(err);
      return
    } else {
      res.status(200).send({ message: "Contact was created succesfully" });
    }
  })
}

exports.userBoardDelete = async (req, res) => {
  let userId = req.params.id;
  let deletedRes = await Contact.deleteOne({ _id: new mongo.ObjectID(userId) });

  if (deletedRes.deletedCount === 1) {
    res.status(200).send({ message: "User was deleted successfuly" });
  }
}

exports.userBoardPut = async (req, res) => {
  let userId = req.body.id;
  let name = req.body.name;
  let phone = req.body.phone;

  updatedFields = { $set: { name, phone } }
  await Contact.updateOne({ _id: new mongo.ObjectID(userId) }, updatedFields, (err, res) => {
    if (err) throw err
  })
  res.status(200).send({ message: "Phone was successfuly updated" });
}
// ..CRUD

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

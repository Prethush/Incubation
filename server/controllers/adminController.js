const asyncHanler = require("express-async-handler");
const User = require("../models/User");
const Form = require("../models/ApplicationForm");
const router = require("../routes/admin");
const Slot = require("../models/Slot");

// get all forms
const getAllForms = asyncHanler(async (req, res, next) => {
  if (req.user) {
    const forms = await Form.find({});
    res.status(200).json(forms);
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this page");
  }
});

// change state to pending
const changeToPending = asyncHanler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    const { id } = req.params;
    const form = await Form.findByIdAndUpdate(id, {
      $set: { status: "pending" },
    });
    const forms = await Form.find({});
    res.status(200).json(forms);
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this page");
  }
});

// change state to approved
const changeToApproved = asyncHanler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    const { id } = req.params;
    const form = await Form.findByIdAndUpdate(id, {
      $set: { status: "approved" },
    });
    const forms = await Form.find({});
    res.status(200).json(forms);
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this page");
  }
});

// change state to declined
const changeToDeclined = asyncHanler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    const { id } = req.params;
    const form = await Form.findByIdAndUpdate(id, {
      $set: { status: "declined" },
    });
    const forms = await Form.find({});
    res.status(200).json(forms);
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this page");
  }
});

// view all slots
const displayAllSlots = asyncHanler(async (req, res, next) => {
  if (req.user) {
    const slots = await Slot.find({});
    res.status(200).json(slots);
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this page");
  }
});

// book slot
const bookSlot = asyncHanler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    const { formId, slotId } = req.body;
    const form = await Form.findByIdAndUpdate(formId, {
      $set: { isSlotSelected: true },
    });
    const slot = await Slot.findByIdAndUpdate(slotId, {
      $set: {
        isBooked: true,
        companyName: form.companyname,
        companyId: form._id,
        companyEmail: form.email,
      },
    });
    const slots = await Slot.find({});
    res.status(200).json(slots);
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this page");
  }
});
module.exports = {
  getAllForms,
  changeToPending,
  changeToApproved,
  changeToDeclined,
  displayAllSlots,
  bookSlot,
};

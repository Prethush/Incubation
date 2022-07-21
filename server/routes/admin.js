const express = require("express");
const router = express.Router();
const {
  createForm,
  getAllForms,
  changeToPending,
  changeToApproved,
  changeToDeclined,
  displayAllSlots,
  bookSlot,
} = require("../controllers/adminController");
const { verifyToken } = require("../middleware/auth");

// get all forms
router.get("/all-forms", verifyToken, getAllForms);
// change to pending state
router.put("/form/update-pending/:id", verifyToken, changeToPending);
// change to pending state
router.put("/form/update-approved/:id", verifyToken, changeToApproved);
// change to declined state
router.delete("/form/update-declined/:id", verifyToken, changeToDeclined);
// display all slots
router.get("/slots", verifyToken, displayAllSlots);
// book slot
router.put("/book-slot", verifyToken, bookSlot);
module.exports = router;

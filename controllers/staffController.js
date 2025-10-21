import Staff from "../models/Staff.js";
import multer from "multer";

// 🗂️ Multer Setup
const storage = multer.memoryStorage();
export const upload = multer({ storage }).single("photo");

// 🟢 GET all residents
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (err) {
    console.error("❌ Error fetching staff:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 GET single resident
export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: "Resident not found" });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 POST - Create new resident
export const createStaff = async (req, res) => {
  try {
    const {
      name,
      room,
      bedNumber,
      careLevel,
      pain,
      nutrition,
      mobility,
      elimination,
      medication,
      urination,
      general,
    } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    let photo = null;
    if (req.file) {
      photo = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const staff = await Staff.create({
      name,
      room,
      bedNumber,
      careLevel,
      pain: pain ? [pain] : [],
      nutrition: nutrition ? [nutrition] : [],
      mobility: mobility ? [mobility] : [],
      elimination: elimination ? [elimination] : [],
      medication: medication ? [medication] : [],
      urination: urination ? [urination] : [],
      general: general ? [general] : [],
      photo,
    });

    res.status(201).json({ message: "Resident created successfully ✅", staff });
  } catch (err) {
    console.error("❌ Error creating resident:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 PUT - Update resident info
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStaff) return res.status(404).json({ error: "Resident not found" });

    res.json({ message: "Resident updated successfully 🎯", staff: updatedStaff });
  } catch (err) {
    console.error("❌ Error updating resident:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟢 PUT - Add new entry to any category (supports text + object)
export const updateStaffCategory = async (req, res) => {
  const { id, categoryName } = req.params;
  const { entry, notes } = req.body;

  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: "Resident not found" });

    const validCategories = [
      "pain",
      "nutrition",
      "mobility",
      "elimination",
      "medication",
      "urination",
      "general", // ✅ Added
    ];

    if (!validCategories.includes(categoryName)) {
      return res.status(400).json({ error: "Invalid category name" });
    }

    // ✅ For object-based categories
    if (["mobility", "elimination", "general"].includes(categoryName)) {
      if (!entry || typeof entry !== "object") {
        return res.status(400).json({ error: `Invalid ${categoryName} entry` });
      }
      staff[categoryName].push(entry);
    }
    // ✅ For text-based categories
    else if (categoryName === "nutrition") {
      staff.nutrition.push(notes || "—");
    } else {
      staff[categoryName].push(notes || "—");
    }

    await staff.save();
    res.json({ message: "Entry added successfully ✅", staff });
  } catch (err) {
    console.error("❌ Error updating category:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔴 DELETE elimination entry
export const deleteEliminationEntry = async (req, res) => {
  const { id, entryId } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: "Resident not found" });
    staff.elimination = staff.elimination.filter(
      (item) => item._id.toString() !== entryId
    );
    await staff.save();
    res.json({ message: "Elimination entry deleted 🗑️", staff });
  } catch (err) {
    console.error("❌ Error deleting elimination entry:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔴 DELETE mobility entry
export const deleteMobilityEntry = async (req, res) => {
  const { id, entryId } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: "Resident not found" });
    staff.mobility = staff.mobility.filter(
      (item) => item._id.toString() !== entryId
    );
    await staff.save();
    res.json({ message: "Mobility entry deleted 🗑️", staff });
  } catch (err) {
    console.error("❌ Error deleting mobility entry:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔴 DELETE general entry
export const deleteGeneralEntry = async (req, res) => {
  const { id, entryId } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ error: "Resident not found" });
    staff.general = staff.general.filter(
      (item) => item._id.toString() !== entryId
    );
    await staff.save();
    res.json({ message: "General entry deleted 🗑️", staff });
  } catch (err) {
    console.error("❌ Error deleting general entry:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔴 DELETE - Resident
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Staff.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Resident not found" });
    res.json({ message: "Resident deleted successfully 🗑️" });
  } catch (err) {
    console.error("❌ Error deleting resident:", err);
    res.status(500).json({ error: err.message });
  }
};

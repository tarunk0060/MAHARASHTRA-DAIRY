import Contact from "../models/Contact.js";

export const getAllContacts = async (req, res) => {
  const { search, resolved } = req.query;

  try {
    const filter = {};
    if (resolved !== undefined) {
      filter.isResolved = resolved === "true";
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch contacts", error: err.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Mark as read
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch contact", error: err.message });
  }
};

export const updateContact = async (req, res) => {
  const { isRead, isResolved } = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        isRead: isRead !== undefined ? isRead : undefined,
        isResolved: isResolved !== undefined ? isResolved : undefined,
      },
      { new: true, omitUndefined: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Could not update contact", error: err.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete contact", error: err.message });
  }
};

export const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ isRead: { $ne: true } });
    const unresolved = await Contact.countDocuments({ isResolved: { $ne: true } });

    res.json({
      totalEnquiries: total,
      newEnquiries: unread,
      unresolvedEnquiries: unresolved,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch stats", error: err.message });
  }
};

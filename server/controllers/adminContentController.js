import SiteContent from "../models/SiteContent.js";

export const getContentBySection = async (req, res) => {
  const { section } = req.params;

  if (!["home", "about", "quality", "contact"].includes(section)) {
    return res.status(400).json({ message: "Invalid section" });
  }

  try {
    let content = await SiteContent.findOne({ section });
    if (!content) {
      content = { section, content: "", lastUpdatedBy: null };
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch content", error: err.message });
  }
};

export const getAllContent = async (req, res) => {
  try {
    const contents = await SiteContent.find();
    const sections = ["home", "about", "quality", "contact"];

    const result = sections.map((section) => {
      const found = contents.find((c) => c.section === section);
      return found || { section, content: "", lastUpdatedBy: null };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch content", error: err.message });
  }
};

export const updateContent = async (req, res) => {
  const { section } = req.params;
  const { content } = req.body;

  if (!["home", "about", "quality", "contact"].includes(section)) {
    return res.status(400).json({ message: "Invalid section" });
  }

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    let siteContent = await SiteContent.findOne({ section });

    if (siteContent) {
      siteContent.content = content;
      siteContent.lastUpdatedBy = req.adminEmail;
      siteContent.updatedAt = new Date();
    } else {
      siteContent = new SiteContent({
        section,
        content,
        lastUpdatedBy: req.adminEmail,
      });
    }

    await siteContent.save();
    res.json(siteContent);
  } catch (err) {
    res.status(500).json({ message: "Could not update content", error: err.message });
  }
};

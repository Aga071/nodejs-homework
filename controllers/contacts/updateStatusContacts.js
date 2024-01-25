import { updateStatusContact } from "../../models/contacts.js";

const patchContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const body = { favorite };
    if (body) {
      const renameContact = await updateStatusContact(contactId, body);
      return res.status(200).json({ status: 200, message: renameContact });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "missing field favorite" });
    }
  } catch (err) {}
};
export { patchContact };

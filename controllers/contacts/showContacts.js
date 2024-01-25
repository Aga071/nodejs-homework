import { getContactById } from "../../models/contacts.js";

const getContact = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
   return res.json({ status: 200, data: contact });
  } else {
   return res.status(404).json({ status: 404, message: "Not found" });
  }
};
export { getContact };

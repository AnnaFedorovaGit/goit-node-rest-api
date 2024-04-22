import Contact from "../models/Contact.js";


export const listContacts = (filter ={}, setting = {}) => Contact.find(filter, "-createdAt -updatedAt", setting).populate("owner", "username email")


export const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact || null;
}

export const removeContact = (contactId) => {
    return Contact.findByIdAndDelete(contactId);
}

export const addContact = ({ name, email, phone }) => { 
    return Contact.create({ name, email, phone });
}

export const updateContact = (contactId, body) => {
    return Contact.findByIdAndUpdate(contactId, body);
}

export const updateStatusContact = (contactId, body) => {
    return Contact.findByIdAndUpdate(contactId, body);
}

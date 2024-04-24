import Contact from "../models/Contact.js";


export const listContacts = (filter ={}, setting = {}) => Contact.find(filter, "-createdAt -updatedAt", setting).populate("owner", "username email")


export const getContactById = async (filter) => {
    const contact = await Contact.findOne(filter);
    return contact || null;
}

export const removeContact = (filter) => {
    return Contact.findOneAndDelete(filter);
}

export const addContact = ({ name, email, phone, owner }) => { 
    return Contact.create({ name, email, phone, owner });
}

export const updateContact = (filter, body) => {
    return Contact.findOneAndUpdate(filter, body);
}

export const updateStatusContact = (filter, body) => {
    return Contact.findByIdAndUpdate(filter, body);
}

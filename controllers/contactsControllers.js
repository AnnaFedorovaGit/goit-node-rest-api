import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";


const getAllContacts = async (req, res, next) => { 
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit; 
    const result = await contactsService.listContacts({ owner }, {skip, limit}); 
    res.status(200).json(result);
}

const getOneContact = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.getContactById({ owner, _id: id });
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsService.removeContact({owner, _id: id});
    if (!result) { 
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
};
 
const createContact = async (req, res, next) => {
    const { _id: owner } = req.user;
    const result = await contactsService.addContact({ ...req.body, owner }); 

    res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
    if (!req.body || !Object.keys(req.body).length ) { 
        throw HttpError(400, "Body must have at least one field");
    }

    const { id } = req.params; 
    const result = await contactsService.updateContact({owner, _id: id}, req.body);
    if (!result) { 
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await contactsService.updateStatusContact({ owner, _id: id }, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
};


export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}

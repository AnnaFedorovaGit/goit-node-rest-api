import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res, next) => { 
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit; 
        const result = await contactsService.listContacts(owner, {skip, limit}); 
        res.status(200).json(result);
    }
    catch(error) { 
        next(error);
    }
}

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id); 
        if (!result) { 
            throw HttpError(404, "Not found");
        }

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const result = await contactsService.addContact(...req.body, owner); 
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        if (!req.body || !Object.keys(req.body).length ) { 
            throw HttpError(400, "Body must have at least one field");
        }

        const { id } = req.params; 
        const result = await contactsService.updateContact(id, req.body); 
        if (!result) { 
            throw HttpError(404, "Not found");
        }

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};

export const updateStatusContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.updateStatusContact(id, req.body); 
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};

import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";


export const getAllContacts = async (req, res, next) => { 
    try {
        const result = await contactsService.listContacts(); 

        res.status(200).json(result);
    }
    catch(error) { 
        next(error);
        // const { status = 500, message = "Server error" } = error;
        // res.status(status).json({
        //     message: "Server error",
        // });
    }
}

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id); 
        if (!result) { 
            throw HttpError(404, "Not found");
            // return res.status(404).json({
            //     message: "Not found",
            // })
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
        const { error } = createContactSchema.validate(req.body); 
        console.log(error);
        if (error) { 
            throw HttpError(404, error.message);
        }

        const result = await contactsService.addContact(req.body); 
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res) => {
    try {
        const { error } = updateContactSchema.validate(req.body); 
        if (error) { 
            throw HttpError(404, error.message);
        }

        const { id } = req.params; 
        const result = await contactsService.updateContact(id, req.body); 
        if (!result) { 
            throw HttpError(404, error.message);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

import {Request,Response} from 'express';
import {validationResult} from 'express-validator';
import slug from 'slug';
import User from "../models/User";
import { hashPassword } from '../utils/auth';

export const createAccount = async (req: Request, resp: Response)=>{


    //Manejar errores
    let errors = validationResult(req);
    if(!errors.isEmpty())
    {
        resp.status(400).json({errors:errors.array()});
        return;
    }

    const {email,password} = req.body;

    const userExists = await User.findOne({
        email: email
    });


    if(userExists)
    {
        const error = new Error("Un usuario con ese email ya esta registrado");
        resp.status(409).json({error: error.message});
        return;
    }

    const handle = slug(req.body.handle,"");
    const handleExist = await User.findOne({
        handle: handle
    });

    if(handleExist)
    {
        const error = new Error("Nombre de usuario no disponible");
        resp.status(409).json({error:error.message});
        return;
    }

    //Primera forma de crear un usuario
    // await User.create(req.body);

    //Segunda forma de crear un usuario
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();

    //resp.render();// Renderizar una vista
    resp.status(201).send("Registro Creado Correctamente.");//Envia datos a la pantalla
    // resp.json();//Envia un JSON a la pantalla

};


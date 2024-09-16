// create a new router

import { Router } from 'express';
import type { City, Company, Entry, Member, Team } from '@prisma/client'

import { PrismaFunctions } from './prismaFunctions';
import { client } from './prismaFunctions';
import { checkForUndefinedOrExit } from './utilityFunctions';

export const prismaRoutes = Router();

prismaRoutes.get('/prisma', async (req, res) => {
    res.json({
        message: "Prisma API is online!",
    })
})

// create a new city and return the id
// prismaRoutes.post('/city/create', async (req, res) => {
//     const id = await PrismaFunctions.entryExists(client.city, {name: req.body.name});
//     if (id !== -1) {
//         res.json({
//             message: "City already exists!",
//             id
//         })
//     } else {
//         const city = await PrismaFunctions.createCityEntry(req.body.name);
//         res.json({
//             message: "City created!",
//             city
//         })
//     }
// })

// create a new city or / and return the id
// Header: none (but has to get one in the future)
// Body: city, create



prismaRoutes.post('/city/create', async (req, res) => {
    req.body.city
    PrismaFunctioncheckForUndefinedOrExit(req.body, "city")
    PrismaFunctions.getCreateID("city", )
})

// disable in production
prismaRoutes.post('/id', async (req, res) => {
    const id = await PrismaFunctions.entryExists(client[req.body.table], req.body.data);
    res.json({
        id
    })
})

// register a new user
prismaRoutes.post('/register', async (req, res) => {
    const id = await PrismaFunctions.getCreateID("member", req.body.data);
    // a member needs a name a password 
    res.json({
        id
    })
})

// login a user
prismaRoutes.post('/login', async (req, res) => {
    const id = await PrismaFunctions.getCreateID(client[req.body.table], req.body.data);
    res.json({
        id
    })
})


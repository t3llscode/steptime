// create a new router

import { Router } from 'express';
import type { City, Company, Entry, Member, Team } from '@prisma/client'

import { PrismaFunctions } from './prismaFunctions';
import { client } from './prismaFunctions';

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

// disable in production
prismaRoutes.post('/id', async (req, res) => {
    const id = await PrismaFunctions.entryExists(client[req.body.table], req.body.data);
    res.json({
        id
    })
})
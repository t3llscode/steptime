// \\\\\\\\\\ Import & Export ////////// \\

import { Router } from 'express';
import type { City, Company, Entry, Member, Team } from '@prisma/client'

import { PrismaFunctions, client } from './prismaFunctions';
import * as erxuit from "./exitUtility"

export const prismaRoutes = Router();

// \\\\\\\\\\ Routes ////////// \\

prismaRoutes.get('/prisma', async (req, res) => {
    res.json({
        message: "Prisma API is online!",
    })
})

// create a new city or / and return the id
// Header: none (but has to get one in the future)
// Body: city, create
prismaRoutes.post('/city/create', async (req, res) => {
    try {
        erxuit.checkForUndefinedOrExit(req.body, ["name"], 1)
        const id = await PrismaFunctions.entryExists(client.city, {name: req.body.name});
        if (id !== -1) {
            erxuit.returnOrExit({error: false}, {id}, 0, 200, "City already exists!", [])
        } else {
            const id = await PrismaFunctions.getCreateID(client.city, {name: req.body.name});
            erxuit.returnOrExit({error: false}, {id}, 0, 200, "City created!", [])
        }
    } catch (err) {
        erxuit.catchExit(res, req.path, err, {})
    }
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


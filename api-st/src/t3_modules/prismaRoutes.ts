// \\\\\\\\\\ Import & Export ////////// \\

import { Router } from 'express';
import type { City, Company, Entry, Member, Team } from '@prisma/client'

import { PrismaUtility, PrismaErxuitUtility, client } from './prismaUtility';
import * as erxuit from "./exitUtility"

export const prismaRoutes = Router();

// \\\\\\\\\\ Routes ////////// \\

prismaRoutes.get('/prisma', async (req, res) => {
    res.json({
        message: "Prisma API is online!",
    })
})

prismaRoutes.post('/city/create', async (req, res) => {
    try {
        await PrismaErxuitUtility.universalCreate(req.body, "city", ["name"]);
    } catch (err) {
        erxuit.catchExit(res, req.path, err, {})
    }
})





// name, hash, joined

// hash = hash(code + joined)
// joined 
prismaRoutes.post('/team/create', async (req, res) => {
    try {
        await PrismaErxuitUtility.universalCreate(req.body, "team", ["name", "hash", "joined"], 1, ["name"]);
    } catch (err) {
        erxuit.catchExit(res, req.path, err, {})
    }
})


// create member and join team
// hash = hash(code * joined)
// member = team.uuid, name (code <> name), joined, pin (code <> pin)
prismaRoutes.post('/member/create', async (req, res) => {
    try {
        await PrismaErxuitUtility.universalCreate(req.body, "member", ["name", "hash", "joined"], 1, ["name"]);
    } catch (err) {
        erxuit.catchExit(res, req.path, err, {})
    }
})

prismaRoutes.post('/team/join', async (req, res) => {

})

// /team/login
// TEAM: name, hash (code * joined)
// MEMBER: name, pin (code * pin)
prismaRoutes.post('/team/login', async (req, res) => {

})




// get join date of a team by name
prismaRoutes.get("/team/joined/:name", async (req, res) => {
    // const { name } = req.params;
    // try {
    //     const team = await client.team.findUnique({
    //         where: { name },
    //         select: { joined: true }
    //     });
    //     if (team) {
    //         res.json({ joined: team.joined });
    //     } else {
    //         res.status(404).json({ error: "Team not found" });
    //     }
    // } catch (err) {
    //     erxuit.catchExit(res, req.path, err, {});
    // }
});




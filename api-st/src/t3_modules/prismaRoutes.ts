// create a new router

import { Router } from 'express';

import { PrismaFunctions } from './prismaFunctions';

export const prismaRoutes = Router();

prismaRoutes.get('/prisma', async (req, res) => {
    res.json({
        error: false,
        message: "Prisma!",
        cities: await PrismaFunctions.getAllCityEntriesList()
    })
})
// create a new router

import { Router } from 'express';

import { PrismaFunctions } from './prismaFunctions';

export const prismaRoutes = Router();

prismaRoutes.get('/prisma', (req, res) => {
    res.json({
        error: false,
        message: "Prisma!",
        cities: PrismaFunctions.getAllCityEntries()
    })
})
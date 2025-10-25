import express from 'express'
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors ({
    origin: ['http://localhost:5173', 'http://localhost:5174']

}))

const prisma = new PrismaClient();


const PORT = process.env.PORT || 3001;





app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
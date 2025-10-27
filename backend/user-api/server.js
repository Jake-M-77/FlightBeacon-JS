import express from 'express'
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors ({
    origin: ['http://localhost:5173', 'http://localhost:5174']

}))

const prisma = new PrismaClient();




app.post('/api/signup', async (req, res) => {

    const existingUser = await prisma.users.findUnique({
        where: { username: req.body.username}
    });

    if(existingUser) {
        return res.status(400).json({ error: 'Username taken'})
    }

    const user = await prisma.users.create({ 
        data: {
            username: req.body.username,
            password: req.body.password,
            
            

        }
    });

    res.json(user)
})


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({
        where: { username }
    });

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    if (user.password !== password) {
        return res.status(401).json( {error: 'Invalid password' });
    }

    res.json({ message: 'Login successful', user });
});

app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const user = await prisma.users.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                username: true,
                clientId: true,
                clientSecret: true
            }
        });

        if(!user) {
            return res.status(404).json({ error: 'User not found' })
        };

        res.json(user);
    }catch (err) {
        res.status(500).json({ error: 'Server error' })
    }
});


app.put('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    const { clientId, clientSecret } = req.body;

    try{
        const updatedUser = await prisma.users.update({
            where: { id: Number(id) },
            data: { clientId, clientSecret },
            select: {
                id: true,
                username: true,
                clientId: true,
                clientSecret: true
            }
        });
        res.json(updatedUser);
    }catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});





const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
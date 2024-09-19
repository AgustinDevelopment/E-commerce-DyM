// Configuracion del servidor

import express from 'express'
import db from './config/db'
import colors from 'colors'
import projectRoutes from './routes/modeloRoutes'

export const connectDB = async () => {
    try {
        await db.authenticate()
        db.sync()
    } catch (error) {
        console.log(colors.bgRed.white('Hubo un error al conectar a la BD'), error)
        process.exit(1)
    }
}
connectDB()

const app = express()

app.use(express.json())

// Routes
app.use('/api/projects', projectRoutes)

// server.use('/api/products', router)

export default app
//console.log("hello world")
import express from "express";
import employeesRoutes from './routes/employees.routes.js'
import indexRouts from './routes/index.routes.js'
//ACA EMPEZAMOS A LEER VARIABLES DE ENTORNO
//import { PORT } from './config.js'

const app = express()

app.use(express.json())

app.use(indexRouts)

app.use('/api', employeesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        Message: 'endpoint not found'

    })

})

export default app;
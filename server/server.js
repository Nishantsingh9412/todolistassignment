import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path'

import todoRoutes from './routes/todo.js'

const app = express()
dotenv.config()

const PORT = 5000
const DATABASE_URL = process.env.DATABASE_URL


app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: 'true' }))
app.use(cors())

app.use('/todos', todoRoutes)

// ----------------------------deployment--------------------------------------

const __dirname = path.resolve();
// console.log(__dirname)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(("./frontend_build/dist")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend_build", "dist", "index.html"));
  });
} else {
  app.get('/', (req, res) => {
    res.send("on 8000 port ")
  })
}
// ----------------------------deployment--------------------------------------



// app.get('/', (req, res) => {
//   res.send(' This is TodoList Server ')
// })

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => app.listen(PORT,
      () => { console.log(`server running on PORT ${PORT}`) })
  ).catch(
    (err) => console.log(err)
  );

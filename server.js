import mongoose from 'mongoose'
import app from './app.js'

const {DB_HOST, PORT=3000} = process.env;
// mongodb+srv://dbuser:eRXk4GdVvplaq0hA@node01.nnwpgun.mongodb.net/dbnode02?retryWrites=true&w=majority

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
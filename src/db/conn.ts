import mongoose from 'mongoose'

function conn() {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jratdbl.mongodb.net/?retryWrites=true&w=majority`)
}

conn()

export default mongoose


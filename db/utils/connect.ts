import mongoose from 'mongoose'

const connectMongo = mongoose.connect(process.env.MONGO_URL as string)

export default connectMongo

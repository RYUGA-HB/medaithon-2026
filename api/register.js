import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let cachedClient = null
let cachedDb = null

async function connectToDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing. Please set MONGODB_URI in Vercel Environment Variables.')
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(uri, options)
  await client.connect()
  const dbName = process.env.MONGODB_DB || 'medaithon2026'
  const db = client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { db } = await connectToDatabase()
    const collection = db.collection('registrations')

    if (req.method === 'POST') {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

      if (!payload || !payload.teamName || !payload.abstractDriveLink) {
        return res.status(400).json({
          success: false,
          error: 'Missing required team registration details.'
        })
      }

      const documentToInsert = {
        ...payload,
        createdAt: new Date()
      }

      const result = await collection.insertOne(documentToInsert)

      return res.status(200).json({
        success: true,
        message: 'Registration successfully stored in MongoDB.',
        registrationId: payload.registrationId,
        insertedId: result.insertedId
      })
    }

    if (req.method === 'GET') {
      const registrations = await collection.find({}).sort({ createdAt: -1 }).toArray()
      return res.status(200).json({
        success: true,
        count: registrations.length,
        registrations
      })
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' })
  } catch (error) {
    console.error('MongoDB API Error:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to connect to MongoDB'
    })
  }
}

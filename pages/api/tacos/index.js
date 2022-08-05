import dbConnect from '../../../util/mongo'
import Taco from '../../../models/Taco'

export default async function handler(req, res) {
  const { method, cookies } = req

  const token = cookies.token

  dbConnect()

  if (method === 'GET') {
    try {
      const tacos = await Taco.find()
      res.status(200).json(tacos)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if (method === 'POST') {
    {/*if (!token || token !== process.env.token) {
      return res.status(401).json('Not authenticated!')
    }*/}
    try {
      const taco = await Taco.create(req.body)
      res.status(201).json(taco)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
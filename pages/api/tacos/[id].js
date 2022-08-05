import dbConnect from '../../../util/mongo'
import Taco from '../../../models/Taco'


export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req
  const token = cookies.token

  dbConnect()

  if (method === 'GET') {
    try {
      const taco = await Taco.findById(id)
      res.status(200).json(taco)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if (method === 'PUT') {
    if (!token || token !== process.env.token) {
      return res.status(401).json('Not authenticated!')
    }
    try {
      const product = await Taco.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      res.status(200).json(taco)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if (method === "DELETE") {
    {/*
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }*/}
    try {
      await Taco.findByIdAndDelete(id);
      res.status(200).json("The taco has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}




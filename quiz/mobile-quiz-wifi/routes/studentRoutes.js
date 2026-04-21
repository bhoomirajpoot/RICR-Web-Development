import express from 'express'
import { supabase } from '../config/supabaseClient.js'
import bcrypt from 'bcryptjs'

const router = express.Router()

// 📌 1️⃣ Register Student
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from('students')
      .insert([
        { name, email, password: hashedPassword }
      ])

    if (error) return res.status(500).json(error)

    res.json({ message: 'Student registered successfully', data })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})


// 📌 2️⃣ Login Student
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    const isMatch = await bcrypt.compare(password, data.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    res.json({ message: 'Login successful', student: data })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})


// 📌 3️⃣ Get All Students
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('students')
    .select('*')

  if (error) return res.status(500).json(error)

  res.json(data)
})


// 🔥 VERY IMPORTANT
export default router
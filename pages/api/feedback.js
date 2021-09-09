import fs from 'fs'
import path from 'path'

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath)

  const data = JSON.parse(fileData)

  return data
}

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json')
}

function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedback
    }

    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)

    data.push(newFeedback)

    fs.writeFileSync(filePath, JSON.stringify(data))

    return res.status(200).json({ message: 'Sucess', feedback: newFeedback })
  } else {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)

    return res.status(200).json({ message: 'Sucess', feedback: data })

  }
}

export default handler
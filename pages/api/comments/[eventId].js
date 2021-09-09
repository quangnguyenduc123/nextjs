const handler = async (req, res) => {
    const eventId = req.query.eventId

    if (req.method === 'POST') {
        const { email, name, comment } = req.body

        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !comment ||
            comment.trim() === '') {
            return res.status(400).json({ message: 'Invalid input' })
        }
        const a = await fetch('https://webapp-672a1.firebaseio.com/comments.json', {
            method: 'POST',
            body: JSON.stringify({
                email,
                name,
                comment,
                eventId
            })
        })
        return res.status(200).json({ message: 'Success' });
    }

    if (req.method === 'GET') {
        const rawData = await fetch('https://webapp-672a1.firebaseio.com/comments.json')
        const data = await rawData.json()

        const comments = []

        for (const key in data) {
            if (data[key].eventId === eventId) {
                comments.push({
                    id: key,
                    name: data[key].name,
                    email: data[key].email,
                    comment: data[key].comment
                })
            }
        }
        return res.status(200).json({ comments });
    }

}

export default handler
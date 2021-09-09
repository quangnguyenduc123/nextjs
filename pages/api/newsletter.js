

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body

        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email' })
        }
        try {
            const a = await fetch('https://webapp-672a1.firebaseio.com/newsletter.json', {
                method: 'POST',
                body: JSON.stringify({
                    email
                })
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Success' });
    }
}

export default handler
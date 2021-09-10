const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, name, message } = req.body

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            return res.status(400).json({ message: 'Invalid input.' });

        }

        const a = await fetch('https://webapp-672a1.firebaseio.com/contacts.json', {
            method: 'POST',
            body: JSON.stringify({
                email,
                name,
                message
            })
        })

        return res.status(200).json({ message: 'Sucess.' });
    }
}

export default handler
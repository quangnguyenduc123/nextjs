const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body

        if (
            !email ||
            !email.includes('@') ||
            !password ||
            password.trim() === ''
        ) {
            return res.status(400).json({ message: 'Invalid input.' });

        }

        const a = await fetch('https://webapp-672a1.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })

        return res.status(200).json({ message: 'Sucess.' });
    }
}

export default handler
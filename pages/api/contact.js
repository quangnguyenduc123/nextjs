function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body

        const a = await fetch('https://webapp-672a1.firebaseio.com/contacts.json', {
            method: 'POST',
            body: JSON.stringify({
                email,
                name,
                message
            })
        })
    }

}

export default handler
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const res = await fetch('https://webapp-672a1.firebaseio.com/users.json')
                const rawData = await res.json()
                const users = []
                for (const key in rawData) {
                    users.push({
                        id: key,
                        ...rawData[key]
                    });
                }
                console.log(credentials.email)
                const user = users.find(user => user.email === credentials.email)

                if (!user) {
                    throw new Error('Not found user')
                }
                return { email: user.email }

            }
        })
    ]
})
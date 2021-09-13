import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';

const POOL_DATA = {
    UserPoolId: 'ap-northeast-2_E2Chtcl7C', // Your user pool id here
    ClientId: '3l01597iggt4ilv29qq8amf27n', // Your client id here
}

const userPool = new CognitoUserPool(POOL_DATA)

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

        const dataEmail = {
            Name: 'email',
            Value: email,
        };

        const dataRole = {
            Name: 'custom:role',
            Value: 'ADMIN',
        }
        const attributeRole = new CognitoUserAttribute(dataRole)
        const attributeEmail = new CognitoUserAttribute(dataEmail)
        const attributeList = []

        attributeList.push(attributeEmail)
        attributeList.push(attributeRole)

        userPool.signUp(email, password, attributeList, null, function (
            err,
            result
        ) {
            if (err) {
                console.log(err);
                return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });

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
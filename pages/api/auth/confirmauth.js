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
        const { username, code } = req.body
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                return res.status(500).json({ message: err });
            }
            return res.status(200).json({ message: result });
        });
    }
}

export default handler
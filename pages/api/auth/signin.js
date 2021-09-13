import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

function asyncAuthenticateUser(cognitoUser, cognitoAuthenticationDetails) {
    return new Promise(function (resolve, reject) {
        cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
            onSuccess: resolve,
            onFailure: reject,
            newPasswordRequired: resolve
        })
    })
}

const handler = async (req, res) => {

    if (req.method === 'POST') {
        const { username, password } = req.body
        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );
        const poolData = {
            UserPoolId: 'ap-northeast-2_E2Chtcl7C', // Your user pool id here
            ClientId: '3l01597iggt4ilv29qq8amf27n', // Your client id here
        };
        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);
        try {
            const result = await asyncAuthenticateUser(cognitoUser, authenticationDetails)
            const jwtToken = result.getIdToken().getJwtToken();
            const accessToken = result.getAccessToken().getJwtToken()
            return res.status(200).json({ message: { jwtToken, accessToken } });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Failed' });
        }
    }
    else {
        return res.status(500).json({ message: 'error' });
    }
}

export default handler
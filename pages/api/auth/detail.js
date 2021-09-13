import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoIdentityServiceProvider
} from 'amazon-cognito-identity-js';

import AWS from 'aws-sdk'



function asyncGetUserDetail(cognitoUser) {
    return new Promise(function (resolve, reject) {
        cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        });
    })
}


const handler = async (req, res) => {
    AWS.config.update({ region: 'ap-northeast-2' })
    const username = req.body.username
    const accessToken = req.body.accessToken
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
    var params = {
        AccessToken: accessToken /* required */
    };
    try {
        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()
        cognitoidentityserviceprovider.getUser(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });
        return res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'error' });
    }

}

export default handler
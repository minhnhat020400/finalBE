const nodemailer = require("nodemailer");
const google = require('googleapis');

const client_id='291641120025-nfgc4ptmccefqo5neher0oqomhfe7rnh.apps.googleusercontent.com';
const client_secret='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';
const redirect_uri = 'https://developers.google.com/oauthplayground';
const refresh_token = '1//04qMpC-v4VuMACgYIARAAGAQSNwF-L9IrEhRtCVk632CKKSSQC0eu-G68sXCBUPFNwV_3e1GGNghAyF5g6iEHe_GXHy3oO-3uHQ0';

const Oauth2Client = new google.Auth.OAuth2Client(client_id,client_secret, redirect_uri);
Oauth2Client.setCredentials({refresh_token:refresh_token});

 module.exports.sendEmail= async function(toEmail,title,content){
    try {
        console.log("still work")
        try {
            const accessToken= await Oauth2Client.getAccessToken();
        } catch (error) {
            console.log(error);
        }
        
        console.log("still work")
        

        const transform = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'minhnhat020400@gmail.com',
                clientId:client_id,
                clientSecret:client_secret, 
                refreshToken:refresh_token,
                accessToken:accessToken
            }

        });
        const mainOption= {
            from:'Web film meme <minhnhat020400@gmail.com>',
            to:toEmail,
            subject:title,
            html:content
        } 
        const result = transform.sendMail(mainOption);
        return result;
    } catch (error) {
        console.log("looi ngap mat");
        return error;
    }
}

// .then((result)=>console.log('email is sended: ' ,result))
// .catch((error)=>console.log(error.message));

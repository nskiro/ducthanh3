import jwt from 'jsonwebtoken';

const commonConfig = {
    theme: 'bootstrap',
    verifyToken: (token) => {
        return jwt.verify(token, 'supersecret', function(err, decoded) {
            if(err) {
                console.log(err);
                return false;
            }
            return decoded;
        });
    },
    //baseURL: 'http://vps159788.vps.ovh.ca:5000/'
    baseURL: 'http://localhost:5000/'
}

export default commonConfig;
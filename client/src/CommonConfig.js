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
    }
}

export default commonConfig;
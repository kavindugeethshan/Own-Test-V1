import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authenticate(request, response, next) {
    console.log("Security Middleware executed");

    const header = request.headers["authorization"];

    // 1.did not go to inside without token
    if (header == null) {
        return response.status(401).json({ message: "Invalid login,try again" });
    }

    // 2. if have token remove the bearer and get only the token 
    const token = header.replace("Bearer ", "");

    // 3. see the token is right 
    jwt.verify(token, process.env.jwt_secret_key, (err, decoded) => {
        //4.if token is wrong or expire 
        if (err) {
            console.log("Token Error:", err.message);
            return response.status(401).json({ message: "Invalid token, try again" });
        }

        // Token is correct then add the user detail inside  the request
        request.user = decoded;
        next();
    });
}
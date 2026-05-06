// [EXPORT] Admin Guard Middleware
export default function isAdmin(req, res, next) {
    // This run after'authenticate' middleware  
    // thare fore req.user have user details alredy

    if (req.user && req.user.isAdmin === true) {
        // is Admin then go to inside 
        next();
    } else {
        // is not Admin cant go inside 
        return res.status(403).json({ message: "Forbidden only Admin can do this " });
    }
}
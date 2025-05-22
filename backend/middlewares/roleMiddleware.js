module.exports = (roles) => {
    return (req, res, nexr) => {
        if(!roles.includes(req.userData.role)){
            return res.status(403).json({
                message: "Forbidden: Access Denied...Not enough permissions"
            });
        }
        next();
    };
};
function authorize(req, res, next) {
    const { isAdmin } = req.user;

    if (!isAdmin) {
        return res.status(403).json({ message: "Forbidden: Only admins are allowed to perform this action" });
    }
    next();
}

module.exports = authorize;
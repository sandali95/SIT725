const service = require('../services/login.service');
module.exports = (req, res) => {
    if (req.body.email && req.body.password && req.body.type) {


        service.findUser(req.body.email, req.body.password, req.body.type)
            .then((data) => {
                if (data) {
                    res.status(200).json({ result: data, message: "successful" });
                } else {
                    res.status(200).json({ message: "Invalid credentials", code: 401 });
                }
            })
            .catch((e) => {
                console.error('Error:', e);
                res.status(500).json({ message: "Internal Server Error" });
            });
    } else {
        res.status(400).json({ message: "Invalid Data!!", code: 400 });
    }
};

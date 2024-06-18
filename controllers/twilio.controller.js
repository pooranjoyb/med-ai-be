const twilio = async (req, res) => {
    const { username } = req.body;
    res.send({messgae: `Post request success! Hello ${username}`})
};

export default twilio;
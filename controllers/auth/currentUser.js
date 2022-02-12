const currentUser = async (req, res, next) => {
  const { email, name } = req.user;
  res.json({
    user: {
      name,
      email,
    },
  });
};

module.exports = currentUser;

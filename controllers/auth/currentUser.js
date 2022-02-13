const currentUser = async (req, res, next) => {
  const { email, name, balance } = req.user;
  res.json({
    user: {
      name,
      email,
      balance,
    },
  });
};

module.exports = currentUser;

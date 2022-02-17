const { getUserTransactions } = require("../../services/transactions/transactionsService");

const getStats = async (req, res, next) => {
    try {
      const {page = 1, limit = 10, categorie} = req.query
      const skip = (page - 1) * limit
      const {_id} = req.user
      const object = `ObjectId("${_id}")`
      const stats = await getUserTransactions({owner: object.replace(/\\/, '')}, '', {skip, limit: +limit, categorie})
      
      res.json(stats)
    } catch (error) {
      next(error)
    }
  };

  module.exports = getStats;
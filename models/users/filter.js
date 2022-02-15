const filter = {
    'email': '3-test@gmail.com'
  };
  
  MongoClient.connect(
    'mongodb+srv://Kirill:Y1JFioqkTigXn9xQ@cluster0.guodi.mongodb.net/db_wallet?authSource=admin&replicaSet=atlas-3ccrg1-shard-0&w=majority&readPreference=primary&appname=MongoDB+Compass&retryWrites=true&ssl=true',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(connectErr, client) {
      assert.equal(null, connectErr);
      const coll = client.db('db_wallet').collection('users');
      coll.find(filter, (cmdErr, result) => {
        assert.equal(null, cmdErr);
      });
      client.close();
    });

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.DB_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function test() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

test().catch(console.dir);


class DBConnector {
    constructor(collection) {
        this.client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
        this.db = this.client.db("drawings_bot");
        this.collection = this.db.collection(collection);
        this.collection_name = collection;
    }

    async readOne(query, params) {
        let res = await this.collection.findOne(params, query);

        this.close();
        return res;
    }

    async readAll(query, params) {
        let res = await this.collection.find(query, params);

        this.close();
        return res;
    }

    async insert(query) {
        await this.collection.insertOne(query);
        
        console.log(`Insertion in collection "${this.collection_name}":`);
        console.log(query);
        
        this.close();
    }

    async update(query, params) {
        await this.collection.updateOne(params, query);
        
        console.log(`Update in collection "${this.collection_name}":`);
        console.log(query);
        console.log(params);

        this.close();
    }

    async close() {
        await this.client.close();
    }

}


async function getUser(userId) {
    const db = new DBConnector("users");
    return await db.readOne({}, {userId: userId});
}

async function isUserExists(userId) {
    return await getUser(userId) != null;
}

async function newUser(userId, name) {
    const db = new DBConnector("users");
    await db.insert({userId: userId, name: name, position: "choose_lang"});
}

async function updateUserLang(userId, language) {
    const db = new DBConnector("users");
    await db.update({$set: {language: language}}, {userId: userId});
}


module.exports = {
    getUser,
    isUserExists,
    newUser,
    updateUserLang
} 
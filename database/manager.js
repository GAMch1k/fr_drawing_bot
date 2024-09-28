
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
        let cur = await this.collection.find(params, query);
        let res = await cur.toArray();
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

async function newUser(userId, name, username, ref) {
    const db = new DBConnector("users");
    await db.insert({userId: userId, name: name, username: username, tickets: 1, referal: ref, subscribed: false, position: "choose_lang"});
}

async function updateUserLang(userId, language) {
    const db = new DBConnector("users");
    await db.update({$set: {language: language}}, {userId: userId});
}

async function updateUserPosition(userId, position) {
    const db = new DBConnector("users");
    await db.update({$set: {position: position}}, {userId: userId});
}

async function updateUserWallet(userId, wallet) {
    const db = new DBConnector("users");
    await db.update({$set: {wallet: wallet}}, {userId: userId});
}

async function getTop10Users() {
    const db = new DBConnector("users");
    return await db.readAll({sort: {tickets: -1}, limit: 10}, {});
}

async function addTickets(userId) {
    const db = new DBConnector("users");
    await db.update({$inc: {tickets: 1}}, {userId: userId});
}

async function userSubscribed(userId) {
    const db = new DBConnector("users");
    await db.update({$set: {subscribed: true}}, {userId: userId});
}


module.exports = {
    getUser,
    isUserExists,
    newUser,
    updateUserLang,
    updateUserPosition,
    updateUserWallet,
    getTop10Users,
    addTickets,
    userSubscribed
} 
const express = require('express')
const axios = require('axios');
const router = express.Router()
const db = require('../models/rssFeeds');

router.get('/findDomain', async(req,res) => {
    try{
        let searchKey = req.query.search;
        let [feedData] = await db.find({searchKey}, {result: 1}, {lean: true});
        if(feedData){
            res.send(JSON.parse(feedData.result));
            return;
        }

        let extFeedRes = await axios.get('https://cloud.feedly.com/v3/search/feeds/?query='+searchKey);
        extFeedRes = JSON.stringify(extFeedRes.data.results[0]);
        await db.create({searchKey, result: extFeedRes});
        res.send(extFeedRes)
    }catch(err){
        console.log('Error :: ', err);
        res.send('Error ' + err)
    }
})


module.exports = router
var express = require('express')
var router = express.Router()
// const Sequelize = require('sequelize-hierarchy')();
const hierarchyLabelModel = require("../model/label-model")


router.get("/labelAncestor/:name", async(req, res) => {
    try {
        var result = [];
        var resIdObj = await hierarchyLabelModel.findOne({
            attributes : ["id"],
            where: {
                name : req.params.name
            },
            raw: true
        })
        id = resIdObj.id;
        while(id != null){
            var label = await hierarchyLabelModel.findOne({
                where: {
                    id : id
                },
                raw : true
            });
            result.push(label);
            id = label.parentId || null;
            if (label.parentId == null){
                break;
            }
        }
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})
// find descendents by name !! deep once level
router.get("/labelDescendent/:name", async (req, res) => {
    try {
        var resObj = await hierarchyLabelModel.findOne({
            where: {
                name : req.params.name
            },
            raw: true
        })
        
        resObj.include = await hierarchyLabelModel.findAll({
            where: {
                parentId: resObj.id
            }
        })
        // console.log(resObj.include);
        
        res.send(resObj)
    } catch (error) {
        res.send(error)
    }
})

router.get("/labelAll", async(req, res)=>{
    try{
        // await db.sequelize.models.FolderAncestor.sync();
        const label = await hierarchyLabelModel.findAll({
            hierarchy: true
        });
        res.send(label)
    }catch(e){
        res.send(e)
    }
})


module.exports = router

module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var userRoleSchema = new Schema({
        name : {
            type : String,
            required : true
        },
        routes : [
            {
                "urls._id" : {
                    ref : 'url',
                    type : Schema.Types.ObjectId
                },
                getting  : {type : Boolean, default : true},
                creating : {type : Boolean, default : true},
                updating : {type : Boolean, default : true},
                deleting : {type : Boolean, default : false}
            }
        ],
        notes : String,
        createdAt : {type : Date, default : Date.now},
        active : {type : Boolean, default : true}
    });
    var query = {
        path : "routes.urls._id",
        select : "name api",
        match : {active : true}
    };
    userRoleSchema.statics.popFindOne = function (body, cb) {
        body = body || {};
        body.active = body.hasOwnProperty("active") ? body.active : true;
        return this.findOne(body).populate(query).exec(cb);
    };
    userRoleSchema.statics.popFind = function (body, cb) {
        body = body || {};
        body.active = body.hasOwnProperty("active") ? body.active : true;
        return this.find(body).populate(query).exec(cb);
    };
    return mongoose.model('userRole', userRoleSchema);
};
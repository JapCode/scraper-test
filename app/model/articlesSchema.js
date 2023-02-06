const mongoose = require('mongoose');
const { clientMongo } = require('../../service/mongoDBconnection');

const { Schema } = mongoose;

const articlesSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    scraping_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    published_at: { type: String, required: true },
    category: [String],
    source: { type: String, unique: true, required: true },
  },
  {
    versionKey: false,
  },
);

articlesSchema.set('toJSON', {
  transform: (document, returnedObjet) => {
    returnedObjet.id = returnedObjet._id;
    delete returnedObjet._id;
    delete returnedObjet.__v;
  },
});

const Articles = mongoose.model('Articles', articlesSchema);
const ArticlesModel = clientMongo.model('Articles', articlesSchema);
module.exports = { Articles, ArticlesModel };

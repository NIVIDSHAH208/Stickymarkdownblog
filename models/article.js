const mongoose = require("mongoose");
const marked = require("marked")
const slugify = require("slugify")
const createDomPurifier = require('dompurify')
const {JSDOM} = require("jsdom")
const domPurify = createDomPurifier(new JSDOM().window)

// now we need to create the database schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type:String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower:true, strict: true})
    }
    if (this.markdown) {
        this.sanitizedHTML =domPurify.sanitize(marked.parse(this.markdown))
    }

    next()
})

// we pass the model article schema using this name 
module.exports = mongoose.model('Article', articleSchema)
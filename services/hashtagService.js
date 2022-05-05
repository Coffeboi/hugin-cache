/**
 * Hashtag Service
 */

'use strict'

const db = require('../configs/postgresql')
const models = require("../database/models");

const hashtagService = {}

/**
 * Get all hashtags
 */
hashtagService.getAll = async (page, size, limit, offset) => {
    return models.Hashtag.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'ASC'],
        ],
        offset: offset,
    })
}

/**
 * Get hashtag by id
 */
hashtagService.getHashTagById = async (req) => {
    return models.Hashtag.findOne({
        where: {
            id: req.params.id
        }
    })
}

/**
 * Get latest hashtags
 */
hashtagService.getLatest = async (page, size, limit, offset) => {
    return models.Hashtag.findAndCountAll({
        limit: limit,
        order: [
            ['id', 'DESC'],
        ],
        offset: offset,
    })
}

/**
 * Get trending posts
 */
//TODO: this currently does NOT work to count number posts and return the count instead of the
// objects. This needs to be fixed to avoid big and expensive queries
hashtagService.getTrending = async (page, size, limit, offset) => {
    // filter posts under a week time

    return models.PostHashtag.findAndCountAll({
        group: ['PostHashtag.post_id'],
        limit: limit,
        offset: offset,
        attributes: { 
            include: [[db.sequelize.fn("COUNT", db.sequelize.col("posts.id")), "num_posts"]]
        },
    })
}

module.exports = hashtagService
const Match = require('../models/match');
const News = require('../models/news');
const Tour = require('../models/tour');

const createNews = async (req, res, next) => {
    try {
        const { title, description, type, name } = req.body;

        let result;
        if (type === 'match') {
            const id = await Match.getMatchIdByName(name);
            result = await News.createNewsForMatch(title, description, id);
        } else if (type === 'tour') {
            const id = await Tour.getTourIdByName(name);
            result = await News.createNewsForTour(title, description, id);
        } else {
            throw new Error('Invalid type. Must be "match" or "tour".');
        }

        return res.json(result);
    } catch (err) {
        return next(err);
    }
}

const getNewsByMatchId = async (req, res, next) => {
    return await News.getNewsByMatchId(req.params.matchId);
}

const getNewsByTourId = async (req, res, next) => {
    return await News.getNewsByTourId(req.params.tourId);

}

const getNewsBySportId = async (req, res, next) => {
    return await News.getNewsBySportId(req.params.sportId);
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId
}
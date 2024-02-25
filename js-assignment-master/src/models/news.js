const mysql = require('../lib/mysql');

const createNewsForMatch = async (title, description, matchId) => {
    // Check if the match exists
    const match = await mysql.query('SELECT * FROM matches WHERE id = ?', [matchId]);
    if (match.length === 0) {
        throw new Error('Match not found');
    }

    const statement = `
        INSERT INTO news (title, description, matchId, tourId, sportId)
        SELECT ?, ?, matches.id, tours.id, tours.sportId
        FROM matches
        JOIN tours ON matches.tourId = tours.id
        WHERE matches.id = ?
    `;
    const parameters = [title, description, matchId];
    return await mysql.query(statement, parameters);
}

const createNewsForTour = async (title, description, tourId) => {
    // Check if the tour exists
    const tour = await mysql.query('SELECT * FROM tours WHERE id = ?', [tourId]);
    if (tour.length === 0) {
        throw new Error('Tour not found');
    }

    const statement = `
        INSERT INTO news (title, description, tourId, sportId)
        SELECT ?, ?, tours.id, tours.sportId
        FROM tours
        WHERE tours.id = ?
    `;
    const parameters = [title, description, tourId];
    return await mysql.query(statement, parameters);
}


const getNewsByMatchId = async matchId => {
    const statement = 'SELECT * FROM news WHERE matchId = ?';
    const parameters = [ matchId ];
    return await mysql.query(statement, parameters);
}

const getNewsByTourId = async tourId => {
    const statement = 'SELECT * FROM news WHERE tourId = ?';
    const parameters = [ tourId ];
    return await mysql.query(statement, parameters);
}

const getNewsBySportId = async sportId => {
    const statement = 'SELECT * FROM news WHERE sportId = ?';
    const parameters = [ sportId ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    createNewsForMatch: createNewsForMatch,
    createNewsForTour:createNewsForTour,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId
}
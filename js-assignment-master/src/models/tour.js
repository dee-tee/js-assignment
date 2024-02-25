const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getTourIdByName = async name => {
    const statement = 'SELECT id FROM tours WHERE name = ?';
    const parameters = [ name ];
    const [rows] = await mysql.query(statement, parameters);
    return rows[0].id;
}

const getMatchesByTourId = async tourId => {
    const statement = 'SELECT * FROM matches WHERE tourId = ?';
    const parameters = [ tourId ];
    return await mysql.query(statement, parameters);
}


module.exports = {
    getAllTours: getAllTours,
    getTourIdByName: getTourIdByName,
    getMatchesByTourId: getMatchesByTourId
}
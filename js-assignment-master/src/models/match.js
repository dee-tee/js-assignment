const mysql = require('../lib/mysql');

const getAllMatches = async () => {
    const statement = 'select * from matches;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchIdByName = async name => {
    const statement = 'SELECT id FROM matches WHERE name = ?';
    const parameters = [ name ];
    const [rows] = await mysql.query(statement, parameters);
    return rows[0].id;
}
module.exports = {
    getMatchIdByName:getMatchIdByName,
    getAllMatches: getAllMatches
}
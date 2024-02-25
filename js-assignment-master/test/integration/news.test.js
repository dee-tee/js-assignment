const request = require('supertest');
const { app } = require('../../index');

describe('News API Integration Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should create news and return a 200 OK status code for POST request to /news', async () => {
    const response = await request(server)
      .post('/news')
      .send({
        title: 'Test News',
        description: 'This is a test news',
        matchId: 1,
        tourId: 1,
        sportId: 1
      });
    expect(response.status).toBe(200);
  });

  it('should fetch news by match id and return a 200 OK status code for GET request to /news/match/:matchId', async () => {
    const response = await request(server).get('/news/match/1');
    expect(response.status).toBe(200);
  });

  it('should fetch news by tour id and return a 200 OK status code for GET request to /news/tour/:tourId', async () => {
    const response = await request(server).get('/news/tour/1');
    expect(response.status).toBe(200);
  });

  it('should fetch news by sport id and return a 200 OK status code for GET request to /news/sport/:sportId', async () => {
    const response = await request(server).get('/news/sport/1');
    expect(response.status).toBe(200);
  });
});
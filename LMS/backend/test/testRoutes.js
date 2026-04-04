const request = require('supertest');
const app = require('../index');

describe('Role-based routes', () => {
    it('should return Admin dashboard for /admin', async () => {
        const res = await request(app).get('/admin').set('Authorization', 'valid_token');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Admin dashboard');
    });

    it('should return Student dashboard for /student', async () => {
        const res = await request(app).get('/student').set('Authorization', 'valid_token');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Student dashboard');
    });

    it('should return Teacher dashboard for /teacher', async () => {
        const res = await request(app).get('/teacher').set('Authorization', 'valid_token');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Teacher dashboard');
    });
});
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONF', () => {
    beforeEach( async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('deve criar uma nova ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "AFAZ",
	        email: "asdasd@qweq.com",
	        whatsapp: "71991454768",
	        city: "Madre de Deus",
	        uf: "BA"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })   
})
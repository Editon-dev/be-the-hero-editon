const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique Id', () => {
    it('Deve mostrar numedo de ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
})
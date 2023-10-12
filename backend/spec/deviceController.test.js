const deviceController = require('../controllers/deviceController');

describe('Device Controller', () => {
  describe('createDevice', () => {
    it('should create a new device', async () => {
      const req = {
        body: {
          name: 'Test Device',
          industry: 'validIndustryId',
          fee: 100,
          warehouse: 'Test Warehouse',
        },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await deviceController.createDevice(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Device',
        })
      );
    });

    it('should return an error for an invalid industry ID', async () => {
      const req = {
        body: {
          name: 'Test Device',
          industry: 'invalidIndustryId',
          fee: 100,
          warehouse: 'Test Warehouse',
        },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await deviceController.createDevice(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Invalid industry ObjectId',
        })
      );
    });

    it('should return an error for missing required fields', async () => {
      const req = {
        body: {
          // Missing name, industry, fee, and warehouse
        },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await deviceController.createDevice(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'All fields are required.',
        })
      );
    });

    it('should return an error for a negative fee', async () => {
      const req = {
        body: {
          name: 'Test Device',
          industry: 'validIndustryId',
          fee: -100, // Negative fee
          warehouse: 'Test Warehouse',
        },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await deviceController.createDevice(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Fee must be a valid number greater than or equal to 0.',
        })
      );
    });
  });
});

// Import all modules required
const homeRouter = require('express').Router();
const homeController = require('../controllers/homeController');
const auth = require('../middlewares/auth');

// All route with get method 
homeRouter.get('/', auth, homeController.getHomePage);
homeRouter.get('/contact', auth, homeController.getContactPage)
homeRouter.get('/login', homeController.getLoginPage);
homeRouter.get('/scheme', auth, homeController.getSchemePage);
homeRouter.get('/logout', auth, homeController.getLogOutPage);
homeRouter.get('/NGO/:id', auth, homeController.getNGOPage);
homeRouter.get('/donate/:id', auth, homeController.getQR);
homeRouter.get('/donate/form/:id', auth, homeController.getpayForm);

// All route with post method
homeRouter.post('/donation', auth, homeController.uploadDonation);

// Export router
module.exports = homeRouter;
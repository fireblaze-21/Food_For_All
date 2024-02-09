// Import all modules required
const donorRouter = require('express').Router();
const donorController = require('../controllers/donorController');
const auth = require('../middlewares/auth');

// All route with get method 
donorRouter.get('/donor/registration', donorController.getRegistrationPage);
// donorRouter.get('/donor/login', donorController.getLoginPage);
donorRouter.get('/donor/profile', auth, donorController.getProfilePage);

// All route with post method 
donorRouter.post('/donor/registration', donorController.createDetails);
donorRouter.post('/donor/login', donorController.getUser);
donorRouter.post('/donor/profile', auth, donorController.updateProfile);
donorRouter.post('/donor/password', auth, donorController.updatePassword);

// Export router
module.exports = donorRouter;
// Import all modules required
const NGORouter = require('express').Router();
const NGOController = require('../controllers/NGOController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// All route with get method 
NGORouter.get('/NGO/registration', NGOController.getRegistrationPage);
// NGORouter.get('/NGO/login', NGOController.getLoginPage);
NGORouter.get('/NGO/profile', auth, NGOController.getProfilePage);

// All route with post method 
NGORouter.post('/NGO/registration', upload.single('logo'), NGOController.createDetails);
NGORouter.post('/NGO/login', NGOController.getUser);
NGORouter.post('/NGO/profile', auth, NGOController.updateProfile);
NGORouter.post('/NGO/password', auth, NGOController.updatePassword);
NGORouter.post('/NGO/bank', auth, upload.single('qr'), NGOController.updateBank);
NGORouter.post('/NGO/activity', auth, upload.array('img', 4), NGOController.updateActivity);

// Export router
module.exports = NGORouter;
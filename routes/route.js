//Controllers Definitions
var admin = require('../controllers/admin');
var users = require('../controllers/users');
var login = require('../controllers/login');
var globalfunctions = require('../controllers/global');

module.exports = function () {
	//Login Pages
	app.get('/', login.index);
	app.post('/', login.loginverify);

	//User Pages
	app.get('/users/', globalfunctions.checkUserAuth, users.index);
	app.get('/users/newrfq', globalfunctions.checkUserAuth, users.newrfq);
	app.get('/users/rfq_general_data/:rfq_id', globalfunctions.checkUserAuth, users.rfq_general_data);

	app.post('/users/newrfq', globalfunctions.checkUserAuth, users.save_rfq_general_data);
	
	app.get('/users/rfq_product_data/:rfq_id',globalfunctions.checkUserAuth, users.rfq_product_data);
	app.post('/users/save_rfq_product_data/:rfq_id',globalfunctions.checkUserAuth, users.save_rfq_product_data);
	app.get('/users/rfq_line_items/:rfq_id',globalfunctions.checkUserAuth, users.rfq_line_items);
	//app.post('/users/save_rfq_line_items',globalfunctions.checkUserAuth, users.save_rfq_line_items);
	
	app.get('/users/fetch_sales_persons/:id', globalfunctions.checkUserAuth, users.fetch_sales_persons);
	app.get('/users/fetch_sales_agents/:id', globalfunctions.checkUserAuth, users.fetch_sales_agents);
	app.get('/users/fetch_tendering_teams/:product_line_id', globalfunctions.checkUserAuth, users.fetch_tendering_teams);
	app.get('/users/fetch_tendering_teams_members/:tendering_teams_id', globalfunctions.checkUserAuth, users.fetch_tendering_teams_members);
};
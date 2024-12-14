var itemSysId = '<catalog_item_sys_id>'; // Replace with your catalog item's sys_id
var variables = [
    {name: 'variable1', type: '1', question: 'Enter your name'},
    {name: 'variable2', type: '2', question: 'Select your role'}
];
//
variables.forEach(function(v) {
    var varGR = new GlideRecord('item_option_new');
    varGR.initialize();
    varGR.name = v.name;
    varGR.type = v.type;
    varGR.question = v.question;
    varGR.cat_item = itemSysId;
    varGR.insert();
});

'1' == 'Yes/No';
'2' == 'Multli Line Text';
'5' == 'Select Box';

function createServiceRequest() {
    var cart = new Cart();
    var item = cart.addItem('catalog_item_sys_id');
    
    // Set variables for the request
    cart.setVariable(item, 'short_description', 'Automated Service Request');
    cart.setVariable(item, 'description', 'This request was created automatically');
    
    // Set the requested for user
    var cartGR = cart.getCart();
    cartGR.requested_for = 'user_sys_id';
    cartGR.update();
    
    // Place the order
    var newSerReq = cart.placeOrder();
    
    // Additional updates if needed
    newSerReq.opened_by = 'creator_sys_id';
    newSerReq.update();
  }
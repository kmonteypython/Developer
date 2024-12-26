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

  function createServiceRequest() {
    // Constants for IDs
    const REQUESTED_FOR_USER = 'd54c1c5b1b4552100d9cea01b24bcbc9';
    const TECH_POC = 'b51b232c1b9bf910ac4bb99f1d4bcb4c';
    const DIVISION = '346ac45c4747d51007b31a7c736d43fd';
    const CATALOG_ITEM_ID = '08be62641b1ad61049c7dd77d34bcb15';

    // Initialize cart and add the item
    var cart = new Cart();
    var item = cart.addItem(CATALOG_ITEM_ID);

    if (!item) {
        gs.error('Failed to add item to cart');
        return;
    }

    // Define request variables
    var variables = [
        { name: 'short_description', value: 'New Software Request' },
        { name: 'description', value: 'Test Request' },
        { name: 'what_type_of_software_are_you_requesting', value: 'Desktop' },
        { name: 'req_due_date', value: '2024-12-20' },
        { name: 'software_product_name', value: 'Test' },
        { name: 'reason_for_need', value: 'Test' },
        { name: 'tech_poc', value: TECH_POC },
        { name: 'int_involved', value: '1' },
        { name: 'for_individual_or_team', value: 'Individual' },
        { name: 'division', value: DIVISION },
        { name: 'url', value: 'Test' },
        { name: 'business_cap_supported', value: 'Test' },
        { name: 'os_version', value: 'Mac' },
        { name: 'are_you_part_of_the_hardware_refresh_initiative', value: 'Yes' },
        { name: 'impact_if_not_approved', value: 'Test' },
        { name: 'unmanaged_devices', value: '1' },
        { name: 'lvl_of_urg', value: '1' },
        { name: 'software_usage_by', value: '1' },
        { name: 'product_not_found', value: 'True' },
        { name: 'bu_or_pearson', value: 'business_unit' },
        { name: 'requested_for', value: REQUESTED_FOR_USER },
    ];

    // Set variables for the item
    variables.forEach(function (variable) {
        cart.setVariable(item, variable.name, variable.value);
    });

    // Set the requested for user
    var cartGR = cart.getCart();
    if (cartGR) {
        cartGR.requested_for = REQUESTED_FOR_USER;
        cartGR.update();
    }

    // Place the order
    var newSerReq = cart.placeOrder();

    if (newSerReq) {
        // Additional updates if needed
        newSerReq.opened_by = REQUESTED_FOR_USER;
        newSerReq.update();
    } else {
        gs.error('Failed to place the order');
    }
}
var itemSysId = '<catalog_item_sys_id>'; // Replace with your catalog item's sys_id
var variables = [
    {name: 'variable1', type: '1', question: 'Enter your name'},
    {name: 'variable2', type: '2', question: 'Select your role'}
];

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
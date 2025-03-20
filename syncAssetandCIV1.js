function syncCIandAsset() {
    // Retrieve status mappings dynamically from alm_asset_ci_state_mapping table
    var statusMapping = {};
    var mappingGr = new GlideRecord("alm_asset_ci_state_mapping");
    mappingGr.query();
    while (mappingGr.next()) {
        var ciStatus = mappingGr.configuration_item_status.toString();
        if (!statusMapping[ciStatus]) {
            statusMapping[ciStatus] = [];
        }
        statusMapping[ciStatus].push({
            state: mappingGr.asset_state.toString(),
            substate: mappingGr.asset_substate.toString(),
            synchDirection: mappingGr.synch_direction.toString() // Include synch_direction
        });
    }

    var hardwareCIGr = new GlideRecord("cmdb_ci_hardware");
    hardwareCIGr.addEncodedQuery('install_status!=1^asset.install_status=1^install_status=101');
    hardwareCIGr.query();
    while (hardwareCIGr.next()) {
        // Get the new install_status from CI
        var ciStatus = hardwareCIGr.install_status.toString();
        // If mapping exists, process the asset
        if (statusMapping[ciStatus]) {
            var assetGr = new GlideRecord("alm_asset");
            assetGr.get(hardwareCIGr.asset.toString());
            assetGr.query();
            if (assetGr.next()) {
                // Iterate through all possible mappings for the CI status
                for (var i = 0; i < statusMapping[ciStatus].length; i++) {
                    var mapping = statusMapping[ciStatus][i];
                    // Check if the synch_direction is 'both'
                    if (mapping.synchDirection === 'both') {
                        assetGr.install_status = mapping.state;
                        assetGr.substatus = mapping.substate;
                        assetGr.update();
                        gs.info("KMDO: Asset " + assetGr.sys_id + " updated based on CI Install Status: " + ciStatus + " with synch_direction: both");
                        break; // Stop after applying the correct mapping
                    }
                }
            }
        }
    }
}

syncCIandAsset();
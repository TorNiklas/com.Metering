'use strict';

const Homey = require('homey');
const { ZigBeeDevice } = require('homey-zigbeedriver');
// const { ZigBeeDevice } = require('homey-meshdriver');
const { CLUSTER, debug, ZCLNode } = require('zigbee-clusters');
// Enable debug logging of all relevant Zigbee communication
debug(true);
class MyZigBeeDevice extends ZigBeeDevice {

	async onNodeInit() {
	// async onNodeInit({ zclNode }) {
		const settings = this.getSettings();
		// console.log(settings.pollInterval);


		// Get ZigBeeNode instance from ManagerZigBee
		// this.homey.zigbee.getNode(this)
		//   .then(async node => {
		// 	// Create ZCLNode instance
		// 	const zclNode = new ZCLNode(node);
	
		// 	// Configure reporting
		// 	await zclNode.endpoints[2].clusters[CLUSTER.METERING.NAME].configureReporting({
		// 		currentSummationDelivered: {
		// 			minInterval: 0,
		// 			maxInterval: 60,
		// 			minChange: 1
		// 		}
		// 	});
	
		// 	// And listen for incoming attribute reports by binding a listener on the cluster
		// 	zclNode.endpoints[2].clusters[CLUSTER.METERING.NAME].on('attr.currentSummationDelivered', (currentSummationDelivered) => {
		// 		// handle reported attribute value
		// 		console.log("he")
		// 	});
		// });


		// ==========================================================================================================
		// ==========================================================================================================
		// ==========================================================================================================


		// this.registerCapability('meter_power', CLUSTER.METERING);
		// this.registerCapability('meter_power', CLUSTER.METERING, { 
		// 	endpointId: 2,
			// getOpts: {
			// 	getOnStart: true,
			// 	// getOnOnline: true,
			// 	// pollInterval: 30 * 1000, // in ms
			// },

			// report: 'currentSummationDelivered',
            // getParser: value => value,
			// get: 'currentSummationDelivered',
			// reportParser: (report) => {
			// 	console.log("")
			// 	console.log("Hi")
			// 	console.log(report)
			// 	return report;
			// },
			// reportOpts: {
			// 	configureAttributeReporting: {
			// 		minInterval: 0, // No min
			// 		maxInterval: 60, // Maximally once every minute
			// 		minChange: 1,
			// 	}
			// },
		// });



		// ==========================================================================================================
		// ==========================================================================================================
		// ==========================================================================================================

		


		// await this.configureAttributeReporting([
		// 	{
		// 	  endpointId: 2,
		// 	  cluster: CLUSTER.METERING,
		// 	  attributeName: 'currentSummationDelivered',
		// 	  minInterval: 0,
		// 	  maxInterval: 61,
		// 	  minChange: 1,
		// 	},
		// ]);
	  
		//   // 1.2.) Listen to attribute reports for the above configured attribute reporting
		//   zclNode.endpoints[2].clusters.metering.on('attr.currentSummationDelivered', (currentSummationDelivered) => {
		// 	this.log("hi")
		// 	this.log(currentSummationDelivered);
		//   });
		
		this.register_Metering(settings.pollInterval)
		this.log('MyZigBeeDevice has been inited');
	}

	async onSettings({ oldSettings, newSettings, changedKeys }) {
		console.log()
		console.log("Settings changed")
		// await this.register_Metering(newSettings.pollInterval)
	}

	async register_Metering(interval) {
		this.registerCapability('meter_power', CLUSTER.METERING, { 
			endpointId: 2,
			getOpts: {
				getOnStart: true,
				// getOnOnline: true,
				pollInterval: interval * 1000, // in ms
			}
		});


		// await this.configureAttributeReporting([{
		// 	cluster: CLUSTER.METERING,
		// 	attributeName: 'currentSummationDelivered',
		// 	minInterval: 0,
		// 	maxInterval: 60,
		// 	minChange: 1,
		// }]);

		  

	// 	// this.registerCapability('meter_power.water', CLUSTER.METERING, { 
	// 	// 	endpointId: 2,
	// 	// 	getOpts: {
	// 	// 		getOnStart: true,
	// 	// 		// getOnOnline: true,
	// 	// 		pollInterval: interval  * 1000, // in ms
	// 	// 	}
	// 	// });
	}
}

module.exports = MyZigBeeDevice;

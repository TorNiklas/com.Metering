'use strict';

const Homey = require('homey');
const { ZigBeeDevice } = require('homey-zigbeedriver');
// const { ZigBeeDevice } = require('homey-meshdriver');
const { CLUSTER, debug, ZCLNode } = require('zigbee-clusters');
// Enable debug logging of all relevant Zigbee communication
debug(true);
class MyZigBeeDevice extends ZigBeeDevice {

	async onNodeInit({ zclNode }) {
		// // Get ZigBeeNode instance from ManagerZigBee
		// this.homey.zigbee.getNode(this)
		//   .then(async node => {
		// 	// Create ZCLNode instance
		// 	const zclNode = new ZCLNode(node);
	
		// 	// Configure reporting
		// 	await zclNode.endpoints[2].clusters[CLUSTER.METERING.NAME].configureReporting({
		// 		currentSummationDelivered: {
		// 			minInterval: 0,
		// 			maxInterval: 300,
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
		// 	getOpts: {
		// 		getOnStart: true,
		// 		// getOnOnline: true,
		// 		// pollInterval: 10000, // in ms
		// 	},
			
		// 	// setParser: (setValue) => {
		// 	// 	console.log("Hi")
		// 	// 	return setValue ? 'setOn' : 'setOff'; // This could also be an object for more complex
		// 	// 	// commands
		// 	// },
		// 	// get: 'currentSummationDelivered',
		// 	report: 'METERING_REPORT',
		// 	reportParser: (report) => {
		// 		console.log("Hi")
		// 		return 1;
		// 	},
		// 	reportOpts: {
		// 		configureAttributeReporting: {
		// 			minInterval: 0, // Minimally once every hour
		// 			maxInterval: 60000, // Maximally once every ~16 hours
		// 			minChange: 1,
		// 		}
		// 	},
		// });



		// ==========================================================================================================
		// ==========================================================================================================
		// ==========================================================================================================

		


		await this.configureAttributeReporting([
			{
			  endpointId: 2,
			  cluster: CLUSTER.METERING,
			  attributeName: 'currentSummationDelivered',
			  minInterval: 0,
			  maxInterval: 61,
			  minChange: 1,
			},
		  ]);
	  
		  // 1.2.) Listen to attribute reports for the above configured attribute reporting
		  zclNode.endpoints[2].clusters.metering.on('attr.currentSummationDelivered', (currentSummationDelivered) => {
			this.log("hi")
			this.log(currentSummationDelivered);
		  });
		
		this.log('MyZigBeeDevice has been inited');
	}

	// async config() {
	// 	await this.configureAttributeReporting([
	// 		{
	// 		//   endpointId: 2,
	// 		//   cluster: CLUSTER.METERING,
	// 		//   attributeName: 'currentSummationDelivered',
	// 		//   minInterval: 0,
	// 		//   maxInterval: 100,
	// 		//   minChange: 0,
	// 		}
	// 	]);
	// }
}

module.exports = MyZigBeeDevice;

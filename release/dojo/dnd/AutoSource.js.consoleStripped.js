define("dojo/dnd/AutoSource", ["../_base/declare", "./Source"], function(declare, Source){
	/*===== Source = dojo.dnd.Source =====*/
	return declare("dojo.dnd.AutoSource", Source, {
		// summary:
		//		a source that syncs its DnD nodes by default

		constructor: function(/*===== node, params =====*/){
			// summary:
			//		constructor of the AutoSource --- see the Source constructor for details
			this.autoSync = true;
		}
	});
});

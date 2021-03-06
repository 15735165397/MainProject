/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

/**
 * @param object THREE.Object3D
 * @param attributeName string
 * @param newValue integer representing a hex color value
 * @constructor
 */

var SetMaterialColorCommand = function ( object, attributeName, newValue ) {

	Command.call( this );

	this.type = 'SetMaterialColorCommand';
	this.name = 'Set Material.' + attributeName;
	this.updatable = true;

	this.object = object;
	this.attributeName = attributeName;
	this.oldValue = ( object !== undefined ) ? this.object.material[ this.attributeName ].getHex() : undefined;
	this.newValue = newValue;

};

SetMaterialColorCommand.prototype = {

	execute: function () {

			this.object.material[ this.attributeName ].setHex( this.newValue );
			this.show.signals.materialChanged.dispatch( this.object.material );

	},

	undo: function () {

			this.object.material[ this.attributeName ].setHex( this.oldValue );
			this.show.signals.materialChanged.dispatch( this.object.material );
	},

	update: function ( cmd ) {

		this.newValue = cmd.newValue;

	}

};

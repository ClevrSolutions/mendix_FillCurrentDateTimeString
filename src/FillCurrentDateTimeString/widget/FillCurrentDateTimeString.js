define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",

    "dojo/dom-style",
    "FillCurrentDateTimeString/lib/moment"
], function (declare, _WidgetBase, dojoStyle, moment) {
    "use strict";

    return declare("FillCurrentDateTimeString.widget.FillCurrentDateTimeString", [ _WidgetBase ], {

        // widget parameters
        datetimeAttribute: null,
        datetimeFormat: null,

        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
        },

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._updateRendering(callback);
        },

        resize: function (box) {
          logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            dojoStyle.set(this.domNode, "display", "none");

            if (this._contextObj !== null) {
                var datetimeString = moment().format( this.datetimeFormat ); 
                this._contextObj.set( this.datetimeAttribute, datetimeString);
            } 

            this._executeCallback(callback, "_updateRendering");
        },

        // Shorthand for executing a callback, adds logging to your inspector
        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["FillCurrentDateTimeString/widget/FillCurrentDateTimeString"]);

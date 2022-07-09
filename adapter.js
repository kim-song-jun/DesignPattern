var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Usb = /** @class */ (function () {
    function Usb(type) {
        this._type = type;
    }
    Usb.prototype.getType = function () {
        return this._type;
    };
    Usb.prototype.setType = function (type) {
        this._type = type;
    };
    return Usb;
}());
var UsbTypeB = /** @class */ (function () {
    function UsbTypeB() {
    }
    UsbTypeB.prototype.get_Btype = function () {
        return new Usb("B");
    };
    return UsbTypeB;
}());
// class adapter
var BtoC_ClassAdapter = /** @class */ (function (_super) {
    __extends(BtoC_ClassAdapter, _super);
    function BtoC_ClassAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BtoC_ClassAdapter.prototype.get_Ctype = function () {
        return this.convertType(this.get_Btype(), "C");
    };
    BtoC_ClassAdapter.prototype.convertType = function (usb, type) {
        usb.setType(type);
        return usb;
    };
    return BtoC_ClassAdapter;
}(UsbTypeB));
// Object adapter
var BtoC_ObjevtAdapter = /** @class */ (function () {
    function BtoC_ObjevtAdapter(usbTypeB) {
        this._usbTypeB = usbTypeB;
    }
    BtoC_ObjevtAdapter.prototype.get_Ctype = function () {
        return this.convertType(this._usbTypeB.get_Btype(), "C");
    };
    BtoC_ObjevtAdapter.prototype.convertType = function (usb, type) {
        usb.setType(type);
        return usb;
    };
    return BtoC_ObjevtAdapter;
}());
// class adapter
var classAdapter = new BtoC_ClassAdapter();
console.log("Current USB Type: ".concat(classAdapter.get_Ctype().getType()));
// objevt adapter
var usbTypeB = new UsbTypeB();
console.log("Current USB Type: ".concat(usbTypeB.get_Btype().getType()));
var objevtAdapter = new BtoC_ObjevtAdapter(usbTypeB);
console.log("Current USB Type: ".concat(objevtAdapter.get_Ctype().getType()));

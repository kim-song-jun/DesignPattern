class Usb{
  private _type: String
  constructor(type) {
    this._type = type
  }
  getType(): String {
    return this._type
  }
  setType(type): void {
    this._type = type
  }
}

class UsbTypeB{
  get_Btype(): Usb {
    return new Usb("B")
  }
}

interface BtoC_Adapter{
  get_Ctype(): Usb;
}

// class adapter
class BtoC_ClassAdapter extends UsbTypeB implements BtoC_Adapter{
  get_Ctype() {
    return this.convertType(this.get_Btype(), "C");
  }
  convertType(usb, type) {
    usb.setType(type)
    return usb
  }
}

// Object adapter
class BtoC_ObjevtAdapter implements BtoC_Adapter{
  private _usbTypeB: UsbTypeB
  constructor(usbTypeB) {
    this._usbTypeB = usbTypeB
  }
  get_Ctype(): Usb {
    return this.convertType(this._usbTypeB.get_Btype(),"C")
  }
  convertType(usb, type) {
    usb.setType(type)
    return usb
  }
}

// class adapter
const classAdapter = new BtoC_ClassAdapter()
console.log(`Current USB Type: ${classAdapter.get_Ctype().getType()}`)

// objevt adapter
const usbTypeB = new UsbTypeB()
console.log(`Current USB Type: ${usbTypeB.get_Btype().getType()}`)

const objevtAdapter = new BtoC_ObjevtAdapter(usbTypeB)
console.log(`Current USB Type: ${objevtAdapter.get_Ctype().getType()}`)
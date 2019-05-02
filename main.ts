enum Motor {
    CH0 = 0,
    CH1 = 1
}

enum Rotor_Direction {
    //% block="Forward-Open"
    Forward_Open = 0,
    //% block="Forward-Break"
    Forward_Break = 1,
    //% block="Reverse-Open"
    Reverse_Open = 2,
    //% block="Reverse-Break"
    Reverse_Break = 3,
    //% block="Open"
    Open = 4,
    //% block="Break"
    Break = 5
}

//% weight=70 icon="\uf075" color=#555555 block="コメント"
namespace comment {
    //% blockId=show_strings block="Init %v"
    //% tx.defl=SerialPin.P2
    //% rx.defl=SerialPin.P8
    export function init(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(
            tx,
            rx,
            BaudRate.BaudRate19200
        )
        let bufrini = pins.createBuffer(3);
        // setRotation
        bufrini.setNumber(NumberFormat.UInt8LE, 0, 0xA5);
        bufrini.setNumber(NumberFormat.UInt8LE, 1, 0xFE);
        bufrini.setNumber(NumberFormat.UInt8LE, 2, 0x00);
        serial.writeBuffer(bufrini)
        /*
                basic.pause(100)
                bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5);
                bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF);
                bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03);
                bufr.setNumber(NumberFormat.UInt8LE, 3, 0x41);
                bufr.setNumber(NumberFormat.UInt8LE, 4, 0x00);
                bufr.setNumber(NumberFormat.UInt8LE, 5, 0x32);
                serial.writeBuffer(bufr)
                basic.pause(100)
                */
    }

    //% blockId=lv8548dc_setrotation block="setRotation %v"
    export function setRotation(m: Motor, sel: Rotor_Direction): void {
        let bufr = pins.createBuffer(6);
        // setRotation
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5);
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF);
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03);
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x44);
        bufr.setNumber(NumberFormat.UInt8LE, 4, m);
        bufr.setNumber(NumberFormat.UInt8LE, 5, sel);
        serial.writeBuffer(bufr)
    }
}
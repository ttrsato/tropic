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

enum PWM_Freq {
    //% block="7.813kHz"
    DIV1_8 = 0,
    //% block="0.977kHz"
    DIV1_64 = 1,
    //% block="0.244kHz"
    DIV1_256 = 2,
    //% block="0.061kHz"
    DIV1_1024 = 3
}

enum ON_OFF_Flag {
    //% block="Stop"
    OFF = 0,
    //% block="Run"
    ON = 1
}

//% weight=70 icon="\uf075" color=#555555 block="LV8548"
namespace lv8548 {
    //% blockId=show_strings block="Init serial tx = %tx rx = %rx"
    //% tx.defl=SerialPin.P2
    //% rx.defl=SerialPin.P8
    export function init(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(
            tx,
            rx,
            BaudRate.BaudRate19200
        )
        let bufrini = pins.createBuffer(3)
    }

    //% blockId=lv8548dc_setrotation block="Set %ch motor to %sel"
    export function setRotation(ch: Motor, sel: Rotor_Direction): void {
        let bufr = pins.createBuffer(6);
        // setRotation
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x44)
        bufr.setNumber(NumberFormat.UInt8LE, 4, ch)
        bufr.setNumber(NumberFormat.UInt8LE, 5, sel)
        serial.writeBuffer(bufr)
    }

    //% blockId=lv8548dc_setctlvoltage block="Set %ch motor pwm duty = %duty"
    //% duty.min=0 duty.max=100
    export function setCtlVoltage(ch: Motor, duty: number): void {
        let bufr = pins.createBuffer(6);
        // setRotation
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x41)
        bufr.setNumber(NumberFormat.UInt8LE, 4, ch)
        bufr.setNumber(NumberFormat.UInt8LE, 5, duty)
        serial.writeBuffer(bufr)
    }

    //% blockId=lv8548dc_setpwmfreqency block="Set PWM frequency = %freq"
    export function setPWMFreqency(freq: PWM_Freq): void {
        let bufr = pins.createBuffer(5);
        // setRotation
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x67)
        bufr.setNumber(NumberFormat.UInt8LE, 4, freq)
        serial.writeBuffer(bufr)
    }

    //% blockId=lv8548dc_setstartflag block="%en %ch motor"
    export function setStartFlag(ch: Motor, en: ON_OFF_Flag): void {
        let bufr = pins.createBuffer(6);
        // setRotation
        bufr.setNumber(NumberFormat.UInt8LE, 0, 0xA5)
        bufr.setNumber(NumberFormat.UInt8LE, 1, 0xFF)
        bufr.setNumber(NumberFormat.UInt8LE, 2, 0x03)
        bufr.setNumber(NumberFormat.UInt8LE, 3, 0x68)
        bufr.setNumber(NumberFormat.UInt8LE, 4, ch)
        bufr.setNumber(NumberFormat.UInt8LE, 5, en)
        serial.writeBuffer(bufr)
    }
}
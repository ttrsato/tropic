// tests go here; this will not be compiled when this package is used as a library
basic.forever(() => {
    lv8548.init(SerialPin.P0, SerialPin.P1)
    lv8548.setRotation(Motor.CH0, Rotor_Direction.Forward_Open)
    lv8548.setCtlVoltage(Motor.CH0, 200)
})
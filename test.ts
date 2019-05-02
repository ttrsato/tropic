// tests go here; this will not be compiled when this package is used as a library
basic.forever(() => {
    comment.init(SerialPin.P0, SerialPin.P1)
    comment.setRotation(Motor.CH0, Rotor_Direction.Forward_Open)
})
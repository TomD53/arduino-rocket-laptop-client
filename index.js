const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');

ports = SerialPort.list().then((data) => {
    data.forEach(item => {
        console.log(item.path)
    })
});

const port_location = process.argv.slice(2)[0]

const port = new SerialPort(port_location, {
    baudRate: 115200
})

const parser = port.pipe(new Readline({ delimiter: '\n' }));

class DataPacket {
    constructor(...args) {
            [ 
                this.yaw, this.pitch, this.roll,
                this.aquart_x, this.aquart_y, this.aquart_z,
                this.pressure, this.altitude, this.temp
            ] = args
        }
}

port.on("open", () => {
    console.log('serial port open');
});

parser.on('data', csv_line => {
    data = csv_line.replace("\r", "").split(",")
    console.log(new DataPacket(...data))
});
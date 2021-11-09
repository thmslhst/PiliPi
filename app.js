/*
 *
 * @author >> Thomas Lhoest - tlhoest@gmail.com
 *
 * */

var rl = require('readline'),
    colors = require('colors'),
    rtpmidi = require('rtpmidi'),
    midi = require('midi/midi.js');

var session = rtpmidi.manager.createSession({
    localName: 'Pili Session',
    bonjourName: 'PiliPi',
    port: 5006
});

//rtpmidi.log.level = 4;

var input = new midi.input();

console.log('Welcome to PiliPi'.magenta.bold);
console.log('MIDI devices found :');
console.log('===================='.blue);

for(var i=0; i< input.getPortCount(); i++){
    console.log('('+i+') ' + input.getPortName(i).yellow.bold);
}

console.log('===================='.blue);

var i = rl.createInterface(process.stdin, process.stdout, null);
i.question('Select device (ex: 0, 1) : '.magenta.bold, function(nb) {

    console.log('Input '.trap + nb + ' ready'.trap);
    input.openPort(parseInt(nb));

    i.close();
    process.stdin.destroy();
});

session.on('ready', function() {
    input.on('message', function(deltaTime, m) {
        session.sendMessage(m);
    });
});

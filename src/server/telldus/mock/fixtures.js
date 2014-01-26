var fixtures = [
    {
        name: 'Taklampe gang',
        id: 1,
        methods: [ 'TURNON', 'TURNOFF', 'LEARN' ],
        model: 'selflearning-switch',
        protocol: 'arctech',
        type: 'DEVICE',
        status: { name: 'OFF' }
    }, {
        name: 'Soverom',
        id: 2,
        methods: [ 'TURNON', 'TURNOFF', 'LEARN' ],
        model: 'selflearning-switch',
        protocol: 'arctech',
        type: 'DEVICE',
        status: { name: 'OFF' }
    }, {
        name: 'Kjokkenvask',
        id: 3,
        methods: [ 'TURNON', 'TURNOFF', 'LEARN' ],
        model: 'selflearning-switch',
        protocol: 'arctech',
        type: 'DEVICE',
        status: { name: 'ON' }
    }, {
        name: 'Stue',
        id: 4,
        methods: [ 'TURNON', 'TURNOFF', 'DIM', 'LEARN' ],
        model: 'selflearning-dimmer',
        protocol: 'arctech',
        type: 'DEVICE',
        status: { name: 'ON' }
    }
];

module.exports = fixtures;


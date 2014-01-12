var fixtures = [
    {
        name: 'Taklampe gang',
        id: 1,
        methods: [ 'TURNON', 'TURNOFF' ],
        model: 'selflearning-switch',
        type: 'DEVICE',
        status: { status: 'OFF' } 
    }, {
        name: 'Soverom',
        id: 2,
        methods: [ 'TURNON', 'TURNOFF' ],
        model: 'selflearning-switch',
        type: 'DEVICE',
        status: { status: 'OFF' }
    }, {
        name: 'Kjokkenvask',
        id: 3,
        methods: [ 'TURNON', 'TURNOFF' ],
        model: 'selflearning-switch',
        type: 'DEVICE',
        status: { status: 'OFF' } 
    }, {
        name: 'Stue',
        id: 4,
        methods: [ 'TURNON', 'TURNOFF', 'DIM' ],
        model: 'selflearning-dimmer',
        type: 'DEVICE',
        status: { status: 'DIM', level: '100' }
    }
];

exports.fixtures = fixtures;
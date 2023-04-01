import {User, Event} from "../Common/Types";

let rawEventMockData: Event[] = [
    {
        id: '21',
        name: 'Tackfest',
        date: '4/19/2022',
        capacity: 43,
        cost: 3,
        participants: []
    },
    {
        id: '50',
        name: 'Tackfest',
        date: '10/5/2022',
        capacity: 50,
        cost: 2,
        participants: []
    },
    {
        id: '63',
        name: 'Tackfest',
        date: '5/26/2022',
        capacity: 60,
        cost: 3,
        participants: []
    },
    {
        id: '8',
        name: 'Tackfest',
        date: '4/22/2022',
        capacity: 54,
        cost: 3,
        participants: []
    },
    {
        id: '44',
        name: 'Tackfest',
        date: '3/28/2023',
        capacity: 49,
        cost: 2,
        participants: []
    },
    {
        id: '87',
        name: 'Tackfest',
        date: '7/31/2022',
        capacity: 52,
        cost: 2,
        participants: []
    },
    {
        id: '27',
        name: 'Tackfest',
        date: '4/21/2022',
        capacity: 48,
        cost: 3,
        participants: []
    },
    {
        id: '43',
        name: 'Tackfest',
        date: '8/6/2022',
        capacity: 43,
        cost: 2,
        participants: []
    },
    {
        id: '66',
        name: 'Tackfest',
        date: '5/27/2022',
        capacity: 52,
        cost: 1,
        participants: []
    },
    {
        id: '2',
        name: 'Tackfest',
        date: '7/31/2022',
        capacity: 48,
        cost: 3,
        participants: []
    },
    {
        id: '37',
        name: 'Tackfest',
        date: '4/18/2022',
        capacity: 44,
        cost: 3,
        participants: []
    },
    {
        id: '67',
        name: 'Tackfest',
        date: '5/4/2022',
        capacity: 40,
        cost: 3,
        participants: []
    },
    {
        id: '86',
        name: 'Tackfest',
        date: '7/11/2022',
        capacity: 48,
        cost: 1,
        participants: []
    },
    {
        id: '18',
        name: 'Tackfest',
        date: '5/18/2022',
        capacity: 53,
        cost: 2,
        participants: []
    },
    {
        id: '31',
        name: 'Tackfest',
        date: '10/4/2022',
        capacity: 46,
        cost: 2,
        participants: []
    },
    {
        id: '37',
        name: 'Tackfest',
        date: '5/4/2022',
        capacity: 57,
        cost: 1,
        participants: []
    },
    {
        id: '67',
        name: 'Tackfest',
        date: '6/20/2022',
        capacity: 51,
        cost: 1,
        participants: []
    },
    {
        id: '52',
        name: 'Tackfest',
        date: '9/15/2022',
        capacity: 58,
        cost: 1,
        participants: []
    },
    {
        id: '4',
        name: 'Tackfest',
        date: '2/12/2023',
        capacity: 56,
        cost: 1,
        participants: []
    },
    {
        id: '18',
        name: 'Tackfest',
        date: '1/6/2023',
        capacity: 52,
        cost: 2,
        participants: []
    },
    {
        id: '37',
        name: 'Tackfest',
        date: '1/15/2023',
        capacity: 42,
        cost: 1,
        participants: []
    },
    {
        id: '26',
        name: 'Tackfest',
        date: '6/14/2022',
        capacity: 44,
        cost: 2,
        participants: []
    },
    {
        id: '62',
        name: 'Tackfest',
        date: '5/29/2022',
        capacity: 47,
        cost: 1,
        participants: []
    },
    {
        id: '3',
        name: 'Tackfest',
        date: '10/21/2022',
        capacity: 42,
        cost: 3,
        participants: []
    },
    {
        id: '39',
        name: 'Tackfest',
        date: '8/29/2022',
        capacity: 49,
        cost: 3,
        participants: []
    },
    {
        id: '41',
        name: 'Tackfest',
        date: '5/8/2022',
        capacity: 60,
        cost: 2,
        participants: []
    },
    {
        id: '49',
        name: 'Tackfest',
        date: '2/26/2023',
        capacity: 51,
        cost: 3,
        participants: []
    },
    {
        id: '81',
        name: 'Tackfest',
        date: '6/14/2022',
        capacity: 58,
        cost: 2,
        participants: []
    },
    {
        id: '92',
        name: 'Tackfest',
        date: '4/11/2022',
        capacity: 51,
        cost: 2,
        participants: []
    },
    {
        id: '35',
        name: 'Tackfest',
        date: '6/25/2022',
        capacity: 49,
        cost: 1,
        participants: []
    }
];

let userMockData = [
    {
        id: '67',
        isForeman: true,
        isAdmin: false,
        firstName: 'Maria',
        lastName: 'Cogin',
        email: 'mcogin0@weibo.com',
        foodPreferences: ['ingen'],
        balance: 4
    },
    {
        id: '3',
        isForeman: false,
        isAdmin: false,
        firstName: 'Elmo',
        lastName: 'Maypother',
        email: 'emaypother1@mapy.cz',
        foodPreferences: ['gluten'],
        balance: 5
    },
    {
        id: '8',
        isForeman: false,
        isAdmin: true,
        firstName: 'Cyndie',
        lastName: 'Bowhay',
        email: 'cbowhay2@cam.ac.uk',
        foodPreferences: ['gluten'],
        balance: 4
    },
    {
        id: '22',
        isForeman: false,
        isAdmin: false,
        firstName: 'Kimberley',
        lastName: 'Bente',
        email: 'kbente3@google.com',
        foodPreferences: ['laktos'],
        balance: 2
    },
    {
        id: '36',
        isForeman: false,
        isAdmin: true,
        firstName: 'Christa',
        lastName: 'Emett',
        email: 'cemett4@who.int',
        foodPreferences: ['gluten'],
        balance: 3
    },
    {
        id: '5',
        isForeman: false,
        isAdmin: true,
        firstName: 'Giacinta',
        lastName: 'Boot',
        email: 'gboot5@ezinearticles.com',
        foodPreferences: ['ingen'],
        balance: 1
    },
    {
        id: '2',
        isForeman: true,
        isAdmin: true,
        firstName: 'Tyson',
        lastName: 'Manolov',
        email: 'tmanolov6@gnu.org',
        foodPreferences: ['ingen'],
        balance: 3
    },
    {
        id: '20',
        isForeman: true,
        isAdmin: false,
        firstName: 'Pooh',
        lastName: 'Liddle',
        email: 'pliddle7@google.com.br',
        foodPreferences: ['gluten'],
        balance: 1
    },
    {
        id: '66',
        isForeman: false,
        isAdmin: true,
        firstName: 'Brianna',
        lastName: 'Chatterton',
        email: 'bchatterton8@salon.com',
        foodPreferences: ['gluten'],
        balance: 5
    },
    {
        id: '93',
        isForeman: true,
        isAdmin: false,
        firstName: 'Betty',
        lastName: 'Beynon',
        email: 'bbeynon9@bbb.org',
        foodPreferences: ['ingen'],
        balance: 1
    },
    {
        id: '96',
        isForeman: false,
        isAdmin: false,
        firstName: 'Karrah',
        lastName: 'Reid',
        email: 'kreida@barnesandnoble.com',
        foodPreferences: ['ingen'],
        balance: 5
    },
    {
        id: '69',
        isForeman: true,
        isAdmin: true,
        firstName: 'Jobye',
        lastName: 'Guido',
        email: 'jguidob@mtv.com',
        foodPreferences: ['ingen'],
        balance: 4
    },
    {
        id: '32',
        isForeman: false,
        isAdmin: true,
        firstName: 'Dominick',
        lastName: 'Leppington',
        email: 'dleppingtonc@ask.com',
        foodPreferences: ['vegan'],
        balance: 1
    },
    {
        id: '19',
        isForeman: false,
        isAdmin: false,
        firstName: 'Wilek',
        lastName: 'Hindes',
        email: 'whindesd@buzzfeed.com',
        foodPreferences: ['gluten'],
        balance: 3
    },
    {
        id: '14',
        isForeman: true,
        isAdmin: true,
        firstName: 'Erik',
        lastName: 'Bricknall',
        email: 'ebricknalle@noaa.gov',
        foodPreferences: ['gluten'],
        balance: 5
    },
    {
        id: '68',
        isForeman: false,
        isAdmin: false,
        firstName: 'Delila',
        lastName: 'Tremlett',
        email: 'dtremlettf@sohu.com',
        foodPreferences: ['gluten'],
        balance: 5
    },
    {
        id: '96',
        isForeman: true,
        isAdmin: true,
        firstName: 'Malina',
        lastName: 'Padmore',
        email: 'mpadmoreg@skype.com',
        foodPreferences: ['ingen'],
        balance: 4
    },
    {
        id: '17',
        isForeman: false,
        isAdmin: false,
        firstName: 'Natty',
        lastName: 'Richardot',
        email: 'nrichardoth@bbb.org',
        foodPreferences: ['vegan'],
        balance: 3
    },
    {
        id: '74',
        isForeman: true,
        isAdmin: false,
        firstName: 'Ernest',
        lastName: 'Keeltagh',
        email: 'ekeeltaghi@comsenz.com',
        foodPreferences: ['laktos'],
        balance: 4
    },
    {
        id: '27',
        isForeman: false,
        isAdmin: false,
        firstName: 'Callida',
        lastName: 'Shrimpling',
        email: 'cshrimplingj@webmd.com',
        foodPreferences: ['ingen'],
        balance: 4
    },
    {
        id: '8',
        isForeman: true,
        isAdmin: true,
        firstName: 'Parker',
        lastName: 'Stennett',
        email: 'pstennettk@github.com',
        foodPreferences: ['gluten'],
        balance: 3
    },
    {
        id: '79',
        isForeman: false,
        isAdmin: true,
        firstName: 'Sauncho',
        lastName: 'Jakubski',
        email: 'sjakubskil@webeden.co.uk',
        foodPreferences: ['vegan'],
        balance: 1
    },
    {
        id: '64',
        isForeman: true,
        isAdmin: false,
        firstName: 'Risa',
        lastName: 'Brion',
        email: 'rbrionm@army.mil',
        foodPreferences: ['ingen'],
        balance: 1
    },
    {
        id: '3',
        isForeman: true,
        isAdmin: true,
        firstName: 'Terencio',
        lastName: 'Demschke',
        email: 'tdemschken@tumblr.com',
        foodPreferences: ['laktos'],
        balance: 4
    },
    {
        id: '54',
        isForeman: true,
        isAdmin: true,
        firstName: 'Bendick',
        lastName: 'Benet',
        email: 'bbeneto@acquirethisname.com',
        foodPreferences: ['laktos'],
        balance: 3
    },
    {
        id: '60',
        isForeman: true,
        isAdmin: true,
        firstName: 'Blair',
        lastName: 'Chatenet',
        email: 'bchatenetp@1688.com',
        foodPreferences: ['ingen'],
        balance: 1
    },
    {
        id: '18',
        isForeman: true,
        isAdmin: true,
        firstName: 'Pavla',
        lastName: 'Klosges',
        email: 'pklosgesq@cbc.ca',
        foodPreferences: ['gluten'],
        balance: 1
    },
    {
        id: '28',
        isForeman: false,
        isAdmin: false,
        firstName: 'Cordey',
        lastName: 'Hatch',
        email: 'chatchr@un.org',
        foodPreferences: ['gluten'],
        balance: 2
    },
    {
        id: '10',
        isForeman: false,
        isAdmin: true,
        firstName: 'Dyna',
        lastName: 'Moulder',
        email: 'dmoulders@foxnews.com',
        foodPreferences: ['vegan'],
        balance: 2
    },
    {
        id: '22',
        isForeman: false,
        isAdmin: false,
        firstName: 'Franklyn',
        lastName: 'Kleingrub',
        email: 'fkleingrubt@usatoday.com',
        foodPreferences: ['laktos'],
        balance: 3
    },
    {
        id: '1',
        isForeman: false,
        isAdmin: true,
        firstName: 'Dickie',
        lastName: 'Kee',
        email: 'dkeeu@acquirethisname.com',
        foodPreferences: ['ingen'],
        balance: 4
    },
    {
        id: '31',
        isForeman: false,
        isAdmin: false,
        firstName: 'Filmer',
        lastName: 'Abbotson',
        email: 'fabbotsonv@homestead.com',
        foodPreferences: ['vegan'],
        balance: 3
    },
    {
        id: '71',
        isForeman: false,
        isAdmin: false,
        firstName: 'Rooney',
        lastName: 'Callaghan',
        email: 'rcallaghanw@cbslocal.com',
        foodPreferences: ['vegan'],
        balance: 3
    },
    {
        id: '81',
        isForeman: false,
        isAdmin: true,
        firstName: 'Caitlin',
        lastName: 'Bateson',
        email: 'cbatesonx@icio.us',
        foodPreferences: ['laktos'],
        balance: 4
    }
];

let eventMockData: Event[] = rawEventMockData.map(x => {
    x['participants'] = userMockData as User[];
    return x as Event;
});

export {userMockData, eventMockData};
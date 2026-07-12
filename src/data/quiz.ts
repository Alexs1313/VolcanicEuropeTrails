import type {QuizLevel} from '../types';

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    id: 'l1',
    title: 'Volcano Icons',
    description:
      'Test what you know about Europe’s volcanoes, crater lands, mountain peaks, and scenic viewpoints.',
    questions: [
      {
        id: 'l1q1',
        text: 'Which volcano is located in Sicily and is one of Europe’s most famous active volcanoes?',
        options: ['Teide', 'Mount Etna', 'Matterhorn', 'Triglav'],
        correctIndex: 1,
      },
      {
        id: 'l1q2',
        text: 'Which volcanic island is known for frequent glowing activity and dramatic night views?',
        options: ['Stromboli', 'Santorini', 'Furnas', 'Zugspitze'],
        correctIndex: 0,
      },
      {
        id: 'l1q3',
        text: 'Which volcano overlooks Naples and is historically connected with Pompeii?',
        options: ['Vulcano Island', 'Nisyros', 'Vesuvius', 'Timanfaya'],
        correctIndex: 2,
      },
      {
        id: 'l1q4',
        text: 'Which location is Spain’s highest peak?',
        options: ['Teide', 'Mont Blanc', 'Grossglockner', 'Picos de Europa'],
        correctIndex: 0,
      },
      {
        id: 'l1q5',
        text: 'Vulcano Island belongs to which island group?',
        options: ['Canary Islands', 'Aeolian Islands', 'Azores', 'Cyclades'],
        correctIndex: 1,
      },
      {
        id: 'l1q6',
        text: 'Which volcano is located on Tenerife?',
        options: ['Etna', 'Stromboli', 'Teide', 'Nea Kameni'],
        correctIndex: 2,
      },
      {
        id: 'l1q7',
        text: 'Which place is best described as a volcanic island with crater walks and sulfur landscapes?',
        options: [
          'Vulcano Island',
          'Trolltunga',
          'Tre Cime di Lavaredo',
          'Preikestolen',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l2',
    title: 'Crater Lands',
    description:
      'Explore sea-filled calderas, geothermal valleys, and dramatic crater landscapes across Europe.',
    questions: [
      {
        id: 'l2q1',
        text: 'Which location is a sea-filled volcanic caldera in Greece?',
        options: [
          'Santorini Caldera',
          'Furnas Valley',
          'Timanfaya National Park',
          'Picos de Europa',
        ],
        correctIndex: 0,
      },
      {
        id: 'l2q2',
        text: 'Which small volcanic island sits inside the Santorini Caldera?',
        options: ['Stromboli', 'Nea Kameni', 'Vulcano Island', 'Nisyros'],
        correctIndex: 1,
      },
      {
        id: 'l2q3',
        text: 'Which Greek island is known for the Stefanos Crater?',
        options: ['Nisyros', 'Crete', 'Corfu', 'Rhodes'],
        correctIndex: 0,
      },
      {
        id: 'l2q4',
        text: 'Timanfaya National Park is located on which island?',
        options: ['Tenerife', 'Lanzarote', 'Sicily', 'São Miguel'],
        correctIndex: 1,
      },
      {
        id: 'l2q5',
        text: 'Furnas Valley is known for what kind of natural activity?',
        options: [
          'Geothermal activity',
          'Alpine glaciers',
          'Desert dunes',
          'Fjord cliffs',
        ],
        correctIndex: 0,
      },
      {
        id: 'l2q6',
        text: 'Which location combines white villages, cliffs, sunset views, and a volcanic caldera?',
        options: [
          'Santorini Caldera',
          'Zugspitze',
          'Matterhorn',
          'Grossglockner High Alpine Road',
        ],
        correctIndex: 0,
      },
      {
        id: 'l2q7',
        text: 'Which crater land is located in the Azores?',
        options: [
          'Timanfaya National Park',
          'Furnas Valley',
          'Nea Kameni',
          'Santorini Caldera',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'l3',
    title: 'High Peaks',
    description:
      'From pyramid-shaped summits to national symbols — test your knowledge of Europe’s highest mountains.',
    questions: [
      {
        id: 'l3q1',
        text: 'Which mountain is famous for its sharp pyramid shape?',
        options: ['Matterhorn', 'Vesuvius', 'Teide', 'Meteora'],
        correctIndex: 0,
      },
      {
        id: 'l3q2',
        text: 'Which peak is the highest mountain in the Alps?',
        options: ['Zugspitze', 'Mont Blanc', 'Triglav', 'Tre Cime di Lavaredo'],
        correctIndex: 1,
      },
      {
        id: 'l3q3',
        text: 'Which mountain is the highest peak in Germany?',
        options: ['Matterhorn', 'Zugspitze', 'Mont Blanc', 'Picos de Europa'],
        correctIndex: 1,
      },
      {
        id: 'l3q4',
        text: 'Which mountain is a national symbol of Slovenia?',
        options: ['Triglav', 'Teide', 'Stromboli', 'Trolltunga'],
        correctIndex: 0,
      },
      {
        id: 'l3q5',
        text: 'Tre Cime di Lavaredo is located in which mountain region?',
        options: [
          'Dolomites',
          'Pyrenees',
          'Carpathians',
          'Scottish Highlands',
        ],
        correctIndex: 0,
      },
      {
        id: 'l3q6',
        text: 'Which high peak area is strongly connected with Chamonix and Courmayeur?',
        options: ['Mont Blanc', 'Zugspitze', 'Triglav', 'Nisyros'],
        correctIndex: 0,
      },
      {
        id: 'l3q7',
        text: 'Which mountain is shared by Switzerland and Italy?',
        options: ['Matterhorn', 'Vesuvius', 'Timanfaya', 'Furnas Valley'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l4',
    title: 'Scenic Cliffs',
    description:
      'Rock tongues, pulpits, and alpine roads — how well do you know Europe’s most dramatic viewpoints?',
    questions: [
      {
        id: 'l4q1',
        text: 'Which Norwegian viewpoint is shaped like a dramatic rock tongue above a lake?',
        options: ['Trolltunga', 'Preikestolen', 'Meteora', 'Triglav'],
        correctIndex: 0,
      },
      {
        id: 'l4q2',
        text: 'Which location is also known as Pulpit Rock?',
        options: [
          'Grossglockner',
          'Preikestolen',
          'Trolltunga',
          'Matterhorn',
        ],
        correctIndex: 1,
      },
      {
        id: 'l4q3',
        text: 'Picos de Europa is mainly known as what type of destination?',
        options: [
          'Mountain range',
          'Volcanic island',
          'City viewpoint',
          'Desert crater',
        ],
        correctIndex: 0,
      },
      {
        id: 'l4q4',
        text: 'Which Greek destination is famous for huge rock pillars and monasteries?',
        options: [
          'Nisyros',
          'Meteora Viewpoints',
          'Santorini Caldera',
          'Nea Kameni',
        ],
        correctIndex: 1,
      },
      {
        id: 'l4q5',
        text: 'Grossglockner High Alpine Road is located in which country?',
        options: ['Norway', 'Austria', 'Spain', 'Greece'],
        correctIndex: 1,
      },
      {
        id: 'l4q6',
        text: 'Which scenic cliff overlooks Lysefjord?',
        options: [
          'Preikestolen',
          'Trolltunga',
          'Tre Cime di Lavaredo',
          'Teide',
        ],
        correctIndex: 0,
      },
      {
        id: 'l4q7',
        text: 'Which location is best for a scenic alpine road experience rather than a single walking trail?',
        options: [
          'Grossglockner High Alpine Road',
          'Nisyros Volcano',
          'Stromboli',
          'Santorini Caldera',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l5',
    title: 'Travel Safety & Route Knowledge',
    description:
      'Craters, cliffs, and remote trails demand respect. Test your travel safety knowledge before you go.',
    questions: [
      {
        id: 'l5q1',
        text: 'What should travelers check before starting a mountain or volcanic route?',
        options: [
          'Only the nearest cafe',
          'Trail length, weather, access, and route status',
          'The number of photos online',
          'The color of the rocks',
        ],
        correctIndex: 1,
      },
      {
        id: 'l5q2',
        text: 'Why is it important to stay on marked paths near craters and cliffs?',
        options: [
          'The view is always worse outside the path',
          'The ground can be unstable or unsafe',
          'It makes the trip shorter',
          'It avoids seeing other tourists',
        ],
        correctIndex: 1,
      },
      {
        id: 'l5q3',
        text: 'What is a smart item to save before visiting remote mountain areas?',
        options: [
          'Offline map and coordinates',
          'Random screenshots',
          'Restaurant playlist',
          'Hotel logo',
        ],
        correctIndex: 0,
      },
      {
        id: 'l5q4',
        text: 'What kind of shoes are best for volcanic rocks and mountain trails?',
        options: [
          'Slippers',
          'Smooth city shoes',
          'Hiking shoes with good grip',
          'Open sandals',
        ],
        correctIndex: 2,
      },
      {
        id: 'l5q5',
        text: 'Why should travelers be careful around steam vents and geothermal areas?',
        options: [
          'They are always artificial',
          'The surface may be hot, fragile, or restricted',
          'They are only dangerous at night',
          'They are usually fake',
        ],
        correctIndex: 1,
      },
      {
        id: 'l5q6',
        text: 'What is a good reason to start longer routes earlier in the day?',
        options: [
          'More time to return before dark',
          'Fewer maps are needed',
          'Rocks are softer in the morning',
          'Phones charge faster outside',
        ],
        correctIndex: 0,
      },
      {
        id: 'l5q7',
        text: 'What should users do if a volcanic or mountain path is closed?',
        options: [
          'Ignore the sign',
          'Climb around the barrier',
          'Follow local restrictions and choose another route',
          'Wait until nobody is watching',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'l6',
    title: 'Island Volcanoes',
    description:
      'Black terrain, glowing craters, and sea-born silhouettes — test your island volcano knowledge.',
    questions: [
      {
        id: 'l6q1',
        text: 'Which island is home to Mount Teide?',
        options: ['Sicily', 'Tenerife', 'Santorini', 'Lanzarote'],
        correctIndex: 1,
      },
      {
        id: 'l6q2',
        text: 'Which volcanic island is part of the Aeolian Islands?',
        options: ['Stromboli', 'Madeira', 'Mallorca', 'Crete'],
        correctIndex: 0,
      },
      {
        id: 'l6q3',
        text: 'Which location is known for black volcanic terrain and red crater landscapes?',
        options: [
          'Timanfaya National Park',
          'Mont Blanc',
          'Meteora',
          'Zugspitze',
        ],
        correctIndex: 0,
      },
      {
        id: 'l6q4',
        text: 'Which Greek island destination includes a famous volcanic caldera?',
        options: ['Santorini', 'Corfu', 'Zakynthos', 'Mykonos'],
        correctIndex: 0,
      },
      {
        id: 'l6q5',
        text: 'Which place is best connected with geothermal springs and green volcanic scenery?',
        options: ['Furnas Valley', 'Trolltunga', 'Matterhorn', 'Preikestolen'],
        correctIndex: 0,
      },
      {
        id: 'l6q6',
        text: 'Which island volcano is known for crater walks and sulfur-like volcanic atmosphere?',
        options: [
          'Vulcano Island',
          'Tre Cime di Lavaredo',
          'Triglav',
          'Grossglockner',
        ],
        correctIndex: 0,
      },
      {
        id: 'l6q7',
        text: 'Which volcano rises directly from the sea as a dramatic island silhouette?',
        options: ['Stromboli', 'Vesuvius', 'Zugspitze', 'Picos de Europa'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l7',
    title: 'Maps & Coordinates',
    description:
      'Pins, coordinates, and location cards — test how well you know the Interactive Map.',
    questions: [
      {
        id: 'l7q1',
        text: 'What is the main purpose of the Interactive Map?',
        options: [
          'To show all locations visually',
          'To replace all descriptions',
          'To create random routes',
          'To hide saved places',
        ],
        correctIndex: 0,
      },
      {
        id: 'l7q2',
        text: 'What information helps users find the exact position of a place?',
        options: ['Coordinates', 'Article title', 'Button color', 'App logo'],
        correctIndex: 0,
      },
      {
        id: 'l7q3',
        text: 'Which button should open a location on the map?',
        options: ['View on Map', 'Delete Trail', 'Start Timer', 'Spin Route'],
        correctIndex: 0,
      },
      {
        id: 'l7q4',
        text: 'What should happen when a user taps a map pin?',
        options: [
          'A short location card should open',
          'The app should close',
          'The location should disappear',
          'The quiz should restart',
        ],
        correctIndex: 0,
      },
      {
        id: 'l7q5',
        text: 'Which location type benefits most from map view?',
        options: [
          'Travel destinations',
          'Button labels',
          'Loading text',
          'Font styles',
        ],
        correctIndex: 0,
      },
      {
        id: 'l7q6',
        text: 'Why are coordinates useful for mountain and volcano places?',
        options: [
          'They help locate remote spots clearly',
          'They change the weather',
          'They replace safety tips',
          'They unlock hidden points',
        ],
        correctIndex: 0,
      },
      {
        id: 'l7q7',
        text: 'What should a location card on the map include?',
        options: [
          'Name, category, and detail action',
          'Only a random icon',
          'Only a long article',
          'Only a blank image',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l8',
    title: 'Travel Notes Knowledge',
    description:
      'Crater views, lava fields, and sunset moments — test your knowledge of the app’s Travel Notes.',
    questions: [
      {
        id: 'l8q1',
        text: 'What are Travel Notes mainly used for?',
        options: [
          'Short articles about landscapes and routes',
          'User account settings',
          'Random jokes',
          'Payment history',
        ],
        correctIndex: 0,
      },
      {
        id: 'l8q2',
        text: 'Which topic fits Travel Notes best?',
        options: [
          'Crater views and volcanic landscapes',
          'Casino bonuses',
          'Shopping coupons',
          'City traffic fines',
        ],
        correctIndex: 0,
      },
      {
        id: 'l8q3',
        text: 'Why are sunset viewpoints often mentioned in volcanic travel?',
        options: [
          'Warm light makes the terrain more dramatic',
          'Rocks become softer',
          'Trails become shorter',
          'Maps load faster',
        ],
        correctIndex: 0,
      },
      {
        id: 'l8q4',
        text: 'What can travelers learn from reading volcanic landscapes?',
        options: [
          'How craters, lava fields, and ridges formed the area',
          'How to build a hotel',
          'How to remove mountains',
          'How to change coordinates',
        ],
        correctIndex: 0,
      },
      {
        id: 'l8q5',
        text: 'Which landscape is usually linked with dark rocks and old lava flows?',
        options: ['Lava field', 'Snow beach', 'Sand castle', 'City square'],
        correctIndex: 0,
      },
      {
        id: 'l8q6',
        text: 'What makes coastal volcanic regions visually strong?',
        options: [
          'Contrast between dark land and blue water',
          'Lack of views',
          'Flat streets',
          'Indoor lighting',
        ],
        correctIndex: 0,
      },
      {
        id: 'l8q7',
        text: 'What is a good Travel Note topic for this app?',
        options: [
          'Planning a better mountain route',
          'How to win coins',
          'Best slot symbols',
          'Office keyboard shortcuts',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l9',
    title: 'Saved Spots',
    description:
      'Bookmarks, empty states, and future trips — test your knowledge of the Saved Spots feature.',
    questions: [
      {
        id: 'l9q1',
        text: 'What is the purpose of Saved Spots?',
        options: [
          'To keep favorite places for future trips',
          'To delete all locations',
          'To hide the map',
          'To skip onboarding',
        ],
        correctIndex: 0,
      },
      {
        id: 'l9q2',
        text: 'What should appear if there are no saved places?',
        options: [
          'Empty state screen',
          'Error screen only',
          'Random article',
          'Final quiz score',
        ],
        correctIndex: 0,
      },
      {
        id: 'l9q3',
        text: 'Which place can be saved by the user?',
        options: [
          'Mount Etna',
          'A loading spinner',
          'A blank button',
          'A font setting',
        ],
        correctIndex: 0,
      },
      {
        id: 'l9q4',
        text: 'What should users be able to do with saved places?',
        options: [
          'Add and remove them',
          'Convert them into coins',
          'Lock the map forever',
          'Delete the whole app',
        ],
        correctIndex: 0,
      },
      {
        id: 'l9q5',
        text: 'Which button fits an empty saved screen?',
        options: [
          'Explore Places',
          'Claim Bonus',
          'Start Slot',
          'Remove App',
        ],
        correctIndex: 0,
      },
      {
        id: 'l9q6',
        text: 'Why is Saved Spots useful for travel planning?',
        options: [
          'It creates a personal list of future places',
          'It changes the country names',
          'It removes location details',
          'It hides safety tips',
        ],
        correctIndex: 0,
      },
      {
        id: 'l9q7',
        text: 'What kind of illustration fits the empty saved screen?',
        options: [
          'Bookmark marker with mountain theme',
          'Casino wheel',
          'Coin pile',
          'Shopping cart',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l10',
    title: 'Mixed Europe Challenge',
    description:
      'A final mix of volcanoes, peaks, cliffs, and crater lands from across Europe. Good luck!',
    questions: [
      {
        id: 'l10q1',
        text: 'Which location is in Austria?',
        options: [
          'Grossglockner High Alpine Road',
          'Nisyros Volcano',
          'Furnas Valley',
          'Preikestolen',
        ],
        correctIndex: 0,
      },
      {
        id: 'l10q2',
        text: 'Which location is in Norway?',
        options: ['Trolltunga', 'Santorini Caldera', 'Teide', 'Triglav'],
        correctIndex: 0,
      },
      {
        id: 'l10q3',
        text: 'Which destination is in Slovenia?',
        options: ['Triglav', 'Stromboli', 'Timanfaya', 'Meteora'],
        correctIndex: 0,
      },
      {
        id: 'l10q4',
        text: 'Which location is connected with the Dolomites?',
        options: [
          'Tre Cime di Lavaredo',
          'Furnas Valley',
          'Vesuvius',
          'Nea Kameni',
        ],
        correctIndex: 0,
      },
      {
        id: 'l10q5',
        text: 'Which location is famous for cliffside monasteries and stone pillars?',
        options: [
          'Meteora Viewpoints',
          'Matterhorn',
          'Teide',
          'Vulcano Island',
        ],
        correctIndex: 0,
      },
      {
        id: 'l10q6',
        text: 'Which location is a German high mountain viewpoint?',
        options: ['Zugspitze', 'Stromboli', 'Santorini Caldera', 'Picos de Europa'],
        correctIndex: 0,
      },
      {
        id: 'l10q7',
        text: 'Which place is a Spanish mountain range rather than a single volcano?',
        options: [
          'Picos de Europa',
          'Vesuvius',
          'Nea Kameni',
          'Furnas Valley',
        ],
        correctIndex: 0,
      },
    ],
  },
];

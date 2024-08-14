import { v4 as uuidv4 } from 'uuid';

const users = [
  {
    uuid: uuidv4(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    username: 'johnnyD',
  },
  {
    uuid: uuidv4(),
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'securePass456',
    username: 'janeS',
  },
];

// Ensure that the tags reference valid user UUIDs from the users array
const tags = [
  {
    user_uuid: users[0].uuid, // References John Doe's UUID
    tag_name: 'Fitness',
    tag_color: '#FF5733',
  },
  {
    user_uuid: users[0].uuid, // References John Doe's UUID
    tag_name: 'Learning',
    tag_color: '#337AFF',
  },
  {
    user_uuid: users[1].uuid, // References Jane Smith's UUID
    tag_name: 'Wellness',
    tag_color: '#FFD700',
  },
  {
    user_uuid: users[1].uuid, // References Jane Smith's UUID
    tag_name: 'Health',
    tag_color: '#32CD32',
  },
];

const habits = [
  {
    uuid: uuidv4(),
    user_uuid: users[0].uuid, // References John Doe's UUID
    name: 'Morning Exercise',
    streak: 10,
    date_started: '2024-07-01',
    last_day_logged: '2024-07-10',
    behavior: 'Jogging for 30 minutes',
    time: '06:00:00', // Valid time format
    location: 'Neighborhood park',
    tag_name: 'Fitness',
    identity: 'An active person',
    days_of_week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    dates_repeated: [
      { date: '2024-07-01', count: 1 },
      { date: '2024-07-02', count: 1 },
      { date: '2024-07-03', count: 1 },
      { date: '2024-07-04', count: 1 },
      { date: '2024-07-05', count: 1 },
      { date: '2024-07-06', count: 1 },
      { date: '2024-07-07', count: 1 },
      { date: '2024-07-08', count: 1 },
      { date: '2024-07-09', count: 1 },
      { date: '2024-07-10', count: 1 },
    ],
  },
  {
    uuid: uuidv4(),
    user_uuid: users[0].uuid, // References John Doe's UUID
    name: 'Reading',
    streak: 5,
    date_started: '2024-07-05',
    last_day_logged: '2024-07-10',
    behavior: 'Reading 20 pages of a book',
    time: '20:00:00', // Valid time format
    location: 'Living room',
    tag_name: 'Learning',
    identity: 'A knowledgeable person',
    days_of_week: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat'],
    dates_repeated: [
      { date: '2024-07-05', count: 1 },
      { date: '2024-07-06', count: 1 },
      { date: '2024-07-07', count: 1 },
      { date: '2024-07-08', count: 1 },
      { date: '2024-07-10', count: 1 },
    ],
  },
  {
    uuid: uuidv4(),
    user_uuid: users[1].uuid, // References Jane Smith's UUID
    name: 'Meditation',
    streak: 20,
    description:
      'I will meditate for 15 mins every day to become a more mindful person',
    date_started: '2024-05-20',
    last_day_logged: '2024-07-10',
    behavior: 'meditate',
    time: '07:00:00', // Valid time format
    location: 'home office',
    tag_name: 'Wellness',
    identity: 'A mindful person',
    days_of_week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    dates_repeated: [
      { date: '2024-06-22', count: 5 },
      { date: '2024-06-23', count: 25 },
      { date: '2024-06-24', count: 3 },
      { date: '2024-06-25', count: 4 },
      { date: '2024-06-26', count: 2 },
      { date: '2024-06-27', count: 7 },
      { date: '2024-06-28', count: 2 },
      { date: '2024-06-29', count: 1 },
      { date: '2024-06-30', count: 1 },
      { date: '2024-07-01', count: 1 },
      { date: '2024-07-02', count: 1 },
      { date: '2024-07-03', count: 1 },
      { date: '2024-07-04', count: 1 },
      { date: '2024-07-05', count: 1 },
      { date: '2024-07-06', count: 1 },
      { date: '2024-07-07', count: 1 },
      { date: '2024-07-08', count: 1 },
      { date: '2024-07-09', count: 1 },
      { date: '2024-07-10', count: 1 },
    ],
  },
  {
    uuid: uuidv4(),
    user_uuid: users[1].uuid, // References Jane Smith's UUID
    name: 'Water Intake',
    streak: 15,
    date_started: '2024-06-25',
    last_day_logged: '2024-07-10',
    behavior: 'drink 8 glasses of water',
    time: null, // Set to null because it's not a specific time
    location: 'various locations',
    tag_name: 'Health',
    identity: 'A hydrated person',
    days_of_week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    dates_repeated: [
      { date: '2024-06-25', count: 1 },
      { date: '2024-06-26', count: 1 },
      { date: '2024-06-27', count: 1 },
      { date: '2024-06-28', count: 1 },
      { date: '2024-06-29', count: 1 },
      { date: '2024-06-30', count: 1 },
      { date: '2024-07-01', count: 1 },
      { date: '2024-07-02', count: 1 },
      { date: '2024-07-03', count: 1 },
      { date: '2024-07-04', count: 1 },
      { date: '2024-07-05', count: 1 },
      { date: '2024-07-06', count: 1 },
      { date: '2024-07-07', count: 1 },
      { date: '2024-07-08', count: 1 },
      { date: '2024-07-09', count: 1 },
      { date: '2024-07-10', count: 1 },
    ],
  },
];

export { users, tags, habits };

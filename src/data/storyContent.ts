// Every word on the site lives here, so messages can be edited without touching
// any layout or animation code.

export const chapters = [
  { id: 'begin', n: '01', title: 'Before the story began' },
  { id: 'classroom', n: '02', title: 'The classroom of 2017' },
  { id: 'voice', n: '03', title: 'Your voice' },
  { id: 'kapil', n: '04', title: 'The Kapil you know' },
  { id: 'letters', n: '05', title: "Letters that time couldn't erase" },
  { id: 'journey', n: '06', title: 'Hyderabad to Chennai' },
  { id: 'years', n: '07', title: 'Still in my mind' },
  { id: 'sky', n: '08', title: "Charitha's sky of lights" },
] as const;

export const hero = {
  lineOne: 'Every beautiful story has a beginning...',
  lineTwo: 'Somewhere in 2017.',
  lineThree:
    'Between 9th and 10th class, I met someone who would become one of the most special people in my life.',
  name: 'MADDIREVULA CHARITHA',
  years: '2017 — 2026',
  byline: 'A story remembered by Kapil.',
  cta: 'Begin Our Story',
  skipHint: 'Tap anywhere to continue',
};

export const classroom = {
  title: 'The classroom of 2017',
  scenes: [
    { image: 'exterior', caption: 'A school, early in the morning.' },
    { image: 'classroom', caption: 'A classroom, before anyone arrives.' },
    { image: 'benches', caption: 'Wooden benches that have heard everything.' },
    { image: 'blackboard', caption: 'A blackboard, and yesterday’s chalk.' },
    { image: 'notebooks', caption: 'Notebooks with our whole year inside them.' },
    { image: 'corridor', caption: 'The corridor, and the light along it.' },
    { image: 'window', caption: 'Afternoon, coming in through the windows.' },
    { image: 'bell', caption: 'And the bell, which always knew when to end things.' },
  ],
  narrative: [
    'It started in 2017, somewhere between 9th and 10th class.',
    'You were my classmate. I never imagined that an ordinary school year would give me memories I would carry so many years later.',
  ],
  drawings: [
    'The school, the way I remember the mornings.',
    'And the board, still saying 2017.',
    'Empty desks, and the fan still turning.',
    'The whole room, waiting for the bell.',
  ],
  notebookLabel: 'Class X · Rough Notebook',
  notebookName: 'Kapil',
  pages: [
    { heading: 'Page 1', lines: ['2017.', 'Somewhere between', '9th and 10th class.'] },
    { heading: 'Page 2', lines: ['You were my classmate.', 'That is how it begins.', 'That is really all it took.'] },
    { heading: 'Page 3', lines: ['It looked like an', 'ordinary school year.', 'It did not stay ordinary.'] },
    { heading: 'Page 4', lines: ['If you had told me then', 'I would still be writing', 'about it in 2026,', 'I would have made a joke.'] },
    { heading: 'Last page', lines: ['Turn the page, then.', 'The rest of it', 'is further down.'] },
  ],
};

export const voice = {
  title: 'Your voice, my favourite little memory',
  display: 'Some voices are not just heard. They become memories.',
  support:
    'I don’t know whether you realise how much I enjoy listening to you. Your words, your little sounds, your expressions — even the smallest things about your voice became special to me.',
  hint: 'Move your finger across the lines.',
};

export const kapil = {
  title: 'The Kapil you know',
  lead: 'A short chapter about the person who would not stop talking.',
  hint: 'Tap the bubbles. He has things to say.',
  bubbles: [
    { label: 'Kapil, still talking', reveal: 'Yes. I was talking. I am usually talking.' },
    { label: 'My jokes', reveal: 'You laughed at them. That only encouraged me.' },
    { label: 'The way I talk', reveal: 'You liked it. Nobody has managed to fix it since.' },
    { label: 'Funny conversations', reveal: 'I can’t list them. I only remember how easy they were.' },
    { label: 'You, listening', reveal: 'Patiently. Even when my story had no ending.' },
    { label: 'One more thing...', reveal: 'There is always one more thing. You knew that.' },
  ],
  main: 'Maybe I was just being Kapil. But you made that version of me feel even more special.',
  quiet:
    'Life has given me different kinds of memories, some beautiful and some difficult. After I lost my mother, the affection and care you showed me became something I will always value.',
};

export interface LetterContent {
  id: string;
  envelope: string;
  salutation: string;
  paragraphs: string[];
  signoff: string[];
}

export const letters = {
  title: 'Letters that time couldn’t erase',
  intro:
    'We wrote to each other by hand during school. Those letters were special, and I don’t have them any more.',
  hint: 'Open an envelope.',
  items: [
    {
      id: 'memory',
      envelope: 'A Memory From 2017',
      salutation: 'Dear Maddirevula Charitha,',
      paragraphs: [
        'I am writing this in 2026, about 2017. It is a strange thing to do, but I don’t have a better way of going back.',
        'We were between 9th and 10th class. You were my classmate. That is the whole beginning. There is no big scene to tell you about, and I am not going to make one up.',
        'What I do know is that a normal school year turned into something I kept.',
        'We used to write to each other, by hand, on real paper. I don’t have those letters any more, and I wish I did.',
        'So I am writing to you once more, the way we used to.',
      ],
      signoff: ['Kapil'],
    },
    {
      id: 'remember',
      envelope: 'Things I Still Remember',
      salutation: 'Dear Maddirevula Charitha,',
      paragraphs: [
        'Things I still remember, in no particular order.',
        'That you liked my jokes, and that I made more of them because of it.',
        'That you enjoyed the way I talk. Most people would have asked me to stop.',
        'That you would listen when I went on and on.',
        'Your voice. The little sounds you make in between your words. I have never been able to explain those to anyone, so I won’t try here.',
        'That you once said you would tell me how you truly felt.',
        'That you told me the kind of love Kapil gives is difficult to find, and that a future husband might not love someone in the same way. I know that was not a promise. I kept it anyway.',
        'That we wrote letters. They are gone now, but I remember that they were real.',
      ],
      signoff: ['That’s the list for now. It isn’t finished.', 'Kapil'],
    },
    {
      id: 'twenty-six',
      envelope: 'A Letter From Kapil in 2026',
      salutation: 'Dear Maddirevula Charitha,',
      paragraphs: [
        'School ended. College ended. We both work now. I am the same person who talked too much in class, only with more responsibilities and the same jokes.',
        'I want to say a few things plainly, because I have had nine years to think about them.',
        'I know how things stand. Marriage may not happen. Your family’s decisions matter to you, and I respect that, and I respect you for it. I am not writing this to change anything, and there is nothing here you need to answer.',
        'But I would be lying if I said I don’t still wish. If life ever gave another opportunity, I would want you to be my life partner. That is only the truth, and I would rather say it once, gently, than never say it.',
        'And if it never happens, you will still be my first love. That part is already decided.',
      ],
      signoff: ['Kapil', 'Diwali, 2026'],
    },
  ] as LetterContent[],
  open: 'Open letter',
  close: 'Fold it back',
};

export const journey = {
  title: 'Hyderabad to Chennai',
  from: 'HYDERABAD',
  to: 'CHENNAI',
  beats: [
    'There was a time when the thought of coming to Chennai meant something special to me.',
    'The thought of spending time together, sharing a hug, and being close to you became a memory I still carry with a smile.',
  ],
};

export const years = {
  title: '2017 to 2026: still in my mind',
  items: [
    { year: 2017, line: 'The year it started.', image: 'classroom' },
    { year: 2018, line: 'Another calendar on the wall.', image: 'notebooks' },
    { year: 2019, line: 'The years began moving faster.', image: 'corridor' },
    { year: 2020, line: 'The whole world went quiet for a while.', image: 'window' },
    { year: 2021, line: 'New places. New people.', image: 'college' },
    { year: 2022, line: 'Different days, the same memory.', image: 'road' },
    { year: 2023, line: 'Responsibilities grew.', image: 'work' },
    { year: 2024, line: 'The city kept its lights on.', image: 'city' },
    { year: 2025, line: 'Nearly nine years.', image: 'rail' },
    { year: 2026, line: 'And here we are.', image: 'lanterns' },
  ],
  passage: [
    'Nine years have passed.',
    'We have grown up. Our lives have changed. We have travelled through different chapters.',
    'But from 2017 to 2026, you have remained a special part of my memories.',
  ],
  eighty: 'If I live to be 80, and someone asks me about my first love, I will still remember you.',
};

export const finale = {
  oldName: 'Chennur',
  newName: 'Maddirevula',
  title: 'Charitha, this little sky is for you.',
  hint: 'Touch the lantern to light it',
  lanternLabel: 'Light the lantern',
  particleName: ['Maddirevula', 'Charitha'],
  greeting: 'HAPPY DIWALI!',
  message: [
    'Thank you for being such a beautiful part of my story.',
    'You made Kapil more special.',
    'And no matter how many years pass, the memories that began in 2017 will always have a little place in my heart.',
  ],
  closing: 'With love and warm wishes,',
  signature: 'KAPIL.',
  lastWords: 'I love you.',
  replay: 'Light it again',
};

export const ui = {
  menu: 'Chapters',
  openMenu: 'Open chapter list',
  closeMenu: 'Close chapter list',
  soundOn: 'Turn music on',
  soundOff: 'Turn music off',
  top: 'Back to top',
  credits: 'Picture credits',
  creditsNote: 'Photographs from Wikimedia Commons, used under the licences below. Music generated in the browser.',
};

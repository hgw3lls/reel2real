// js/question.js

/**
 * Question model
 * - questionText: string
 * - answers: { a:string, b:string, c:string, d:string }
 * - correctAnswer: "a" | "b" | "c" | "d"
 * - meta: { title: string, location: { name: string, image?: string } }
 */
class Question {
  constructor(questionText, answers, correctAnswer, meta = {}) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.meta = meta;
  }
  checkAnswer(answerKey) {
    return answerKey === this.correctAnswer;
  }
}

/* ==========
   YOUR DATA
   ==========
   Keep at least 10 films. We’ll randomly choose 10 each run.
*/
const films = [
  {
    title: "Kid From Cleveland",
    location: { 
      name: "Cleveland Museum of Art — Medieval Court, Well Head (Italy, Verona, 1400s) • 11150 East Blvd, Cleveland, OH 44106",
      image: "images/kfc-cma.png" 
    },
    questions: [
      "Which 1949 film featured scenes inside the Cleveland Museum of Art on East Blvd?",
      "Which movie placed a troubled teen beneath the marble arches of the Museum’s Medieval Court?",
      "Which film showed Cleveland’s Museum of Art as a place of redemption for a local boy?",
      "Which postwar drama used the Museum at 11150 East Blvd as a symbol of culture and order?",
      "Name the film that mixed Indians baseball with a visit to the Museum of Art’s galleries.",
      "Which movie had Cleveland’s mayor and the Museum in the same civic booster frame?",
      "Which film staged a turning point beside the Medieval Court’s Italian well head?",
      "What title contrasted the Museum’s Renaissance art with Cleveland street trouble?",
      "Which 1949 production marketed Cleveland using set pieces inside the Museum of Art?",
      "Which Republic Pictures release turned the Museum into a civic stage set for reform?"
    ]
  },
  {
    title: "The Fortune Cookie",
    location: { 
      name: "Cleveland Municipal Stadium (archival) • 1085 W. 3rd St, Cleveland, OH 44114",
      image: "images/fc-browns.png" 
    },
    questions: [
      "Which 1966 Billy Wilder comedy filmed at Cleveland Municipal Stadium on the lakefront?",
      "Which movie opened with an NFL game at the Browns’ old stadium at 1085 W. 3rd St?",
      "Which film starred Jack Lemmon and Walter Matthau at Municipal Stadium?",
      "Which film staged an injury scam during a football game at Cleveland’s stadium?",
      "Which comedy shows Lemmon being taken by ambulance out of Municipal Stadium?",
      "What movie turned the lakefront stadium into the launchpad for a courtroom caper?",
      "Which film used real Browns–Vikings footage spliced with shots inside the stadium?",
      "What Wilder film highlighted the west entrance and locker rooms of Municipal Stadium?",
      "Which 1966 production made Browns fans part of a con-game setting on the lakefront?",
      "Which film meticulously blended game film with staged stadium shots in Cleveland?"
    ]
  },
  {
    title: "Uptight",
    location: { 
      name: "Alhambra Apartments, Wade Park • 8616 Wade Park Ave, Cleveland, OH 44106",
      image: "images/u-alhambra-apt.png" 
    },
    questions: [
      "Which 1968 film shot key scenes at Cleveland’s Alhambra Apartments on Wade Park Avenue?",
      "What movie retold The Informer in Cleveland’s Hough neighborhood around Wade Park?",
      "Which film featured revolutionary meetings in an apartment block at 8616 Wade Park Ave?",
      "Which movie linked the Alhambra Apartments to the Black liberation struggle in Cleveland?",
      "Which film used the architecture of Wade Park to emphasize urban tension and betrayal?",
      "What 1968 drama shot at Alhambra symbolized a movement fracturing from within?",
      "Which film was both a Hollywood production and a Cleveland street-level document of unrest?",
      "Which movie intercut Alhambra interiors with tense exteriors in the Hough area?",
      "What film dramatized Black Power politics using Cleveland’s Wade Park built environment?",
      "Which Jules Dassin film staged its climax in and around the Alhambra Apartments?"
    ]
  },
  {
    title: "The Deer Hunter",
    location: { 
      name: "Lemko Hall • 2337 W. 14th St, Cleveland, OH 44113",
      image: "images/dh-lemko.png" 
    },
    questions: [
      "Which Vietnam epic begins with a wedding at Lemko Hall on West 14th Street?",
      "Before the steel mills and the war, the movie opened with a dance in Tremont—what film?",
      "Which film’s opening wedding reception at Lemko Hall lasts nearly an hour onscreen?",
      "Which movie juxtaposed Orthodox ritual at Lemko Hall with the chaos of combat later?",
      "Which Oscar winner cast Tremont’s Lemko Hall as home before Vietnam tears it apart?",
      "Which title anchored its portrait of friendship in a Lemko Hall celebration?",
      "Which 1978 classic treated Cleveland’s immigrant communities as its emotional core at Lemko Hall?",
      "Which film made Lemko Hall one of cinema’s most famous wedding venues?",
      "Which film begins in Tremont and ends in a silence of Russian roulette abroad?",
      "Which movie binds the memory of Lemko Hall to loss, ritual, and return?"
    ]
  },
  {
    title: "Stranger Than Paradise",
    location: { 
      name: "Greyhound Bus Station • 1465 Chester Ave, Cleveland, OH 44114",
      image: "images/stp-greyhoundstation.png" 
    },
    questions: [
      "Which 1984 indie turned Cleveland’s Greyhound Bus Station on Chester Ave into a deadpan backdrop?",
      "Jim Jarmusch’s early feature shot snowbound scenes near the bus terminal—what film?",
      "Which film showed arrivals and departures at the Chester Avenue Greyhound sign?",
      "Which minimalist movie found bleak comedy in long takes at the downtown bus station?",
      "Which indie frames Cleveland’s terminal as a waystation to nowhere in particular?",
      "Which film uses the bus station’s neon and concrete to underline its flat affect?",
      "Which title pairs a Hungarian cousin with Cleveland’s wintry bus station tableau?",
      "Which film’s Cleveland segment drifts from the terminal toward Lake Erie’s edge?",
      "Which black-and-white indie makes the bus station feel absurd yet familiar?",
      "Which movie proves almost nothing happening at a bus terminal can still be fascinating?"
    ]
  },
  {
    title: "Light of Day",
    location: { 
      name: "Euclid Tavern • 11629 Euclid Ave, Cleveland, OH 44106",
      image: "images/lod-euclid-tavern.png" 
    },
    questions: [
      "Which movie turned Cleveland’s Euclid Tavern into a rock stage for Joan Jett?",
      "Michael J. Fox traded skateboards for guitars at the Euclid Tavern—what film?",
      "Which 1987 drama shouted 'Cleveland rocks' years before the TV theme song?",
      "Which film cast Jett and Fox as struggling Rust Belt musicians at a University Circle bar?",
      "Which title shows the Tavern’s tiny stage as a working-class escape valve?",
      "Which movie treats Euclid Tavern as more than a bar—a scene, a grind, a hope?",
      "Which film frames the Tavern’s neon and brick as a rehearsal for leaving town?",
      "Which drama uses the tight interior of Euclid Tavern to push family tensions to the edge?",
      "Which Paul Schrader movie makes Cleveland’s club circuit feel like hard currency?",
      "Which film lets the soundboard hum of Euclid Tavern carry blue-collar dreams?"
    ]
  },
  {
    title: "A Christmas Story",
    location: { 
      name: "Higbee’s Department Store, Public Square • 100 Public Square, Cleveland, OH 44113",
      image: "images/acs-higbees.png" 
    },
    questions: [
      "Which 1983 holiday classic filmed its Santa slide at Higbee’s on Public Square?",
      "Which movie turned Higbee’s windows into Ralphie’s winter dreamscape downtown?",
      "Which film made Public Square look like a postcard of Christmas lights and snow?",
      "Which title has kids climbing toward Santa inside Higbee’s festive atrium?",
      "Which movie fused Indiana childhood with Cleveland storefronts at Higbee’s?",
      "Which holiday film uses the Terminal Tower skyline as a seasonal backdrop?",
      "Which film’s parade and storefronts orbit Higbee’s on Public Square?",
      "Which classic helps fuel modern tourism to Higbee’s and Tremont every December?",
      "Which movie’s department-store scenes are anchored at 100 Public Square?",
      "Which title warns 'You’ll shoot your eye out!' while Santa boots kids down the slide?"
    ]
  },
  {
    title: "Captain America: Winter Soldier",
    location: { 
      name: "Crawford Auto-Aviation Museum (Western Reserve Historical Society) • 10825 East Blvd, Cleveland, OH 44106",
      image: "images/ca-ws-caam.png" 
    },
    questions: [
      "Which Marvel chapter filmed among vintage cars at the Crawford Auto-Aviation Museum?",
      "Which film staged Smithsonian-look exhibits inside WRHS’s University Circle galleries?",
      "Which blockbuster set Chris Evans walking past Cleveland’s classic autos as 'Brooklyn' displays?",
      "Which superhero movie turned WRHS exhibits into a stand-in for the Smithsonian?",
      "Which title used polished floors and chrome at 10825 East Blvd for period displays?",
      "Which film cut between museum vitrines and character flashbacks inside WRHS?",
      "Which Marvel entry transformed Cleveland’s auto-aviation collection into national myth?",
      "Which movie reframed local car history as a hero’s museum memory trail?",
      "Which blockbuster made University Circle look like Washington, D.C. for a day?",
      "Which film’s museum sequence is actually Cleveland’s WRHS Crawford galleries?"
    ]
  },
  {
    title: "Air Force One",
    location: { 
      name: "Severance Hall, University Circle • 11001 Euclid Ave, Cleveland, OH 44106",
      image: "images/af1-severance.png" 
    },
    questions: [
      "Which 1997 thriller disguised Severance Hall’s interiors as Moscow spaces?",
      "Which movie turned an orchestra hall at 11001 Euclid Ave into Kremlin décor?",
      "Which title staged intrigue beneath Severance Hall’s elegant ceilings?",
      "Which film pivots from presidential heroics to Cleveland’s music palace interiors?",
      "Which blockbuster used University Circle architecture to sell international stakes?",
      "Which film’s Cleveland shoot swapped violins for villains inside Severance Hall?",
      "Which action classic stitched shots of Severance into a global chase?",
      "Which movie made Cleveland’s orchestra home play double as foreign government halls?",
      "Which title set a covert meeting amid Severance Hall’s marble and wood?",
      "Which film proves a concert hall can moonlight as a spy set in Cleveland?"
    ]
  },
  {
    title: "Welcome to Collinwood",
    location: { 
      name: "Luce Theater (formerly Olympia Theatre) • 3353 E. 55th St, Cleveland, OH 44127",
      image: "images/w2c-luce.png" 
    },
    questions: [
      "Which 2002 caper parks its crooks by the Luce Theater on East 55th Street?",
      "Which movie makes the former Olympia Theatre a backdrop for a bungled 'Bellini'?",
      "Which Cleveland heist comedy looks to the Luce marquee for neighborhood flavor?",
      "Which title treats 3353 E. 55th St as a stage for blue-collar scheming?",
      "Which film sets small-time plans against a once-grand neighborhood theater?",
      "Which comedy leans on the Luce/Olympia façade for a shabby-chic look?",
      "Which movie makes a theatre-turned-venue part of Collinwood’s texture?",
      "Which title uses the Luce block’s brick and steel as a character of its own?",
      "Which film locates dreamers under a fading marquee on the near East Side?",
      "Which caper keeps returning to the Luce/Olympia corner as the plan unravels?"
    ]
  },
  {
    title: "Spider-Man 3",
    location: { 
      name: "Wyndham Cleveland Hotel (Halle Building), Euclid Ave & E. 13th St • Cleveland, OH 44115",
      image: "images/sm3-euc-13.png" 
    },
    questions: [
      "Which Marvel sequel stages a chase by the hotel marquee on Euclid at East 13th?",
      "Which film used downtown Cleveland to double New York streets near the Halle Building?",
      "Which Spider-Man battled Sandman on Euclid Avenue around E. 13th St?",
      "Which movie has stunt cars flipping along Euclid under the marquee lights?",
      "Which title cuts between Public Square and Euclid during a chaotic pursuit?",
      "Which film hides Cleveland landmarks in plain sight as NYC along Euclid Ave?",
      "Which sequel makes the Wyndham/Halle corner a glide path for Spidey?",
      "Which movie threads a skid past East 13th before leaping a downtown gap?",
      "Which film’s Cleveland unit work anchors the big-city chase energy?",
      "Which Spider-Man entry relies on Cleveland asphalt for New York chaos?"
    ]
  },
  {
    title: "The Avengers",
    location: { 
      name: "Public Square — Terminal Tower • 50 Public Square, Cleveland, OH 44113",
      image: "images/av-psq.png" 
    },
    questions: [
      "Which Marvel epic stages a Loki confrontation on Cleveland’s Public Square?",
      "Which film frames the Terminal Tower while doubling the city for New York?",
      "Which superhero team assembles with Public Square’s skyline at their backs?",
      "Which title gives Public Square an alien invasion makeover with VFX?",
      "Which movie drops a portal battle into downtown Cleveland’s core?",
      "Which film puts Robert Downey Jr. near Public Square streetscapes?",
      "Which blockbuster hides Cleveland-in-Manhattan through Terminal Tower angles?",
      "Which title uses the Square’s geometry to sell a grand, open battleground?",
      "Which film blends practical Cleveland shots with NYC digital set extensions?",
      "Which 2012 movie makes 50 Public Square a nexus for a superhero standoff?"
    ]
  },
  {
    title: "Judas and the Black Messiah",
    location: { 
      name: "Ohio State Reformatory • 100 Reformatory Rd, Mansfield, OH 44905",
      image: "images/judas-man.png" 
    },
    questions: [
      "Which 2021 film used the Ohio State Reformatory in Mansfield for prison scenes?",
      "Which film about Fred Hampton staged interrogation corridors at 100 Reformatory Rd?",
      "Which title cast the Reformatory’s cellblocks as a stand-in for Illinois facilities?",
      "Which movie cuts from Chicago activism to Ohio’s Reformatory interiors?",
      "Which film’s Cleveland-region shoot included Mansfield’s iconic cell tiers?",
      "Which title uses the Reformatory’s ironwork to heighten surveillance tension?",
      "Which Oscar-winning story funnels an informant through Ohio prison hallways?",
      "Which film places LaKeith Stanfield within Mansfield’s echoing catwalks?",
      "Which title uses midwestern carceral architecture to ground a national story?",
      "Which movie folds the Reformatory’s gothic mass into a tale of betrayal?"
    ]
  },
  {
    title: "Superman (2025)",
    location: { 
      name: "The Arcade Cleveland • 401 Euclid Ave, Cleveland, OH 44115",
      image: "images/sm-arcade.png" 
    },
    questions: [
      "Which upcoming reboot filmed scenes inside Cleveland’s Gilded Age Arcade?",
      "Which film places Clark Kent beneath the Arcade’s glass-and-iron atrium on Euclid Ave?",
      "Which title stages Metropolis vibes in the Arcade at 401 Euclid Avenue?",
      "Which movie frames sweeping shots down the Arcade’s multi-level balconies?",
      "Which production uses the Arcade’s ornate railings for a dramatic reveal?",
      "Which 2025 film turns a Cleveland landmark into Metropolis ambience?",
      "Which title pairs the Arcade’s vintage storefronts with a modern superhero?",
      "Which movie sets a key walk-and-talk along the Arcade’s central spine?",
      "Which production treats the Arcade’s skylight as a natural spotlight for heroes?",
      "Which reboot returns Superman to his creators’ city via the Arcade?"
    ]
  },
  {
    title: "Sign of Aquarius",
    location: { 
      name: "Tower Press Building • 1900 Superior Ave, Cleveland, OH 44114",
      image: "images/gf-towerpress.png" 
    },
    questions: [
      "Which 1970 counterculture film frames the Tower Press Building on Superior Avenue?",
      "Which movie follows hippie-era Cleveland past the brick mass at 1900 Superior?",
      "Which title mixes docu-fiction and protest energy downtown by Tower Press?",
      "Which film drifts from Superior Ave corners into loft-like interiors nearby?",
      "Which movie uses the Tower Press block as a signpost of underground culture?",
      "Which title threads street scenes by the old factory windows on Superior?",
      "Which film maps a youth scene across Superior and the surrounding grid?",
      "Which movie catches a postered doorway at the Tower Press frontage?",
      "Which title watches a makeshift procession pass along Superior’s canyon?",
      "Which film pins a moment in Cleveland’s counterculture to Tower Press?"
    ]
  }
];

/* =================
   Helper Functions
   ================= */

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sampleOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sampleN(arr, n) {
  const copy = arr.slice();
  shuffleInPlace(copy);
  return copy.slice(0, n);
}

/**
 * Create four options (a,b,c,d) from the film titles.
 * Includes the correct film title and 3 random distractors (unique).
 * Returns: { answers: {a,b,c,d}, correctKey: "a"|"b"|"c"|"d" }
 */
function buildOptions(correctTitle, allTitles) {
  const pool = allTitles.filter(t => t !== correctTitle);
  const distractors = sampleN(pool, 3);
  const four = shuffleInPlace([correctTitle, ...distractors]);

  const letters = ["a", "b", "c", "d"];
  const answers = {};
  let correctKey = "a";

  four.forEach((title, idx) => {
    const key = letters[idx];
    answers[key] = title;
    if (title === correctTitle) correctKey = key;
  });

  return { answers, correctKey };
}

/**
 * Build the 10-question set for a quiz run:
 *  - randomly choose 10 films
 *  - for each film pick 1 random question text
 *  - correct answer is the film title
 *  - other 3 answers are other film titles
 */
function buildQuestionsFromFilms(filmData) {
  if (!Array.isArray(filmData) || filmData.length < 10) {
    throw new Error("You need at least 10 films to build a 10-question quiz.");
  }

  const chosenFilms = sampleN(filmData, 10);
  const allTitles = filmData.map(f => f.title);

  return chosenFilms.map(film => {
    const qText = sampleOne(film.questions);
    const { answers, correctKey } = buildOptions(film.title, allTitles);

    return new Question(
      qText,
      answers,
      correctKey,
      { title: film.title, location: film.location || {} }
    );
  });
}

/* Expose for main.js */
window.FILMS_DATA = films;
window.buildQuestionsFromFilms = buildQuestionsFromFilms;
window.Question = Question;

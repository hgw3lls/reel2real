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

   Fill in location.image paths if you want a photo to show.
   Keep at least 10 films. We’ll randomly choose 10 each run.
*/
const films = [
  {
    title: "Kid From Cleveland",
    location: { name: "Cleveland Museum of Art", image: "" },
    questions: [
      `Which 1949 film tried to make a Cleveland delinquent into a civic redemption story?`,
      `Hollywood’s idea of urban renewal: a troubled teen at the Museum of Art. Name the film.`,
      `This film doubled as a love letter to Cleveland’s institutions — and a warning about youth gone astray.`,
      `Name the movie that used the museum’s marble halls to lend moral weight to a local boy’s troubles.`,
      `A post-war time capsule that made Cleveland the star, not the kid. What’s the title?`,
      `Which movie asked: can a museum save a wayward teen?`,
      `This civic booster film featured the Indians, the mayor, and the Art Museum. Which one?`,
      `Name the drama that turned the Cleveland Museum of Art into a symbol of culture and order.`,
      `1940s Hollywood gave Cleveland a starring role — which film featured the Museum of Art?`,
      `Before superhero franchises, this was Cleveland’s homegrown “origin story.” Which film?`
    ]
  },
  {
    title: "The Fortune Cookie",
    location: { name: "Municipal Stadium (archival)", image: "" },
    questions: [
      `Which Wilder comedy staged a fake football injury at Cleveland’s stadium?`,
      `Jack Lemmon and Walter Matthau’s first pairing happened under the stadium lights. Which film?`,
      `A fumbled play, an ambulance, and an insurance scam — which movie?`,
      `This film turned a Browns game into the site of an elaborate con. Name it.`,
      `Before The Odd Couple, Lemmon and Matthau schemed in Cleveland. Which title?`,
      `A 1966 comedy about greed that begins with a hard tackle at Municipal Stadium. Which film?`,
      `Name the movie that made Cleveland football the backdrop for courtroom chaos.`,
      `This film opened with NFL footage — then cut to a lawyer’s grin. What’s it called?`,
      `Which movie proved that a neck brace can be worth more than a touchdown?`,
      `Billy Wilder used Browns vs. Vikings for his setup — which comedy classic?`
    ]
  },
  {
    title: "Uptight",
    location: { name: "Hough (79th & Hough)", image: "" },
    questions: [
      `Which 1968 film reset John Ford’s The Informer in Cleveland’s Hough neighborhood?`,
      `Weeks after MLK’s assassination, this film was shot in the heart of Cleveland. Which one?`,
      `Which movie combined radical politics and local grit on 79th and Hough?`,
      `A story of betrayal among revolutionaries, set against Cleveland streets. Name it.`,
      `Which film made Cleveland one of the first backdrops for Black Power on screen?`,
      `Shot with urgency and rawness, this film captured Hough’s unrest. Which title?`,
      `A parable of survival and betrayal filmed on Cleveland asphalt. Which movie?`,
      `Which movie paired activist actors with actual Cleveland residents in 1968?`,
      `This was both a political statement and a Cleveland production. Which film?`,
      `Which title shows that Cleveland was never just a backdrop, but a battleground?`
    ]
  },
  {
    title: "The Deer Hunter",
    location: { name: "Lemko Hall", image: "images/dh-lemko.png" },
    questions: [
      `Which Vietnam epic begins with a wedding at Lemko Hall?`,
      `Before the steel mills and the war, the movie opened with a dance. Which one?`,
      `Lemko Hall hosted a wedding scene that lasted nearly an hour onscreen. Which film?`,
      `Which film juxtaposed Orthodox ritual with the chaos of combat?`,
      `This Oscar winner cast Cleveland as home before Vietnam tore it apart. Which title?`,
      `Christopher Walken celebrated before he unraveled. Which film?`,
      `Name the movie that uses Lemko Hall to anchor its portrait of friendship.`,
      `Which 1978 classic treated Cleveland’s immigrant communities as its emotional core?`,
      `Lemko Hall became one of cinema’s most famous wedding venues. Which movie?`,
      `Which film begins in Cleveland and ends in a silence of Russian roulette?`
    ]
  },
  {
    title: "Stranger Than Paradise",
    location: { name: "St. Theodosius", image: "" },
    questions: [
      `Which minimalist indie turned Tremont’s domes into deadpan backdrops?`,
      `Jim Jarmusch’s first major film shot snow scenes here. Which title?`,
      `Which 1984 indie turned Cleveland into an art film punchline?`,
      `Which movie found bleak comedy in long takes and Orthodox churches?`,
      `A Hungarian cousin, a Cleveland winter, and a flat delivery — name the film.`,
      `Which movie proved low-budget minimalism could look cool in Cleveland?`,
      `Which indie classic put St. Theodosius on the cinematic map?`,
      `Name the film that called Cleveland paradise, but only ironically.`,
      `Which black-and-white indie showed Cleveland as absurd but real?`,
      `Which film taught critics that nothing happening could be fascinating?`
    ]
  },
  {
    title: "Light of Day",
    location: { name: "Euclid Tavern", image: "" },
    questions: [
      `Which movie turned Euclid Tavern into a rock stage for Joan Jett?`,
      `Michael J. Fox traded skateboards for guitars — which film?`,
      `Which 1987 film shouted “Cleveland rocks” years before Drew Carey?`,
      `Name the film that cast Jett and Fox as struggling Rust Belt musicians.`,
      `Which movie showed Cleveland’s rock clubs as working-class escape valves?`,
      `This 80s film captured the Tavern as more than a bar — which title?`,
      `Which drama of family and music put Euclid Tavern on film?`,
      `Which film depicted the grind of Cleveland musicians before fame?`,
      `Rock and roll drama set in Tremont — which movie?`,
      `Which Paul Schrader film blended Midwestern grit with power chords?`
    ]
  },
  {
    title: "A Christmas Story",
    location: { name: "Higbee’s Façade", image: "images/acs-higbees.png" },
    questions: [
      `Which 1983 holiday classic filmed its Santa slide at Higbee’s?`,
      `Which movie made a BB gun the hottest Christmas toy in Cleveland?`,
      `Higbee’s windows became Ralphie’s dreamscape — name the film.`,
      `Which film turned Public Square into a wintertime postcard?`,
      `Which holiday staple gave Cleveland the world’s most famous leg lamp?`,
      `Name the movie where Higbee’s Santa kicked kids down a slide.`,
      `Which film proved nostalgia sells better than fruitcake?`,
      `What movie gave Cleveland an enduring holiday tourist industry?`,
      `Which title warned kids: “You’ll shoot your eye out!”?`,
      `Which holiday classic fused Indiana childhood with Cleveland storefronts?`
    ]
  },
  {
    title: "Captain America: Winter Soldier",
    location: { name: "Crawford Auto/Aviation Museum", image: "images/ca-ws-caam.png" },
    questions: [
      `Which superhero’s 1940s backstory was filmed among vintage cars?`,
      `Name the Marvel film that visited Cleveland’s auto collection.`,
      `Which movie blended war stories with museum tours?`,
      `Which Marvel origin filmed in University Circle?`,
      `Which film used Cleveland cars as props for Brooklyn streets?`,
      `A superhero plus a museum of aviation — which film?`,
      `Which hero’s “first avenger” chapter rolled out of Cleveland?`,
      `Name the Marvel epic that turned local history into world war sets.`,
      `Which film starred Chris Evans and a Cleveland auto museum?`,
      `Which blockbuster gave Cleveland’s cars a cameo in 2011?`
    ]
  },
  {
    title: "Air Force One",
    location: { name: "Severance Hall", image: "images/af1-severance.png" },
    questions: [
      `Which Ford thriller disguised Severance Hall as Moscow?`,
      `Which 1997 movie turned an orchestra hall into Kremlin decor?`,
      `Name the film where violins gave way to villains.`,
      `Which movie staged espionage inside Cleveland’s music palace?`,
      `Severance doubled as Russia — which action film?`,
      `Which blockbuster asked: what if the president fought back?`,
      `Which 90s action classic filmed in University Circle?`,
      `Name the movie that mixed Air Force One with Severance Hall.`,
      `Which action hit starred Harrison Ford and Cleveland architecture?`,
      `Which film let Cleveland’s orchestra hall play global politics?`
    ]
  },
  {
    title: "Welcome to Collinwood",
    location: { name: "Olympia Theater", image: "" },
    questions: [
      `Which 2002 film made a Cleveland caper out of small-time crooks?`,
      `Name the movie that put Olympia Theater into a heist farce.`,
      `Which crime comedy Clooney produced in Cleveland?`,
      `Which film follows bumbling thieves in Collinwood?`,
      `Name the heist film with more mishaps than money.`,
      `Which movie paired Sam Rockwell with East Side grit?`,
      `Which 2002 title turned Cleveland into a screwball caper?`,
      `Which film took its title from a working-class neighborhood?`,
      `Which Cleveland-set heist proves crime doesn’t pay?`,
      `Which comedy brought Olympia Theater to Hollywood’s eye?`
    ]
  },
  {
    title: "Spider-Man 3",
    location: { name: "Euclid at E. 9th (Heinen’s)", image: "" },
    questions: [
      `Which Marvel sequel staged a chase past the Heinen’s Building?`,
      `Which film used Cleveland to double for New York streets?`,
      `Which Spider-Man battled Sandman on Euclid Avenue?`,
      `Which superhero swung through downtown Cleveland traffic?`,
      `Which blockbuster filmed stunts at East 9th and Euclid?`,
      `Name the Spidey film that chose Cleveland asphalt for NYC chaos.`,
      `Which Marvel movie turned Public Square into a battle zone?`,
      `Which Sam Raimi sequel gave Cleveland’s skyline a cameo?`,
      `Which Spider-Man film relied on Cleveland for its chase scenes?`,
      `Which movie set Tobey Maguire against villains in Cleveland streets?`
    ]
  },
  {
    title: "The Avengers",
    location: { name: "Tower City Entrance Façade", image: "" },
    questions: [
      `Which Marvel epic staged its climactic battle in Tower City?`,
      `Tower City became Grand Central — which movie?`,
      `Which superhero team assembled beneath Cleveland chandeliers?`,
      `Which film gave Tower City an alien invasion makeover?`,
      `Which Marvel film staged portal battles in Cleveland?`,
      `Name the blockbuster that doubled Tower City as Manhattan.`,
      `Which 2012 film made Cleveland a war zone?`,
      `Which movie put Robert Downey Jr. at Tower City’s door?`,
      `Which superhero movie used Cleveland as New York?`,
      `Which Marvel title fused Tower City with CGI destruction?`
    ]
  },
  {
    title: "Judas and the Black Messiah",
    location: { name: "Mansfield Reformatory", image: "images/judas-man.png" },
    questions: [
      `Which 2021 film used Mansfield Reformatory as a stand-in prison?`,
      `Which Oscar winner told the story of Fred Hampton’s betrayal?`,
      `Which film staged Black Panther Party history in Cleveland?`,
      `Name the movie where Lake Erie stood in for Chicago.`,
      `Which movie fused history and prison walls on Ohio soil?`,
      `Which drama turned Cleveland locations into Illinois sets?`,
      `Which 2021 title made Cleveland a site of revolution?`,
      `Which film cast LaKeith Stanfield as an FBI informant?`,
      `Which Oscar-nominated film brought Hampton’s story to screen?`,
      `Which film showed the Panthers through Cleveland’s reformatory?`
    ]
  },
  {
    title: "Superman (2025)",
    location: { name: "Old Arcade", image: "" },
    questions: [
      `Which upcoming reboot filmed scenes in Cleveland’s Arcade?`,
      `Superman’s creators were Cleveland natives — which 2025 film honors that?`,
      `Which superhero returns to his birthplace in this production?`,
      `Which film sets flight in Cleveland’s Gilded Age landmark?`,
      `Which reboot staged Superman against ornate ironwork?`,
      `Which film casts Cleveland as Metropolis once more?`,
      `Which 2025 title filmed inside the Arcade’s glass atrium?`,
      `Which movie ties Cleveland’s history to comic history?`,
      `Which production returns Superman to Cleveland after decades?`,
      `Which upcoming DC film chose Cleveland’s Arcade for a set?`
    ]
  },
  {
    title: "Sign of Aquarius",
    location: { name: "3rd District Police Station", image: "" },
    questions: [
      `Which 1969 docu-fiction filmed counterculture arrests here?`,
      `Which film put flower power inside a police station?`,
      `Which title fused Cleveland protests with psychedelia?`,
      `Which movie documented youth clashes at 3rd District?`,
      `Which Cleveland-made counterculture film was named for the zodiac?`,
      `Which 60s movie blurred protest and performance in Cleveland?`,
      `Which experimental film turned police records into theater?`,
      `Which movie captured real protests as part of its script?`,
      `Which counterculture title staged scenes at Cleveland police HQ?`,
      `Which movie asked: what if hippies made their own documentary?`
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
window.Question = Question; // optional, but handy in console

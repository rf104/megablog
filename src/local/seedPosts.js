// Built-in posts every visitor sees. They ship with the app, so nobody can edit or delete them.
// Cover photos are from Unsplash (free to use under the Unsplash License); `coverCredit` names the photographer.

const covers = import.meta.glob('../photos/covers/*.jpg', { eager: true, import: 'default' });
const cover = (name) => covers[`../photos/covers/${name}.jpg`];

function seed({ id, slug, title, authorName, createdAt, image, coverCredit, content }) {
    return {
        id: `seed-${id}`,
        slug,
        title,
        content,
        featuredImage: cover(image),
        coverCredit,
        status: 'active',
        authorName,
        userId: null,
        source: 'seed',
        createdAt,
        updatedAt: createdAt,
    };
}

const seedPosts = [
    seed({
        id: 'welcome',
        slug: 'welcome-to-megablog',
        title: 'Welcome to MegaBlog: write first, sign up later (or never)',
        authorName: 'The MegaBlog Team',
        createdAt: '2026-10-04T09:00:00.000Z',
        image: 'welcome',
        coverCredit: 'Mike Tinnion',
        content: `
<p>MegaBlog is a place for ideas that deserve more than a social post and less than a book. A recipe that finally worked. A lesson from a hard year at work. The one paragraph you keep rewriting in your head on the bus. If it matters to you, it belongs here.</p>
<p>We built MegaBlog around a simple belief: <strong>the hardest part of writing is starting</strong>. So we removed everything that stands between you and the first sentence. There is no sign-up wall, no profile to fill in, no follower count to worry about. Press <em>Write</em> and begin.</p>
<h2>How anonymous posts work</h2>
<p>When you write without signing in, your post is saved in <em>this browser</em>, on this device. That has a few consequences worth knowing:</p>
<ul>
  <li><strong>No email, no password.</strong> You can publish within a minute of opening the site.</li>
  <li><strong>You stay in control.</strong> Edit or delete your posts any time from the same browser.</li>
  <li><strong>Your posts are private to this device.</strong> Other readers won't see them, and clearing your browser data removes them.</li>
  <li><strong>Add a name if you like.</strong> Leave it blank and your post is simply signed "Anonymous".</li>
</ul>
<p>Think of it as a notebook that happens to have beautiful typography. It's a good place to draft, to practise, or to write something just for yourself.</p>
<h2>Want your posts everywhere?</h2>
<p>Create a free account. Posts written while signed in are stored in the cloud, appear for every reader, and follow you to any device. You can mix both: keep private drafts in your browser and publish the finished pieces from your account.</p>
<h2>A few writing tips to get going</h2>
<ol>
  <li><strong>Write the title last.</strong> You'll know what the post is really about once it's written.</li>
  <li><strong>Start in the middle.</strong> Skip the warm-up paragraph; begin with the moment, the problem or the surprise.</li>
  <li><strong>Add a cover image.</strong> Posts with a strong picture get read. If you skip it, we'll choose a calm one for you.</li>
  <li><strong>Read it out loud once.</strong> Anything you stumble over, your readers will too.</li>
</ol>
<blockquote><p>The best time to write it down is while you still remember why it mattered.</p></blockquote>
<p>Have a look around: the posts on this page were written to get you started, covering reading, studying, cooking, walking and more. Then share something of your own. We can't wait to read it.</p>`,
    }),
    seed({
        id: 'read-more',
        slug: 'how-to-read-more-books-without-trying-harder',
        title: 'How to read more books without trying harder',
        authorName: 'Arif Rahman',
        createdAt: '2026-10-01T07:30:00.000Z',
        image: 'read-more',
        coverCredit: 'Ben White',
        content: `
<p>Every January I promised myself I would read more. Every December I had read about four books, two of them on holiday. The problem wasn't motivation; I genuinely love reading. The problem was that I treated reading like exercise, something to summon willpower for, instead of something to make easy.</p>
<p>Most people who want to read more don't need more willpower. They need fewer obstacles between them and the next page. Here is what finally worked for me: twenty-six books last year, without feeling like I tried any harder.</p>
<h2>1. Keep a book where your phone usually is</h2>
<p>The nightstand, the kitchen table, the bag you carry every day. Reading is mostly a matter of what is within reach when you have five spare minutes. I started leaving my phone charging in the hallway and a paperback on my pillow. The first week felt strange. By the third, I was reading every night without thinking about it.</p>
<h2>2. Quit books you don't enjoy</h2>
<p>A book you dread is a book that stops you reading anything at all. I used to push through boring books out of a sense of duty, and I'd stall for weeks. Now I give a book fifty pages. If it hasn't earned my attention by then, I put it down without guilt. There are more good books than you'll ever have time for; don't spend that time on the wrong ones.</p>
<h2>3. Read more than one at a time</h2>
<p>A dense non-fiction book for the morning, a novel for the evening, something light for the commute. Matching the book to your energy keeps you moving through all of them. When I'm too tired for history, I still have a story waiting.</p>
<h2>4. Count minutes, not pages</h2>
<p>Twenty minutes a day is roughly a book every two weeks, more than twenty-five a year. Small, steady sessions beat heroic weekends. I attach my reading to things I already do: ten minutes with morning tea, ten minutes before sleep.</p>
<h2>5. Always know what's next</h2>
<p>The gap between finishing one book and starting another is where reading habits die. Keep a short list of three books you're excited about. When you close one, the next is already waiting.</p>
<h2>6. Make it social</h2>
<p>Tell a friend what you're reading. Swap recommendations. Join (or start) a book club. Reading is solitary, but talking about books is one of the best ways to stay excited about them.</p>
<p>None of this is clever. That's the point: the habits that last are the ones that ask the least of you. Make reading the easiest thing to do, and you'll find yourself doing it.</p>`,
    }),
    seed({
        id: 'slow-sunday',
        slug: 'the-comfort-of-a-slow-sunday-read',
        title: 'The comfort of a slow Sunday read',
        authorName: 'Nadia Karim',
        createdAt: '2026-09-27T10:15:00.000Z',
        image: 'slow-sunday',
        coverCredit: 'Fernando Hernandez',
        content: `
<p>There is a particular kind of quiet that only happens on a Sunday morning. The coffee is still too hot to drink, the light is soft, and nobody needs anything from you yet. The week hasn't started; the last one has finally let go.</p>
<p>That is when I read the books I love most. Not the ones I think I <em>should</em> read, not the ones for work, but the ones I return to like old friends. A worn copy of a novel I first read at nineteen. A collection of essays I open at random. Poetry, sometimes, a single poem read three times over.</p>
<h2>Reading without a goal</h2>
<p>We measure so much of our lives now: steps, hours of sleep, reading streaks, words per minute. A slow read is the opposite. There is no page count, no summary to write, no reason to finish by noon.</p>
<p>Sometimes I read three pages and spend twenty minutes looking out of the window, thinking about one sentence. Sometimes I fall asleep with the book on my chest. That counts too. The point isn't to get through the book; it's to spend unhurried time with it.</p>
<h2>Why it matters</h2>
<p>Most of our reading during the week is skimming: emails, messages, headlines, documents. We read to extract, as quickly as possible. Slow reading uses a different muscle. You notice the rhythm of a sentence, a word chosen with care, a detail you skipped the first time.</p>
<p>I've found it changes how I feel for the rest of the day. Calmer, more patient, a little more present. It's the closest thing I have to meditation, and much easier to stick with.</p>
<h2>Try it this week</h2>
<ol>
  <li>Pick a book you already know you like. Re-reading is not cheating.</li>
  <li>Make a proper drink: coffee, tea, whatever feels like a treat.</li>
  <li>Leave your phone in another room. Not on silent; in another room.</li>
  <li>Sit somewhere with natural light.</li>
  <li>Read until you notice you want to stop. Then stop.</li>
</ol>
<p>It sounds small. It is small. That's exactly why it works. Some of the best hours of my week are spent doing almost nothing, very slowly, with a book.</p>`,
    }),
    seed({
        id: 'study-habit',
        slug: 'the-25-minute-study-habit',
        title: 'The 25-minute study habit that finally stuck',
        authorName: 'Tanvir Hasan',
        createdAt: '2026-09-23T16:45:00.000Z',
        image: 'study',
        coverCredit: 'Карина Низаметдинова',
        content: `
<p>For years I studied the wrong way: long, unfocused evenings with a textbook open and a phone buzzing beside it. I'd sit down at seven and look up at eleven, exhausted, with almost nothing to show for it. I told myself I was studying for four hours. Honestly, it was closer to forty minutes.</p>
<p>Then, in my second year of university, a friend showed me how she worked: in 25-minute blocks with a kitchen timer. It looked almost too simple to matter. It changed everything.</p>
<h2>The method</h2>
<ul>
  <li>Choose <strong>one</strong> task. Not "study biology" but "summarise chapter 6".</li>
  <li>Set a timer for 25 minutes and work only on that task.</li>
  <li>When it rings, take a 5-minute break. Stand up, stretch, refill your water, look at something far away.</li>
  <li>After four rounds, take a longer break of 20 to 30 minutes.</li>
</ul>
<p>This is often called the Pomodoro Technique, after the tomato-shaped kitchen timer its inventor used. You don't need the tomato. Any timer works.</p>
<h2>Why it works</h2>
<p><strong>Starting stops being scary.</strong> "Study for the evening" is a vague, heavy task. "Work for 25 minutes" is something you can begin right now.</p>
<p><strong>Breaks become a reward you can see coming.</strong> Instead of "rewarding" yourself with your phone halfway through a paragraph, you know a break is a few minutes away. It's much easier to ignore distractions when you know they're scheduled.</p>
<p><strong>You can see your progress.</strong> I tick a box for every block. Eight ticks is a genuinely productive day, and it feels like one.</p>
<h2>Mistakes I made at first</h2>
<ol>
  <li><strong>Checking my phone during the break.</strong> Five minutes of scrolling isn't rest; it's another kind of work for your brain. Walk around instead.</li>
  <li><strong>Skipping the long break.</strong> By the sixth block without a real rest, my focus collapsed.</li>
  <li><strong>Being rigid about it.</strong> If I'm deep in a problem when the timer rings, I finish the thought. The timer serves you, not the other way round.</li>
</ol>
<h2>What I'd tell my younger self</h2>
<p>Write down what you'll do in the next block <em>before</em> you start the timer. "Revise chapter 4" is a wish. "Answer questions 1 to 10 on page 112" is a plan. The more specific the task, the faster you'll settle into it.</p>
<p>Three years on, I still use the timer almost every day, now for work instead of exams. It's the most useful thing anyone taught me at university, and it wasn't even on the syllabus.</p>`,
    }),
    seed({
        id: 'book-club',
        slug: 'start-a-book-club-with-friends',
        title: "Start a book club with your friends (it's easier than you think)",
        authorName: 'Sadia Islam',
        createdAt: '2026-09-19T12:00:00.000Z',
        image: 'book-club',
        coverCredit: 'Toa Heftiba',
        content: `
<p>Our book club started as a joke in a group chat. Someone complained that we only ever talked about work, someone else said "we should read a book together like proper adults", and two weeks later six of us were sitting on my living-room floor arguing about a novel. Two years later, it is the one evening a month none of us will miss.</p>
<p>If you've ever thought about starting one, do it. Here's everything we learned the hard way.</p>
<h2>Keep it small</h2>
<p>Four to eight people is the sweet spot. Everyone gets to talk, and you can still fit around one table or squeeze onto one sofa. Our one attempt at twelve people turned into three separate conversations and a lot of nodding.</p>
<h2>Take turns choosing</h2>
<p>Each month a different person picks the book. You'll read things you never would have chosen, and that's half the fun. I would never have picked up a 1970s science-fiction novel on my own; it turned out to be one of my favourite books of the year.</p>
<h2>Pick shorter books than you think</h2>
<p>Under 300 pages gives everyone a fair chance to finish, even in a busy month. A book half the group skipped makes for a quiet evening. Save the doorstoppers for the summer, or split them across two meetings.</p>
<h2>Have one good question ready</h2>
<p>The host brings a single question to open the conversation. Our best ones have been surprisingly simple:</p>
<ul>
  <li>Which character would you trust least, and why?</li>
  <li>Where did you nearly stop reading?</li>
  <li>If you could change the ending, would you?</li>
  <li>Who would you give this book to?</li>
</ul>
<p>After the first question, it usually runs itself.</p>
<h2>It's fine if not everyone finished</h2>
<p>We have one rule: come anyway. Some of our best discussions happened because someone who'd read only half the book asked "wait, what happens to her?" Spoilers are allowed, friendship is mandatory.</p>
<h2>Rotate the host, keep it simple</h2>
<p>Whoever chose the book hosts. Nobody cooks a three-course dinner; tea, biscuits and something salty is plenty. The moment it becomes a performance, people start making excuses.</p>
<p>And bring snacks. Nobody remembers the discussion questions, but everyone remembers the snacks.</p>`,
    }),
    seed({
        id: 'reading-journal',
        slug: 'why-you-should-keep-a-reading-journal',
        title: 'Why you should keep a reading journal',
        authorName: 'Imran Chowdhury',
        createdAt: '2026-09-15T08:20:00.000Z',
        image: 'journal',
        coverCredit: 'Aaron Burden',
        content: `
<p>I used to finish a book, love it, recommend it to everyone, and two months later remember almost nothing about it. Someone would ask "what was it about?" and I'd say "oh, it was really good" and change the subject. It bothered me more than I'd admit. What was the point of reading, if it all slipped away?</p>
<p>A reading journal fixed that. It's the simplest habit I have, and one of the most rewarding.</p>
<h2>What goes in it</h2>
<ul>
  <li>The title, the author, and the date you finished.</li>
  <li>One or two lines that stopped you in your tracks, copied out by hand.</li>
  <li>A sentence on how the book made you feel, not what it was about.</li>
  <li>Optionally: who recommended it, and who you'd recommend it to.</li>
</ul>
<p>That's it. Five minutes per book. You don't need a fancy notebook (though a nice one helps you keep going), and you don't need to write reviews. This is for you, not for anyone else.</p>
<h2>Why handwriting helps</h2>
<p>I tried keeping notes in an app first. It didn't stick. There's something about copying a sentence out with a pen that makes you slow down and really read it. You notice the punctuation, the word order, why it works. I remember the lines I've written out far better than the ones I've highlighted.</p>
<h2>What you get back</h2>
<p>Over time the journal becomes a map of who you were when you read each book. Flipping back through mine, I can see the year I read only comfort novels (a hard year), the month I got obsessed with mountaineering memoirs, the summer I finally read the classics I'd been avoiding.</p>
<p>It's like rereading your own life in miniature.</p>
<h2>It makes you a better reader</h2>
<p>Knowing you'll write a line at the end, you start noticing the lines worth writing down. You read with a little more attention, a pencil nearby, a corner folded here and there. Reading becomes less like consuming and more like a conversation.</p>
<h2>How to start today</h2>
<ol>
  <li>Find any notebook. Seriously, any.</li>
  <li>Write down the last three books you remember reading, and one thing about each.</li>
  <li>Keep the notebook next to whatever you're reading now.</li>
</ol>
<blockquote><p>A book you write about is a book you get to keep.</p></blockquote>`,
    }),
    seed({
        id: 'first-post',
        slug: 'how-to-write-your-first-blog-post',
        title: 'How to write your first blog post (and actually publish it)',
        authorName: 'Farhana Akter',
        createdAt: '2026-09-11T14:00:00.000Z',
        image: 'first-post',
        coverCredit: 'Christin Hume',
        content: `
<p>I have a folder on my laptop called "posts". For three years it held eleven drafts and zero published posts. Each one was almost ready. Each one needed one more pass. If that sounds familiar, this post is for you.</p>
<p>Here is the process that finally got me from draft to published, and kept me publishing.</p>
<h2>1. Pick one idea, small enough to finish</h2>
<p>Your first post doesn't need to be your best post. It needs to be finished. Choose something you could explain to a friend over coffee in five minutes: a lesson you learned, a mistake you made, a tool you love, a place you visited.</p>
<p>"Everything I know about photography" is a book. "The one setting that fixed my blurry photos" is a post.</p>
<h2>2. Write for one reader</h2>
<p>Picture a specific person: a friend, a younger version of yourself, a colleague who asked you a question. Write to them. Your writing will instantly become warmer, clearer and more useful than if you write for "an audience".</p>
<h2>3. Draft fast, edit slow</h2>
<p>Write the first draft in one sitting, without stopping to fix anything. Typos, clumsy sentences, gaps, leave them all. A messy finished draft is worth more than a perfect first paragraph.</p>
<p>Then leave it overnight. Editing with fresh eyes is a different job from writing, and you'll be much better at it tomorrow.</p>
<h2>4. Cut the first paragraph</h2>
<p>This one feels brutal but works almost every time. Our first paragraphs are usually throat-clearing: "In this post I will talk about...". Delete it and see if the post starts better from paragraph two. It usually does.</p>
<h2>5. Make it easy to read</h2>
<ul>
  <li>Short paragraphs: two to four sentences.</li>
  <li>Headings that tell the reader what each section gives them.</li>
  <li>Lists for steps and examples.</li>
  <li>One strong cover image.</li>
</ul>
<h2>6. Set a "good enough" bar, then publish</h2>
<p>Before you start editing, decide what "done" means: maybe "it's clear, it's true, and I'd be happy for a friend to read it". When the post meets that bar, publish it. Not when it's perfect. Perfect never comes.</p>
<h2>7. Write the next one</h2>
<p>The second post is easier than the first, and the tenth is easier still. Writing is a skill like any other: you get better by doing it, in public, imperfectly.</p>
<p>On MegaBlog you can practise without anyone watching: write anonymously, and your posts stay in your browser until you're ready. Then sign up and share the ones you're proud of.</p>`,
    }),
    seed({
        id: 'digital-minimalism',
        slug: 'taking-back-your-attention-from-your-phone',
        title: 'Taking back your attention from your phone',
        authorName: 'Rafiq Ahmed',
        createdAt: '2026-09-07T19:30:00.000Z',
        image: 'phone',
        coverCredit: 'ROBIN WORRALL',
        content: `
<p>Last spring I checked my phone's screen-time report for the first time. Five hours and twelve minutes, daily average. I did the maths: that's more than a full day every week. I couldn't name a single thing I'd done with all those hours.</p>
<p>I didn't want to throw my phone in a lake. It's genuinely useful: maps, messages, my bank, photos of my niece. I just wanted it to go back to being a tool instead of a habit. Here's what helped.</p>
<h2>Turn off almost every notification</h2>
<p>I went through every app and asked: does a human need to reach me through this, right now? For almost everything, the answer was no. Now only calls, messages from people, and my calendar can interrupt me. Everything else waits until I choose to look.</p>
<h2>Make the home screen boring</h2>
<p>My first screen now has only tools: maps, camera, calendar, notes. Social media apps live in a folder on the last page. It sounds trivial, but the half-second it takes to find them is often enough for me to ask "do I actually want this?"</p>
<h2>Greyscale, for a week</h2>
<p>Most phones have an accessibility setting that turns the screen black and white. Apps designed to be colourful and stimulating suddenly look dull. I didn't keep it on permanently, but a week of greyscale broke the automatic reaching.</p>
<h2>Create phone-free places</h2>
<ul>
  <li><strong>The bedroom.</strong> I bought a cheap alarm clock. My phone charges in the kitchen.</li>
  <li><strong>The dinner table.</strong> Phones go in a basket by the door.</li>
  <li><strong>The first hour of the day.</strong> No news, no messages until I've had breakfast.</li>
</ul>
<h2>Replace, don't just remove</h2>
<p>The biggest lesson: if you take away the phone without filling the space, you'll drift back. I keep a book in my bag, a notebook by the sofa, and a list of people I've been meaning to call. When I reach for my phone out of boredom, there's something better nearby.</p>
<h2>Six months later</h2>
<p>My average is now around ninety minutes a day, and most of that is maps and messages. I've read more books this year than in the previous three. I sleep better. And I've noticed things I used to miss: the light in the evenings, conversations on the bus, my own thoughts.</p>
<p>Your attention is the most valuable thing you own. It's worth deciding, on purpose, where it goes.</p>`,
    }),
    seed({
        id: 'ereaders',
        slug: 'e-readers-vs-paper-books',
        title: 'E-readers vs paper books: an honest comparison from someone who uses both',
        authorName: 'Mehjabin Noor',
        createdAt: '2026-09-03T11:10:00.000Z',
        image: 'ereader',
        coverCredit: 'Lala Azizli',
        content: `
<p>For years I was a paper-only reader, slightly smug about the smell of old pages. Then a friend lent me her e-reader for a long trip, and I came home with a more complicated opinion. Today I use both, for different reasons. Here's my honest comparison.</p>
<h2>Where e-readers win</h2>
<ul>
  <li><strong>Travel.</strong> A whole library weighs less than a single paperback. On a two-week trip I read nine books and carried one device.</li>
  <li><strong>Reading in bed.</strong> A built-in front light means no lamp, no disturbing anyone, and the screen is easy on the eyes in the dark.</li>
  <li><strong>Adjustable text.</strong> Bigger fonts on tired days, different typefaces, more spacing. For anyone with weaker eyesight this alone is life-changing.</li>
  <li><strong>Instant dictionary.</strong> Press a word and get its meaning without losing your place.</li>
  <li><strong>Battery life.</strong> E-ink screens last weeks on a single charge. This is not a tablet.</li>
</ul>
<h2>Where paper wins</h2>
<ul>
  <li><strong>Memory.</strong> I remember paper books better. Knowing a passage was "on a left-hand page, near the start" seems to help it stick.</li>
  <li><strong>Flipping around.</strong> Cookbooks, travel guides, poetry and anything with maps or illustrations are far better on paper.</li>
  <li><strong>Sharing.</strong> You can lend a paper book, give it away, leave it in a hostel for the next traveller.</li>
  <li><strong>No screen.</strong> After a day at a computer, holding something made of paper feels like a rest.</li>
  <li><strong>The shelf.</strong> A bookshelf is a portrait of who you are. An e-reader library isn't quite the same.</li>
</ul>
<h2>What about cost?</h2>
<p>E-books are often cheaper, and many libraries now lend them for free through apps, which is a wonderful, underused option. But second-hand paper books can be even cheaper, and the device itself is an upfront cost.</p>
<h2>My setup today</h2>
<p>Novels and travel reading go on the e-reader. Non-fiction I want to underline, cookbooks, poetry and anything beautiful go on paper. Books I love on the e-reader, I sometimes buy again on paper to keep.</p>
<p>The real answer is that the format matters much less than the habit. Read whatever gets you reading. The best book is the one you'll actually open tonight.</p>`,
    }),
    seed({
        id: 'home-library',
        slug: 'building-a-home-library-on-a-budget',
        title: 'Building a home library on a budget',
        authorName: 'Arif Rahman',
        createdAt: '2026-08-29T09:40:00.000Z',
        image: 'library',
        coverCredit: 'Vladimir Mokry',
        content: `
<p>A wall of books is one of the cosiest things a home can have. It's also, if you buy everything new, one of the most expensive. Over the last five years I've built a library of about four hundred books, and I've spent less on it than most people spend on coffee. Here's how.</p>
<h2>Second-hand first</h2>
<p>Charity shops, used-book stalls, library sales and online second-hand sellers are where most of my shelves came from. Older paperbacks often cost less than a cup of tea. Go regularly; stock changes every week, and the joy of finding a book you've wanted for months is half the fun.</p>
<h2>Library sales are a goldmine</h2>
<p>Public libraries regularly sell off older stock to make room. Ask your local branch when their next sale is. I once filled a whole shelf for the price of a single new hardback.</p>
<h2>Swap with friends</h2>
<p>Organise a book swap: everyone brings five books they've finished with and leaves with five new ones. It costs nothing, clears space, and you get recommendations with every book. We now do it twice a year, and it's become a small party.</p>
<h2>Little free libraries</h2>
<p>Those small "take a book, leave a book" boxes in neighbourhoods are perfect for a slow trickle of surprises. Always leave something when you take something.</p>
<h2>Buy new only what you'll keep forever</h2>
<p>I save new purchases for books I know I'll reread, books from authors I want to support directly, and beautiful editions of favourites. Everything else can be borrowed or bought used.</p>
<h2>Shelves don't need to be expensive either</h2>
<ul>
  <li>Simple wall-mounted brackets and planks are cheap and look great.</li>
  <li>Second-hand bookcases are easy to find; people give them away when they move.</li>
  <li>Wooden crates stacked on their sides make a lovely, flexible shelf.</li>
</ul>
<h2>Curate, don't just collect</h2>
<p>Every year I go through my shelves and pass on books I know I won't read again. A library isn't about how many books you own; it's about living with books that mean something to you. Leave space for the ones you haven't met yet.</p>`,
    }),
    seed({
        id: 'daily-walk',
        slug: 'what-a-daily-walk-taught-me',
        title: 'What thirty days of a daily walk taught me',
        authorName: 'Nadia Karim',
        createdAt: '2026-08-24T17:20:00.000Z',
        image: 'walk',
        coverCredit: 'Michael Hamments',
        content: `
<p>At the end of a long, grey stretch of working from home, I realised I'd gone three days without leaving the flat. So I made myself a simple promise: walk for thirty minutes, every day, for a month. No headphones for the first ten minutes. No step targets. Just walk.</p>
<p>I expected to feel a bit fitter. I didn't expect it to change how I think.</p>
<h2>Week one: restlessness</h2>
<p>The first few walks felt like a waste of time. I kept reaching for my phone, mentally writing emails, walking too fast as if I had somewhere to be. Ten minutes without headphones felt very long.</p>
<h2>Week two: noticing</h2>
<p>Somewhere in the second week, I started to see my own neighbourhood. A house with a blue door and an extraordinary rose bush. An old man who fed the pigeons at exactly 5:15. The way the light came through the trees on the park path, which is now my favourite place in the city.</p>
<h2>Week three: thinking</h2>
<p>This was the surprise. Problems that had been stuck all day would quietly untangle themselves halfway around the park. I started walking <em>with</em> a question instead of trying to escape work, and coming home with an answer. Many writers and thinkers have sworn by walking; now I understand why.</p>
<h2>Week four: needing it</h2>
<p>By the last week, the walk had become the part of the day I protected most. On a rainy day I went anyway, with a bad umbrella, and enjoyed it more than the sunny ones.</p>
<h2>What I took away</h2>
<ul>
  <li><strong>Thirty minutes is enough.</strong> You don't need a hike; you need a habit.</li>
  <li><strong>Silence is useful.</strong> The first ten minutes without audio are where the thinking happens.</li>
  <li><strong>Same route, different walk.</strong> Repeating a route lets you notice small changes: the seasons, the people, yourself.</li>
  <li><strong>Mood follows movement.</strong> On my worst days, the walk didn't fix everything, but I never came home feeling worse.</li>
</ul>
<p>The month ended in August. I'm still walking. Now the leaves are starting to turn, and I can't wait to see what the park looks like in autumn.</p>`,
    }),
    seed({
        id: 'one-recipe',
        slug: 'one-new-recipe-a-week',
        title: 'One new recipe a week: how I finally learned to cook',
        authorName: 'Tanvir Hasan',
        createdAt: '2026-08-18T18:00:00.000Z',
        image: 'cooking',
        coverCredit: 'Douglas Fehr',
        content: `
<p>Until I was twenty-five, my cooking repertoire was three dishes: rice, eggs, and rice with eggs. I'd tried "learning to cook" several times, usually by buying an ambitious cookbook and failing at page one. What finally worked was absurdly small: one new recipe, every week, for a year.</p>
<h2>The rules</h2>
<ol>
  <li>One new recipe per week. Not more.</li>
  <li>Cook it on the same day each week (Sunday, for me), when there's no rush.</li>
  <li>If it's good, cook it again the following week before moving on.</li>
  <li>Write one line about it in a notebook: what worked, what I'd change.</li>
</ol>
<h2>Start with the basics you'll reuse</h2>
<p>My first ten recipes were chosen to teach techniques, not to impress: a simple dal, a tomato sauce, roasted vegetables, a stir-fry, a soup, an omelette done properly, fried rice, a basic curry, flatbread, and a salad dressing. Each one taught me something I then used everywhere else.</p>
<h2>What I learned along the way</h2>
<ul>
  <li><strong>Read the whole recipe first.</strong> Every disaster I had was a step I didn't see coming.</li>
  <li><strong>Prepare everything before you start cooking.</strong> Chopped, measured, ready. Cooking becomes calm instead of frantic.</li>
  <li><strong>Salt properly, and taste as you go.</strong> Most "bland" food just needs salt or something sour, like lemon or vinegar.</li>
  <li><strong>A sharp knife is safer than a blunt one.</strong> And much more pleasant.</li>
  <li><strong>Mistakes are still dinner.</strong> A burnt edge or an over-salted sauce is a lesson, not a failure.</li>
</ul>
<h2>A year later</h2>
<p>Fifty-two recipes doesn't sound like much. But it's enough to cook every day for weeks without repeating, and more importantly, enough to improvise. I can open the fridge, see what's there, and make something good. That was the real goal all along.</p>
<p>I also cook for friends now, which past me would never have believed. My mother still says my dal needs more salt. She's right.</p>`,
    }),
    seed({
        id: 'learn-to-code',
        slug: 'learning-to-code-as-an-adult',
        title: 'Learning to code as an adult: what nobody tells you',
        authorName: 'Sabbir Hossain',
        createdAt: '2026-08-12T21:15:00.000Z',
        image: 'code',
        coverCredit: 'Danial Igdery',
        content: `
<p>I wrote my first line of code at thirty-one, after a decade working in a bank. Two years later I work as a junior web developer. It was one of the hardest and best things I've done, and it was nothing like the "learn to code in 30 days" adverts promised.</p>
<p>Here's what I wish someone had told me at the start.</p>
<h2>Feeling stupid is part of the process</h2>
<p>Everyone feels lost when learning to program, including people who've done it for twenty years. Error messages will make no sense. Things that "should" work won't. That feeling doesn't mean you're bad at this; it means you're learning. It gets less frequent, but it never fully goes away, and that's fine.</p>
<h2>Build things as early as possible</h2>
<p>Tutorials feel productive, but you learn far more from building something small that's yours. My first project was a page that told me which bus to catch home. It was ugly, it broke constantly, and I learned more from it than from three online courses.</p>
<h2>Consistency beats intensity</h2>
<p>One hour a day, five days a week, beats a whole Saturday once a month. Programming is learned in small loops: try, fail, understand, try again. Those loops need regular practice to stick.</p>
<h2>Learn to read error messages</h2>
<p>This sounds obvious, but for months I'd see red text and panic. Read it slowly. It usually tells you the file, the line, and roughly what's wrong. Copying the important part into a search engine solves a surprising number of problems.</p>
<h2>Your past career is an advantage</h2>
<p>I worried my banking years were wasted. They weren't. I understood users, deadlines, spreadsheets and how businesses actually work. Many teams value that more than you'd think. Whatever you did before, it gives you a perspective younger developers don't have.</p>
<h2>Find people</h2>
<ul>
  <li>Join an online community or local meetup for beginners.</li>
  <li>Ask questions, even the ones you think are silly.</li>
  <li>Share what you build, even when it's small.</li>
</ul>
<h2>Write about what you learn</h2>
<p>Explaining something is the best way to check you understand it. Every time I wrote a short post about a concept I'd just learned, I found the gaps in my understanding. And those posts became a portfolio that helped me get hired.</p>
<p>If you're thinking about it: start. Not next month, tonight. Make something tiny and a little bit broken. That's how everyone begins.</p>`,
    }),
    seed({
        id: 'handwritten-letters',
        slug: 'the-case-for-handwritten-letters',
        title: 'The case for handwritten letters',
        authorName: 'Mehjabin Noor',
        createdAt: '2026-08-06T10:00:00.000Z',
        image: 'letters',
        coverCredit: 'Towfiqu barbhuiya',
        content: `
<p>In a drawer at my grandmother's house there is a bundle of letters tied with a faded ribbon. They're from my grandfather, written over two years when he worked in another city. My grandmother can still recite parts of them from memory.</p>
<p>I have thousands of messages on my phone. I can't recite a single one.</p>
<h2>Why a letter feels different</h2>
<p>A message takes seconds. A letter takes an evening. That time is exactly what makes it precious. The person reading it knows you sat down, chose the paper, found a pen that worked, crossed out a word, started again. A letter is a small gift of attention, and people feel it.</p>
<h2>It changes how you write</h2>
<p>You can't delete a sentence in ink. So you slow down, think before you write, and say what you actually mean. My letters are more honest than my messages. They're also kinder.</p>
<h2>It changes how they're read</h2>
<p>Nobody skims a handwritten letter. It gets read slowly, often twice, sometimes kept for years. When did you last read a message twice?</p>
<h2>How to start (without it feeling strange)</h2>
<ol>
  <li><strong>Pick one person.</strong> A grandparent, an old friend, someone who helped you once.</li>
  <li><strong>Keep it short.</strong> A single page is plenty. A postcard counts.</li>
  <li><strong>Write about small things.</strong> What you had for dinner, what the weather is doing, a book you're reading. Letters don't need news.</li>
  <li><strong>Say one true thing.</strong> Thank them for something specific, or tell them what they mean to you.</li>
  <li><strong>Don't expect a reply.</strong> Some people will write back. All of them will remember.</li>
</ol>
<h2>A small habit</h2>
<p>I now write one letter a month. It costs the price of a stamp and an evening. In return, I've reconnected with an old teacher, a cousin abroad and a friend I'd lost touch with after university. Every one of them mentioned the letter the next time we spoke.</p>
<p>Some things are worth doing slowly. Telling someone they matter is one of them.</p>`,
    }),
];

export default seedPosts;

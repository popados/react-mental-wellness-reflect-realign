# Reflect and Realign — App Outline & Audience/SEO Plan

Oct 2, 2026 · @nik

## App overview

Reflect and Realign is a private, self-guided mental health check-in app built around a "field journal" feel rather than a clinical one — contour-line textures, a moss/clay/slate color palette, and a serif voice instead of the usual pastel wellness-app look. The core loop is: check in → reach for a tool (breathing, a coping skill, journaling) → reflect → come back tomorrow.

It is explicitly a reflection and coping-skills tool, not a diagnostic or treatment product — no scored questionnaires, no clinical labels. Every screen is designed to feel like a quiet personal ritual, something someone opens for two minutes between meetings or at the end of a hard day, not a dashboard to manage.

## Full page outline

| Page | Category | Status | What it does |
| --- | --- | --- | --- |
| Home | Core experience | Built | Daily greeting, today's affirmation preview, one-tap mood check, 7-day streak trail, link to grounding and coping skills |
| Daily Affirmation | Core experience | Built | Rotating affirmation with a "new one" shuffle and a save-to-favorites heart |
| Wellness Checks | Core experience | Built | Mood + energy + note log, with a terrain-style line chart of recent check-ins |
| Grounding Exercise | Core experience | Built | Guided breathing (Box, Calm 4-7-8, Simple) with an animated breathing-ring visual, plus an optional 5-4-3-2-1 senses exercise |
| Coping Skills | Reflection & skills | Built | 15-technique library across five categories (Calm the body, Steady your thoughts, Reach out, Shift your state, Ride the wave), filterable and saveable |
| Journal | Reflection & skills | Built | Free-write entries with rotating prompts, expandable entry list |
| Thought Record | Reflection & skills | Proposed | CBT-style structured log — situation, automatic thought, evidence for/against, balanced thought, before/after intensity rating |
| Sensation Check-In | Reflection & skills | Proposed | Body-sensation picker that opens directly into a Thought Record or the Grounding exercise |
| DBT Skill Cards | Reflection & skills | Proposed | STOP, ACCEPTS, DEAR MAN and similar DBT skills added as entries inside the existing Coping Skills library |
| Safety Plan | Safety & support | Proposed | Personal w arning signs, go-to coping steps, people to contact, and crisis resources — filled in ahead of a hard moment |
| Support Network | Safety & support | Proposed | A private list of trusted people to reach out to, linked from the "Reach out" coping category |
| Insights | Tracking & insights | Proposed | One overlay chart with a factor picker (sleep, work, social, weather) plotted against the mood terrain |
| Sleep & Work Log | Tracking & insights | Proposed | Lightweight daily inputs (hours, quality, workload) that feed the Insights overlay |
| Resource Library | Psychoeducation | Proposed | Short, plain-language articles on topics like anxiety, sleep, or a specific coping skill |
| Settings & Privacy | Settings | Partially built | "Clear my data" is live today; room to add reminders, data export, and account-level privacy controls |

## How many screens a wellness app needs

There is no magic number, but the rule that matters most is a bottom navigation of 4 to 5 tabs. Apple and Google guidance both point to roughly that ceiling, and someone opening the app while stressed should not have to choose among eight options.

| Stage | Screen count | What it looks like |
| --- | --- | --- |
| Bottom nav | 4–5 tabs | The hard limit; everything else sits behind these |
| Launch version | 5–8 screens | Home, one check-in screen, one or two tools (breathing, coping skills), a journal, settings |
| Mature app | 15–25 screens | Layered inside a few hubs, e.g. one Tools tab opening into grounding, coping skills, thought records, and DBT cards |

Where the app stands today: it has six tabs (Home, Affirm, Checks, Coping, Ground, Journal), one over the usual ceiling. The easy fix is to merge Coping and Ground into a single Tools or Skills tab and fold Affirm into Home, which frees room for Insights and Safety Plan.

Depth beats breadth in mental health apps. Someone who uses one check-in screen daily for three months is a better outcome than someone who opens ten screens once, so improving an existing screen usually beats adding a new one until the core loop (check in, reach for a tool, reflect) feels solid.

## More screen ideas beyond the first build

Beyond the six built screens, these are the other screens a mental health app can offer, grouped by the job each does.

| Job | Screen ideas |
| --- | --- |
| Tracking and logging | Mood tracker (built via Checks), habit and routine tracker, symptom or trigger tracker, sleep, appetite, and medication adherence alongside mood |
| Reflection | Journal (built), gratitude log (3 things, most days), values or goals screen that gives the app a "why" |
| Skills and regulation | Grounding and breathing (built), coping skills library (built), guided meditation or body scan player |
| Psychoeducation | Resource library of plain-language articles, "understanding your patterns" insights (mood over time, streaks, no clinical scoring) |
| Safety | Safety plan (warning signs, coping steps, people to contact, crisis resources, filled in during a calm moment), always-accessible crisis resources page |
| Support and connection | Support network (private list of people to reach out to), export or share-with-provider summary as PDF |
| Settings and trust | Gentle reminders, data export and delete (a clear-my-data option is already live) |

The Safety Plan is the highest-value next addition: it is a well-established tool, low risk to include, and it slots in naturally next to Coping Skills.

## Mood and emotion tracking methods

There is more than one way to capture how someone feels, and the methods trade precision against speed. The current Checks screen combines categorical labels with an intensity scale, which is a solid low-friction core.

| Method | What it is | Trade-off |
| --- | --- | --- |
| Categorical | Pick a named mood (Steady, Bright, Foggy, Tender, Heavy) | Fast, but coarse |
| Intensity scale | A 0–10 or 0–100 rating, often paired with a label ("Anxious, 7/10") | Shows better or worse, not just present or absent |
| Valence–arousal grid | A dot on a plane: pleasant to unpleasant, calm to energized | More precise without vocabulary; plots well over time |
| Emotion wheel | Start broad ("sad"), narrow to specifics (disappointed, lonely, grieving) | Matches DBT's precise emotion-naming |
| Trigger or context tagging | Log what preceded the feeling: person, place, activity, thought, body state | Turns a mood log into pattern-finding |
| Body mapping | Mark where an emotion shows up physically | Helps people who notice emotions somatically first |
| Narrative or free text | Just write what is going on | Captures nuance, hard to trend |
| Metaphor-based | Weather, color, or terrain (the app's own visual language) | Reads at a glance, no clinical wording |

A design choice sits on top of all of these: momentary versus retrospective logging. Prompting several times a day catches real-time shifts but is intrusive. A single end-of-day entry is easier to sustain but flattens the day into one impression.

Trigger tagging (a quick "what is shaping this?" chip row: sleep, work, social, health) would give the most insight per tap if added to Checks.

**A basic check-in without emotion words** usually leans on one or more of these instead:

- A single intensity scale (1–5 or 1–10, anchored Low / Okay / Good)
- A valence–arousal grid
- A color picker or gradient wheel
- A slider or dial (worse to better)
- A separate energy level, often paired with the scale
- A body-based check (tension, heaviness, restlessness)
- A weather or terrain metaphor
- An optional free-text note

These all trade precision for speed, which suits someone who wants to log daily without deciding whether a feeling is frustration or disappointment.

## Emotion vocabulary

The check-in needs a word list at three levels of detail: a wheel for a two-step picker, a flat list for scanning, and a short quick-tap set that keeps the one-tap feel.

**Feelings wheel (core emotion, then specifics)**

| Core | Specific words |
| --- | --- |
| Happy | Content, glad, cheerful, optimistic, proud, excited, grateful, hopeful, playful |
| Sad | Down, disappointed, lonely, discouraged, grieving, empty, heartbroken, melancholy, numb |
| Angry | Irritated, frustrated, annoyed, resentful, bitter, jealous, defensive, betrayed, furious |
| Afraid or anxious | Nervous, worried, uneasy, insecure, panicked, overwhelmed, on edge, apprehensive, dread |
| Calm | Relaxed, steady, settled, grounded, secure, at ease, peaceful |
| Tender | Affectionate, warm, sentimental, nostalgic, compassionate, moved |
| Tired or low energy | Drained, foggy, flat, weary, burned out, numb, restless |
| Surprised or confused | Startled, stunned, uncertain, conflicted, torn, overstimulated, disoriented |
| Disgusted | Repulsed, uncomfortable, disapproving, averse |

Some words (numb, overwhelmed) straddle two families, and a word can sit in more than one group rather than being forced into a single home. Keep the core row to 6–8 words so the first tap stays fast.

**Flat check-in list (30 words, 7 groups)**

| Group | Words |
| --- | --- |
| Positive, high energy | Happy, Excited, Grateful, Proud, Hopeful, Playful |
| Positive, calm | Content, Peaceful, Relaxed, Grounded, Secure |
| Low energy or down | Tired, Foggy, Flat, Drained, Numb |
| Sad | Down, Lonely, Disappointed, Grieving, Empty |
| Anxious or activated | Nervous, Worried, Overwhelmed, On edge, Panicked |
| Angry | Frustrated, Irritated, Resentful, Defensive |
| Tender or reflective | Nostalgic, Sentimental, Moved, Uncertain |

Thirty words is too many for a single tap row. It only works with a two-tier picker (group first, specific word second, optional), with each group inheriting one palette color.

**10-word quick-tap set (the version to build)**

The original five chips stay (Bright, Steady, Foggy, Tender, Heavy) and five are added to cover the gaps: Content, Calm, Tired, Anxious, Frustrated. Stopping at 10 keeps a single chip row from wrapping awkwardly on mobile. A tap-to-select mockup of this set, with an energy rating and a log confirmation, was built in chat.

| Mood | Color |
| --- | --- |
| Bright | #C99A4A |
| Steady | #56624A |
| Content | #7C8C6B |
| Calm | #7A93A0 |
| Tired | #A79C8C |
| Foggy | #8C8478 |
| Tender | #AC7E92 |
| Anxious | #BC7A3C |
| Frustrated | #954B3D |
| Heavy | #4A5A66 |

## Coping skills library

The Coping Skills screen is built with 15 techniques in five color-coded categories, shown as tappable cards that can be filtered and saved. Two cards link into other screens: 5-4-3-2-1 senses opens Grounding, and Write it out opens Journal.

| Category | Skills |
| --- | --- |
| Calm the body | Box breathing, progressive muscle relaxation, long exhale or humming |
| Steady your thoughts | Name the thought, 5-4-3-2-1 senses, write it out |
| Reach out | Send one message, be near people, ask for one small thing |
| Shift your state | Change your environment, give your hands a task, put on music |
| Ride the wave | Set a timer for the feeling, pause big decisions, remember it has passed before |

**Skills written for "Nervous"** (not yet added to the app; each would be tagged with the emotion it suits so it can surface from a two-tier emotion picker):

- **Reframe the feeling** (Steady your thoughts): nerves and excitement feel almost identical in the body, so tell yourself "I'm excited" instead of "I'm nervous."
- **Physiological sigh** (Calm the body): two quick inhales through the nose, then one long exhale through the mouth.
- **Separate the known from the unknown** (Steady your thoughts): write what you know and are prepared for, and what is out of your hands, so you stop trying to solve the unsolvable.
- **A two-minute reset before the moment** (Calm the body): feet flat, shoulders down, one slow breath, repeated as the same small ritual each time.

## CBT toolkit

The thought record is the core CBT tool and the highest-value next screen: it reuses the existing card and form patterns and pairs naturally with Checks and Coping Skills.

| Technique | What it looks like in the app |
| --- | --- |
| Thought record | Situation, automatic thought, emotion (rated 0–100), evidence for and against, a more balanced thought, then re-rate the emotion |
| Cognitive distortions glossary and tags | Reference list of thinking traps (all-or-nothing, catastrophizing, mind reading, "should" statements, overgeneralizing, personalizing, mental filtering), also usable as tags on a thought record |
| Behavioral activation planner | Schedule small, specific activities, rate mood before and after |
| Worry time | A set time of day to worry, plus a "parking lot" list for worries that pop up outside it |
| Problem-solving worksheet | Define the problem, brainstorm without filtering, pros and cons, pick one, make a concrete plan |
| Behavioral experiments | "What do you predict, and what actually happened?" as a before and after log |
| Socratic questioning prompts | Reusable challenge questions ("What is the evidence? What would I tell a friend?") that live inside the thought record |
| Values clarification and goals | Not strictly CBT (more ACT-adjacent), but commonly bundled |

Exposure hierarchies are genuinely CBT but are usually done with a therapist, so they would be framed as educational content, not a guided self-walkthrough.

**Where the body fits in CBT.** CBT has no dedicated body scan. Physical sensations are one column in the five-part model (situation, thoughts, emotions, physical sensations, behaviors), tracked because the columns feed each other: a racing heart can trigger a catastrophic thought, which intensifies the racing heart. The genuine CBT body-based technique is progressive muscle relaxation (active tense and release, already in the coping library). Interoceptive exposure is a clinical technique for panic disorder and not suited to a daily wellness check-in. In CBT literature on health anxiety and body dysmorphic disorder, "body checking" means a reassurance-seeking safety behavior that treatment tries to reduce, so the feature is better called a body check-in or somatic check-in.

**Thought record with a body sensation as the entry point.** A prototype was built in chat: pick a sensation (tight chest, racing heart, stomach knot, shoulder tension, shallow breath, jaw clench, restless legs, headache), then the standard record opens. A body sensation is often the trigger that starts a thought record ("my chest got tight, so what was the thought right before that?"). The prototype's fields are emotion, intensity before, automatic thought, evidence for, evidence against, balanced thought, and intensity after, ending in a saved summary.

Fields still wanted to round it out:

| Field | Why it matters |
| --- | --- |
| Situation or context | The sensation chip says what; this says why now. The prototype currently skips it |
| Belief rating for the automatic thought (0–100%) | A thought can be believed 90% yet trigger mild sadness, so it is tracked separately from emotion intensity |
| Belief rating for the balanced thought | The gap between old and new belief is often more telling than the emotion drop alone |
| Where the sensation went | Did it stay, spread, or ease by the end; closes the loop the emotion slider already closes for feeling |
| Urge or behavior | The fifth column of the five-part model (leave the room, check the phone, snap, freeze) |
| Cognitive distortion tag | Lets the app later surface patterns like "catastrophizing most often on Tuesday evenings" |
| Trigger context tags | Work, sleep, social, health, financial; turns one entry into aggregate insight |
| One small next step | An optional line that moves reflection toward action |
| Coping skill used | Lets the coping-effectiveness insight cover thought records too |

The two highest-value additions are situation context and belief ratings, since they complete the classic thought-record structure.

## DBT toolkit

DBT is organized around four skill modules made of named acronym skills, so it maps differently from CBT's single core worksheet. STOP or ACCEPTS would slot into the Coping Skills library almost immediately, and DEAR MAN would make a good form-style screen.

| Module | Skills | App form |
| --- | --- | --- |
| Mindfulness | Wise Mind check-in (emotion, reasonable, or wise mind); Observe, Describe, Participate practices; non-judgmental rewriting ("I'm so stupid" becomes "I made a mistake") | Tap-in chips, short guided practices, a rewrite journal |
| Distress tolerance | STOP (Stop, Take a step back, Observe, Proceed mindfully); ACCEPTS distraction menu; self-soothing through the five senses; IMPROVE the moment; radical acceptance prompts; TIPP | Quick-access reset card, browsable lists, reflection prompts |
| Emotion regulation | Emotion log with precise naming; PLEASE checklist (sleep, eating, exercise, illness, substances); opposite action; building mastery and positive experiences tracker | Close cousin of Checks, daily checklist, emotion-to-action-urge pairing |
| Interpersonal effectiveness | DEAR MAN (Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate); GIVE (Gentle, Interested, Validate, Easy manner); FAST (Fair, no Apologies, Stick to values, Truthful) | Fill-in-the-blanks script form, reference cards |

Two cautions from the earlier outline. TIPP (paced breathing, intense brief exercise, temperature change) is usually taught in person before it is used alone, so it would be reference and psychoeducation, not a guided walkthrough. The classic diary card should stay at mood plus skills used; the urge columns (self-harm, substance use) are normally reviewed with a therapist and are left out of a self-directed app.

**The Observe skill in more depth.** Observe is the first of DBT's three "what" mindfulness skills (Observe, Describe, Participate), as opposed to the "how" skills (non-judgmentally, one-mindfully, effectively). It means noticing an experience as it happens, without labeling it, judging it, or trying to change it: a thought, a sensation, an urge, a sound, letting each pass like clouds.

It comes first because you cannot skillfully describe or participate in something you have not noticed. Much emotional reactivity comes from skipping straight from a sensation to a reaction (chest tightens, then "something is wrong with me") with no pause between. Observe puts that pause back.

Observe is not suppression. You turn attention toward the experience, just without the second layer of judgment that usually rides along with it. Describe then puts factual words to it ("my jaw is tight"), and Participate means fully entering the moment once you are no longer watching it from outside.

## Body and sensation check-in

A body check is rooted in mindfulness practice more than in CBT or DBT specifically. Body scanning comes from mindfulness meditation traditions, formalized clinically through Mindfulness-Based Stress Reduction, and it predates both therapy models. In DBT it fits under the Mindfulness module as the Observe skill: noticing physical sensation without judging or changing it. In CBT it appears in narrower ways (a column in the five-part model, progressive muscle relaxation, and the thought-record entry point described above). For a general body-based check, a label like mindfulness or grounding is more accurate than filing it under either one.

| Notation | What it is |
| --- | --- |
| Region checklist | A flat list of body areas (head, jaw, chest, stomach, shoulders, hands), each with a quick yes or no or an intensity tap; lowest effort to build, reuses the chip row |
| Body silhouette with tap zones | A front-facing outline divided into tappable regions; the most recognizable body-scan visual |
| Color-coded heat overlay | Marked zones shaded by intensity, so the whole body reads like a heatmap |
| Sensation vocabulary tags | A small fixed set attached to a zone: tight, tense, warm, heavy, tingly, fluttery, numb, knotted, restless; answers "what is here" without emotion words |
| Traffic-light or 3-point severity | Mild, moderate, strong per marked zone, instead of a full 1–10 scale per region |
| Sequential scan order | Walks head to legs one region at a time asking "anything here?"; calmer and closer to a guided meditation, but slower |
| Free-form marking | Circle or shade directly on the outline; most flexible, hardest to turn into trends |

The region checklist is the cheapest to build. The tap-zone silhouette plus vocabulary tags is the more visual, distinctive version.

## Life-factor insights: sleep, work, and wellness

Sleep and work are usually the two biggest outside drivers of mood. Each factor follows the same pattern: a few light inputs, then a mood overlay that surfaces patterns visually, with descriptive callouts and no scoring.

| Factor | Inputs to log | Insights to show |
| --- | --- | --- |
| Sleep | Bed time and wake time, duration, quality (Restful, Restless, Broken); pre-bed tags (caffeine, screens, alcohol, exercise, stress, late meal); a wind-down checklist | Regularity (how much times vary), gentle sleep debt over the week, weekday versus weekend drift, a sleep-mood overlay, callouts like "Steady days average 7.2 hrs, Heavy days 5.1 hrs" |
| Work | Hours, workload chip (Light, Manageable, Heavy, Overwhelming), work mode tag, meeting density, after-hours bleed, interruption tally, real-break toggle, pre and post-shift tags (deadlines, conflict, unclear expectations, recognition, autonomy), energy before and after | A work-mood overlay, weekday patterns (Sunday dip, midweek slump), callouts like "Heavy-mood days are more common after Overwhelming workload days," a disconnected-today evening toggle |
| Movement and body | Exercise or a simple moved-today toggle, time outdoors, physical symptoms (headaches, tension, fatigue) | Movement versus mood overlay |
| Nutrition and substances | A light meals and hydration checklist (consistency, not calories), caffeine and alcohol tallies | Mainly their downstream effect on sleep and anxiety |
| Social and connection | Time with others, a gentle "did you feel connected today?" | "Connected days are more often Bright or Steady" |
| Environment | Weather, season, daylight exposure | Weather versus mood overlay; can surface seasonal patterns without a diagnosis |
| Body rhythms | Menstrual cycle, medication timing | Often one of the strongest mood correlators, as context and not a clinical tracker |
| Meaning and engagement | Hobby or creative time, an accomplishment log (DBT's building mastery), a financial stress tag | Surfaces what is draining versus restoring |

Presentation ideas: a weekly sleep trail and a weekly work-life trail that reuse the Home streak trail visual (hours or workload instead of done or not done).

Rather than one chart per factor, one general Insights screen with a factor picker (sleep, work, movement, social, weather) overlaid against the mood terrain scales better. The sleep-mood and work-mood overlays are the most compelling single additions, since each needs only a small new input added to the check-in.

## Insight features

This is what the app does with the tracked data once it exists. The combined Insights screen with a factor picker is the natural build, since it can host most of these (the overlay chart, a weekly digest, effectiveness callouts) without a separate screen for each.

| Type | Feature | What it does |
| --- | --- | --- |
| Visualization | Calendar heatmap | A month grid color-coded by mood, for spotting patterns at a glance |
| Visualization | Factor overlay with picker | One chart, one dropdown for what is plotted against mood |
| Visualization | Comparative bars | This week versus last week; relative framing is gentler than an absolute trend |
| Pattern-finding | Auto-correlation callouts | Plain-language observations ("Heavy days are more common after short nights"), descriptive and never causal |
| Pattern-finding | Day-of-week and time-of-day clustering | Shows when things tend to be harder, such as evenings versus mornings |
| Pattern-finding | Consistency tracking | Which tools someone actually reaches for (grounding, journal, coping skills) |
| Reflective summaries | Weekly digest card | Mood trend, most-used coping skill, journal entry count, one highlight |
| Reflective summaries | Personal baseline | "Your average this month" so a hard day reads against the person's own normal |
| Reflective summaries | Journal theme frequency | A lightweight word-frequency view of what recurs in the person's own language |
| Effectiveness | Coping skill effectiveness | Mood before and after using a skill, so people see what actually helps them |
| Effectiveness | Affirmation resonance | Which saved affirmations get revisited, a soft signal of what someone needs to hear |
| Milestones | Progress markers | "30 days logged," "used a coping skill 10 times this month," framed as encouragement, not a scoreboard |
| Forward-looking | Gentle heads-up nudges | "Sunday evenings have been harder; want to open Coping Skills?" offered, never predicted |
| Forward-looking | Meaningful date awareness | Softens the app's tone around dates someone has flagged as hard |
| Sharing | Exportable summary | A plain PDF or text export of check-ins and journal entries for a therapist |

One thread runs through all of them: keep the language observational ("here is what the data shows") rather than predictive or scored, which keeps insights supportive instead of clinical.

## Guardrails across the app

These cautions came up repeatedly while scoping the features above, and they apply to every screen.

- **No scored clinical instruments.** Tools like the PHQ-9, GAD-7, Insomnia Severity Index, and Maslach Burnout Inventory produce a number that reads as diagnostic. Use lighter self-reflection versions and descriptive insight ("here is what the data shows") with no cutoffs.
- **Observational language, not predictive.** Callouts describe patterns; they do not claim cause and effect or warn about the future.
- **Keep nutrition about consistency.** A light "ate regularly today" checklist, not calorie tracking, which risks tipping into disordered-eating territory.
- **Leave out urge tracking.** Self-harm and substance-use columns of the DBT diary card are normally reviewed with a therapist.
- **Frame clinical-leaning skills as education.** Exposure hierarchies, TIPP, and interoceptive exposure are presented as reference content, not guided walkthroughs.
- **Include a safety plan and crisis resources.** An always-accessible, non-alarming page, plus a footnote on screens about hard moments that this is a reflection tool and not professional care.
- **Treat privacy as a feature.** Data export and delete, with the existing clear-my-data option as the starting point.
- **Use unambiguous labels.** Call the feature "body check-in" or "somatic check-in," not "body checking."

## Who the app would connect with

The app isn't built for one single "user" — it's built for several different people at different moments, each reaching for a different screen first.

| Persona | Who they are | What they'd use first |
| --- | --- | --- |
| The Quiet Processor | Feels things privately, doesn't want to talk out loud about it | Journal, saved affirmations |
| The Anxious Achiever | High-functioning, work-driven, anxiety shows up as overthinking and tension | Grounding exercise, Coping Skills, Work insight |
| The New-to-Therapy Explorer | Just started seeing someone, or considering it, wants structure between sessions | Thought Record, export-to-share with a provider |
| The Daily Ritual Builder | Habit-oriented, wants a small consistent practice more than a crisis tool | Home streak trail, Daily Affirmation |
| The In-the-Moment User | Having a genuinely hard hour, not in crisis, needs something fast and concrete | Coping Skills, Grounding, Safety Plan |
| The Self-Taught Skill Learner | Curious about CBT/DBT concepts, wants to learn techniques independently | Coping Skills library, Resource Library |

These aren't mutually exclusive — the same person is often the Daily Ritual Builder on an ordinary Tuesday and the In-the-Moment User on a hard one. Designing for the range is why the app has both a slow daily loop (affirmation, journal, streak) and a fast emergency loop (grounding, coping skills, safety plan).

## Starting SEO with social media and content

Nobody searches Google for an app they've never heard of. So SEO for an app like this usually starts on social media, not search — short, shareable posts that teach one small thing: a 60-second box-breathing demo, a single reframed thought, one coping skill explained in plain language. These posts don't try to sell the app; they just prove it's useful.

Each post links back to a short article or landing page on a website ("5 grounding techniques for a hard day," "what box breathing actually does"). That article is the piece search engines can actually find and rank — the social post is the spark, the article is what gets indexed. Over time, a library of these small articles becomes the thing search engines point people toward when they search something related, like "how to calm down before a presentation" or "journaling prompts for anxiety."

## What SEO is actually doing

In the simplest terms: SEO is matching the exact words someone types into a search bar with content that answers that question well. A search engine isn't judging whether the app is good — it's judging whether a given page is the clearest, most relevant answer to a specific question.

That matching process is also, quietly, how an app ends up with a particular kind of audience — not because anyone picks the users directly, but because the topics and wording chosen in the content act like a filter:

- Writing about "grounding techniques for anxiety at work" tends to reach working adults dealing with daily stress — the Anxious Achiever persona above.
- Writing about "journaling prompts after a hard diagnosis" reaches a very different, more specific group going through something particular.
- Writing about "DBT skills explained simply" reaches people already familiar with therapy language — closer to the Self-Taught Skill Learner.

So the content doesn't choose who's allowed to use the app — anyone can download it — but it does decide who's likely to *find* it in the first place, because each article is really just an answer to one specific question, and only the people asking that question will see it. Writing a wide range of articles, matched to a wide range of personas, is what brings in a wide range of users instead of just one type.

## Suggested next steps

- [ ] Pick one proposed screen to build next (Thought Record and Safety Plan are the highest-value candidates)
- [ ] Draft 3–5 short-form social posts per built screen (one coping skill, one breathing demo, one affirmation, one journaling prompt)
- [ ] Set up a simple blog or landing page structure to hold the longer articles those posts link to
- [ ] Write the first articles for two personas (start with Anxious Achiever and Daily Ritual Builder — the broadest overlap)
- [ ] Add basic page titles and descriptions to the app's own landing page so it's findable once articles start linking to it

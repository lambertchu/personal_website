---
title: Vibe coding my way back to baseball
description: I left the Yankees 5 years ago. AI helped bring me back to the sabermetrics game.
date: 2026-04-07 12:00:00
draft: false
slug: /blog/vibe-coding-baseball
cover: './vibe-coding-baseball.jpg'
tags:
  - MLB
  - Technology
  - Data Science
---

![](vibe-coding-baseball.jpg)

Five years ago, I made the difficult decision to leave my dream job at the New York Yankees front office. But ever since then, I've had this nagging itch to work on my own baseball analytics projects. Build something from scratch. Dive back into a field that I’ve always been passionate about.

So why didn't I?

The truth was that I was almost always too tired to write more code after coding all day at my day job. Instead, I'd go to the gym, plop down on the couch, and binge whatever was on Netflix. And honestly? I don't blame myself. I think a lot of engineers working in tech can relate to that feeling. "I'll start that side project this weekend" is the biggest lie we tell ourselves.

For five years, that's exactly how it went. The itch never went away, but the energy and motivation to actually do the work were not quite there.

Then came the seismic shift of agentic coding tools.

## The game has changed

When agentic coding tools like Claude Code first came out in 2025, I admit I didn't think THAT much of them. I'd been using LLMs to help me write code for a few years, and I assumed it would shift the needle a bit more in terms of speeding up my typical workflow.

There's the old Henry Ford saying about the innovation of cars: "If I had asked people what they wanted, they would have said faster horses." If the early days of code autocompletion was a horse, then Claude Code is a goddamn Ferrari. It has completely changed how I think about building anything and everything.

The mental burden has shifted dramatically. Instead of grinding through code, debugging errors, and worrying about architectural decisions, my mind is now free to focus on **strategy**. What kind of predictive model should I build? What does success look like? I think of an approach and describe it. Then, Claude runs with it, does comprehensive research online, and builds an elegant implementation in about five minutes. I ask it to evaluate the change and it spits out a clean summary of metrics. It feels like having J.A.R.V.I.S. from the Iron Man movies.

Here's the wild part: I've made meaningful progress on this project from my _phone_, nowhere near my laptop, while comfortably watching TV on the couch. The same couch that used to be where my side projects went to die is now where they come to life.

Claude Code wrote 99% of the code for me. The project reached its current state in only a few weeks of part-time work. It would've taken me months if I had to write every line myself, and honestly, it'd probably be buggier and lower quality.

### What I built

With fantasy baseball season approaching, I decided to build a machine learning model that predicts hitters' stats for the 2026 season. Specifically, the six stats that we score in a fantasy league with my friends: on-base percentage (OBP), slugging percentage (SLG), home runs (HR), runs (R), RBIs, and stolen bases (SB).

Plenty of baseball nerds like me have built projection models, but this one is quite distinct due to its multi-task learning (MTL) neural network architecture.

What makes the MTL model special? Instead of training six completely independent models (one per stat), it learns all six stats together through a shared backbone. The model's backbone extracts general features from the input, and each prediction "head" is uniquely designed to process those features to predict a specific stat. Think of it like a student studying for six different exams at once, where knowledge from one subject helps with the others. The model predicts rate stats like OBP and SLG, then feeds those predictions into the count stats like home runs and RBIs. It captures the natural relationships between stats; for example, a player with a high on-base percentage is probably going to score more runs.

Since the MTL model has multiple prediction heads, I decided to name it "Baseball Hydra" or just Hydra for short.

Under the hood, the model training pipeline pulls all 1.1 million Statcast batted ball metrics from the 2016 to 2025 seasons, plus FanGraphs stats, sprint speeds, bat speeds, ballpark factors, and more. All of that gets distilled into 100+ engineered features that describe a hitter's profile, like exit velocity percentiles, barrel rates, expected walk rate, sprint speed, etc.

### The results

You can find a CSV file of the full projections [here](https://github.com/lambertchu/baseball-hydra/blob/main/data/projections/projections_mtl_2026.csv).

So how do the results stack up against existing models? In baseball analytics, ZiPS and Steamer are two of the most well-known and well-regarded public projection systems. They've been refined over many years by some of the smartest people in the industry.

My Hydra model already beats both models in mean RSME when backtesting over the last 4 seasons. Not too bad for a few weeks of vibe coding from the couch!

Here are the full benchmark results. It covers 1,063 player-seasons from 2022-2025. These are RMSE numbers, so a lower number is better:

| System      | OBP    | SLG    | HR   | R     | RBI   | SB   | Mean RMSE |
| ----------- | ------ | ------ | ---- | ----- | ----- | ---- | --------- |
| **Hydra**   | 0.0306 | 0.0621 | 7.49 | 19.01 | 19.83 | 6.87 | **8.882** |
| ZiPS        | 0.0289 | 0.0594 | 7.45 | 19.71 | 21.24 | 6.41 | 9.151     |
| Steamer     | 0.0294 | 0.0602 | 7.96 | 20.94 | 21.55 | 6.53 | 9.512     |
| Last season | 0.0352 | 0.0726 | 8.65 | 22.37 | 23.23 | 7.35 | 10.284    |

Hydra is **2.9% ahead of ZiPS** and **6.6% ahead of Steamer** on aggregate mean RMSE. The largest gains come from the counting stats R and RBI. Presumably, this is where the MTL model architecture's cross-stat sharing helps the most.

Now, I'm not about to claim victory over these systems just yet. There's still gaps to close; even though my model performs better in aggregate, it is still behind ZiPS in predicting OBP and SLG.

On top of that, there are other models like The Bat X and ATC that are known to have the best performance amongst publicly available projections, but I wasn’t able to benchmark against them due to a lack or historical data (if you’re reading this and do have this data and want to share them with me, please hit me up!)

Personally, I am annoyed that Hydra predicts only ~40 home runs this year for Aaron Judge and Shohei Ohtani, my two favorite players. It seems quite conservative with predictions in general, which may make it look quite good when players “regress to the mean,” but it would fail to predict outlier season performances.

Despite some shortcomings, the fact that a novel multi-task approach can get this close, this quickly, is a really encouraging signal. It tells me that this architecture is onto something, and with more time and refinement, it can quickly become even better.

There are still plenty of other improvements that I'd like to try, including more sophisticated contact quality features, improved metrics for expected strikeouts and walks, injury history, minor league data, and sequence modeling of pitch outcomes... not to mention the need to build a new model or expand this one to cover pitching stats.

### The Risks

Believe it or not, not everything about agentic AI is perfect.

While working on Hydra, I didn't realize until very late that the model was treating the 2020 season like any other MLB season. But ask any baseball fan (or person older than 7) why 2020 was unlike any other year in the past or present; they would immediately know why. Thanks to COVID, there were only 60 games played that year compared to a normal year's 162 games.

It's funny how Claude Code was able to discuss advanced machine learning and sabermetrics like the smartest human alive, but it failed to consider the simple fact that COVID impacted baseball in 2020, significantly distorting the dataset and model training.

The fact that agentic AI is so smart 95% of the time is also what makes it dangerous... what happens when we blindly trust it during the other 5%? We still need humans tightly coupled with AI interactions; an observation that is trivial to a human still may not be obvious to machine. We can easily fall into the trap of lazily accepting AI output, but we are still needed for critical thinking to distinguish the fake-smart from the real-smart. The people that are able to do this effectively are now wielding superpowers.

### Creating over consuming

Something unexpected happened along the way. I started getting dopamine hits from _creating_ instead of mindlessly scrolling through my phone or watching TV. My side project stopped feeling like work and started feeling like play.

I wrote about the benefits of publishing your work [a few years ago](https://lambertchu.com/blog/publish-your-work), and one of my favorite takeaways was how the creative process provides a much more meaningful sense of fulfillment than consuming content. Building this project has been a perfect reminder of that, especially the feeling of being free to think about high-level details like a grand architect.

There's one funny downside though: I feel _more_ guilt when I'm not working on some kind of side project. When a side project required writing every line of code myself, I had an excuse for making slow progress. But when AI can crank out features in minutes? Suddenly, the only bottleneck is whether I actually type out a prompt. The excuses are running out.

### What's next

At the end of the day, I'm just a guy who loves baseball and missed being close to the game. Agentic coding tools gave me a way back in, and I'm having more fun than I expected.

My Baseball Hydra project is [open source on GitHub](https://github.com/lambertchu/baseball-hydra) if you want to check it out. Whether you're into baseball analytics, machine learning, or just curious about what agentic coding looks like in practice, I'd love to hear what you think. And if you've been sitting on your own side project idea for years and haven’t given agentic AI a shot — maybe it's time to dust it off. The tools are better than you think.

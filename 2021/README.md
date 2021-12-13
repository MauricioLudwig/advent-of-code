# Advent of Code 2021 ed.

##### Table of contents
1. [Stats and reflections](#stats-and-reflections)
2. [Solutions](#solutions)

## Stats and reflections

:computer: TypeScript + Node.js

:star: 26/50

| Day | Part 1 (time) | Part 1 (rank) | Part 2 (time) | Part 2 (rank) | Reflection |
| :-: | :-----------: | ------------: | :-----------: | ------------: | ---------- |
| [13](13.ts) | 01:36:12 | 8381 | 02:05:33 | 8631 | Approached this visually using a grid system and constructing new sub-grids when folding the paper along the x/y axis. For part 2 (of reasons unbeknownst) I could not generate the correct letter combinations (jumbled mess) unless I appended 3 to my original yMax. Fortunately my grid solution is able to fold along any length of the paper in either axis (by padding with either empty rows or columns). |
| [12](12.ts) | 01:09:40 | 5467 | 01:34:04 | 5032 | Tried in vain to get a recursive solution working. Opted instead of using a while loop and keeping track of each path & any new subsequent paths (from the next step in the current path) generated each loop. Solution for part 2 could be optimized further as it currently runs in about ~3 seconds |
| [11](11.ts) | 00:41:50 | 3860 | 00:45:59 | 3772 | Visual solution where I could compare each iteration against the examples. Recursion used in order to increase/flash tiles on the grid. Incidentally this approach yielded a one-liner to get the solution for part 2. Missed the step counter by 1 though due to starting at index 0 in the steps iteration. |
| [10](10.ts) | 00:17:08 | 3736 | 00:28:14 | 3279 | RegEx key to solving today's puzzles. Incidentally my idea to solve part 1 automatically transferred over to part 2. For part 2, by eliminating all the complete combinations, I was left with the inverse characters that were missing by which the score could easily be retrieved. |
| [9](09.ts) | 00:08:13 | 1097 | 01:40:31 | 7562 | Straightforward first part. Misread instructions for part 2 and initially calculated the basins only pertaining to the lowest points in the grid (yielding too low an answer). Correct result yielded when calculating for any arbitrary coordinate using recursion & re-assigning values in order to prevent duplicate checks. |
| [8](08.ts) | 00:24:23 | 6893 | 05:05:11 | 13605 | Approached this problem very visually by determining the placements of digits as well as each sequence's digit pattern. After which I was able to match each output to the aforementioned sequence list. Brute-force solution that leaves little to the imagination but plenty of headache. |
| [7](07.ts) | 00:05:00 | 1444 | 00:09:44 | 1693 | Very straightforward today. Not the fastest solution to execute due to alot of repeat calculations that could probably be optimized by memoizing previous iterations. |
| [6](06.ts) | 00:08:24 | 2252 | 01:31:47 | 9105 | Solved part 1 by simply iterating and keeping track of each fish and its current day. This naive solution was predictably too slow for part 2 which was solved by keeping track of the count (of fish(es)) for each given day instead of tracking individual fish. |
| [5](05.ts) | 00:22:12 | 2845 | 00:59:30 | 5057 | Loop hell, confusing attempts at traversing the grid in reverse directions. Diagonal coordinates ascertained by calculating the difference (equal) between points. A solution that includes a grid system, albeit slower, makes it easier to debug against the examples. |
| [4](04.ts) | 00:44:21 | 4395 | 02:48:18 | 10390 | - |
| [3](03.ts) | 00:09:50 | 2810 | 00:28:29 | 2195 | - |
| [2](02.ts) | 00:04:27 | 2537 | 00:08:06 | 2923 | - |
| [1](01.ts) | 00:03:05 | 1481 | 00:07:53 | 1638 | - |

## Screenshots

### Day 13 - Transparent Origami

Letter combination aquired upon folding the paper.

![Origami](screenshots/day13_transparent-origami.png?raw=true "Letter combination upon folding the paper")
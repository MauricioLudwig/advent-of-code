# Advent of Code 2020 ed.

##### Table of contents
1. [Stats and reflections](#stats-and-reflections)
2. [Solutions](#solutions)

## Stats and reflections

:computer: TypeScript + Node.js

:star: 28/50

| Day | Part 1 (time) | Part 1 (rank) | Part 2 (time) | Part 2 (rank) | Reflection |
| :-: | :-----------: | ------------: | :-----------: | ------------: | ---------- |
| [14](days/14.ts) | 01:28:58 | 6278 | 18:07:32 | 20395 | Turns out I could reuse a lot of logic from part 1 in solving part 2. However, finding the bit permutations turned out to be significantly more difficult. By visualizing the problem I could forego previous attempts at recursion and instead [implement a solution that relied on iteratively composing new array variations, then flattening the list and repeating this process](#day-14---docking-data). It was also easier to compose the list of permutations in isolation so I ended up writing a function that generates bit permutations to the nth power. |
| [13](days/13.ts) | 00:11:22 | 2187 | 03:40:17 | 5055 | The trick for part 2 is to somehow reduce the number of iterations (in this case by increasing the increment value). Since each bus ID is conveniently a prime number, we can increment each matching departure (from start to end) with the product of the current matching bus ID. First attempt at a solution was to simply increase by a multiple of the first bus ID, this however was way too slow. |
| [12](days/12.ts) | 00:22:50 | 3249 | 01:00:21 | 3942 | Directions handled with simple array increments (left & right values). Math.abs essential for getting the relative coordinates correctly. |
| [11](days/11.ts) | 00:15:43 | 627 | 00:47:04 | 1999 | Nothing special today, mostly tedious evaluation of different positions on the grid. Refactored to include a fully typed reusable class. |
| [10](days/10.ts) | 00:20:27 | 5772 | 01:57:42 | 5834 | Part 2 runs in ~ 1.5-2 ms! Part 1 solved using simple traversal. Part 2 solved using recursion (backwards traversal) and storing past iterations (nodes) for reuse. |
| [9](days/09.ts) | 00:15:34 | 3964 | 00:23:19 | 2882 | Brute force solution checking every combination in sequential order. |
| [8](days/08.ts) | 00:24:51 | 6207 | 00:34:48 | 3781 | Costly mistake checking against past accumulator values as opposed to past instructions. |
| [7](days/07.ts) | 01:30:37 | 7363 | 01:54:11 | 6217 | Recursive programming significantly easier to implement using a typed system. |
| [6](days/06.ts) | 00:07:40 | 2531 | 01:38:56 | 10462 | - |
| [5](days/05.ts) | 00:21:33 | 3927 | 00:44:03 | 5649 | Quick solution but poor performance (in larger context) due to array reassignment instead of tracking indices. |
| [4](days/04.ts) | 00:25:03 | 5043 | 01:50:16 | 7859 | Dangerous to omit end of line condition for regex expressions ($), e.g. password validation. |
| [3](days/03.ts) | 00:08:08 | 1691 | 00:10:55 | 1089 | Quick solution but poor performance (in larger context) using .repeat to extend the array boundary instead of evaluating the index. |
| [2](days/02.ts) | 00:06:14 | 1112 | 00:09:39 | 961 | - |
| [1](days/01.ts) | 00:11:29 | 2101 | 00:13:06 | 1827 | - |

## Solutions

A select list of solutions in which I delve deeper into a problem.
### Day 14 - Docking Data

Granted it took a little time to figure out the masking of bits, however, most of the time was spent on figuring out how to generate permutations for the bits.
In order to generate the list of all possible combinations I start with an empty array (the length equal to the power) filled with 0s. I then (beginning at index 0) work my way towards the end of the array whilst (in each iteration) creating a new array where the nth character is replaced by either 0 or 1.

![Visualizing the problem](screenshots/day14_bit-permutation.png?raw=true "Visualizing the problem")

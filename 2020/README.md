# Advent of Code 2020 ed.

:computer: TypeScript + Node.js

:star: 24/50

| Day | Part 1 (time) | Part 1 (rank) | Part 2 (time) | Part 2 (rank) | Reflection |
| :-: | :-----------: | ------------: | :-----------: | ------------: | ---------- |
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

using _2015.Input;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _2015.Days
{
    class _03
    {
        public void Run()
        {
            int index = 0;
            var santa1 = new PresentDelivery();
            var santa2 = new PresentDelivery();
            var robot = new PresentDelivery();

            foreach (var direction in Helper.GetAsSingleLine("03.txt"))
            {
                santa1.Traverse(direction);

                if (index++ % 2 == 0)
                {
                    santa2.Traverse(direction);
                }
                else
                {
                    robot.Traverse(direction);
                }
            }

            Console.WriteLine(santa1.GetExcessHouses());

            foreach (var santa2House in santa2.houses)
            {
                if (robot.houses.TryGetValue((santa2House.Key.Item1, santa2House.Key.Item2), out int count))
                {
                    santa2.houses.Remove((santa2House.Key.Item1, santa2House.Key.Item2));
                    robot.houses[(santa2House.Key.Item1, santa2House.Key.Item2)] += count;
                }
            }
            Console.WriteLine(santa2.GetExcessHouses() + robot.GetExcessHouses());
        }

        class PresentDelivery
        {
            int x, y = 0;
            internal IDictionary<(int, int), int> houses = new Dictionary<(int, int), int>()
            {
                { (0, 0), 1 }
            };

            internal void Traverse(char direction)
            {
                switch (direction)
                {
                    case '^':
                        y++;
                        break;
                    case '>':
                        x++;
                        break;
                    case 'v':
                        y--;
                        break;
                    case '<':
                        x--;
                        break;
                    default:
                        throw new Exception();
                }

                if (houses.TryGetValue((x, y), out int _))
                {
                    houses[(x, y)]++;
                }
                else
                {
                    houses.Add((x, y), 1);
                }
            }

            internal int GetExcessHouses()
            {
                return houses.Where(o => o.Value >= 1).Count();
            }
        }

    }
}

using _2015.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _2015.Days
{
    class _02
    {
        public void Run()
        {
            var dimensions = Helper.GetAsArray("02.txt").Select(o =>
            {
                var x = o.Split('x').Select(int.Parse).ToArray();
                return new
                {
                    length = x[0],
                    width = x[1],
                    height = x[2],
                    values = x.OrderBy(o => o).ToList(),
                };
            });

            var squareFeet = dimensions.Aggregate(0, (acc, curr) =>
            {
                var x = new List<int>
                {
                    curr.length * curr.width,
                    curr.width * curr.height,
                    curr.height * curr.length
                };

                return acc + x.Min() + x.Sum((val) => val * 2);
            });

            Console.WriteLine(squareFeet);

            var feetOfRibbon = dimensions.Aggregate(0, (acc, curr) =>
            {
                var ribbon = curr.values[0] * 2 + curr.values[1] * 2;
                return acc + ribbon + curr.values.Aggregate(1, (x, y) => x * y);
            });

            Console.WriteLine(feetOfRibbon);
        }
    }
}

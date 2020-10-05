using _2015.Input;
using System;
using System.Linq;

namespace _2015.Days
{
    class _01
    {
        public void Run()
        {
            var instructions = Helper.GetAsSingleLine("01.txt");
            var floor = instructions.Aggregate(0, (acc, curr) => acc + (curr == '(' ? 1 : -1));
            Console.WriteLine(floor);
        }
    }
}

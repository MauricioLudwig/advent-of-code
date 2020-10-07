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
            Console.WriteLine(instructions.Length);
            var floor = instructions.Aggregate(0, (acc, curr) => acc + (curr == '(' ? 1 : -1));
            Console.WriteLine(floor);

            var index = 0;
            var currentFloor = 0;

            foreach (var instruction in instructions)
            {
                index++;
                currentFloor += instruction == '(' ? 1 : -1;
                if (currentFloor == -1)
                {
                    break;
                }
            }

            Console.WriteLine(index);
        }
    }
}

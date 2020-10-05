using System;
using System.IO;

namespace _2015.Input
{
    public static class Helper
    {
        static string GetFilePath(string fileName)
        {
            var rootPath = Directory.GetParent(Environment.CurrentDirectory).Parent.Parent.FullName;
            return $"{rootPath}/input/files/{fileName}";
        }

        public static string GetAsSingleLine(string fileName)
        {
            return File.ReadAllText(GetFilePath(fileName));
        }
    }
}

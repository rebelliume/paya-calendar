using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Paya
{
    class Program
    {
        public class GlobalVariables
        {
            public static string NowData;
            public static string DiffDate;
        }
        public class Planet
        {
            internal double orbitalPeriod;

            public string Name { get; set; }
            public double OrbitalPeriod { get; set; }
        }
        private static void TimerCallback(Object o)
        {
            Console.WriteLine($"TIME: {GlobalVariables.DiffDate}\nDEGREE: {GlobalVariables.NowData}\n");
        }

        static void Main(string[] args)
        {
            Console.Title = "Paya";
            Console.WindowWidth = 50;
            var planets = new Planet[]
            {
                new Planet { Name = "Solar", OrbitalPeriod = 0 },
                new Planet { Name = "Mercury", OrbitalPeriod = 87.97 },
                new Planet { Name = "Venus", OrbitalPeriod = 224.70 },
                new Planet { Name = "Earth", OrbitalPeriod = 365.25 },
                new Planet { Name = "Mars", OrbitalPeriod = 686.97 },
                new Planet { Name = "Jupiter", OrbitalPeriod = 4332.59 },
                new Planet { Name = "Saturn", OrbitalPeriod = 10759.22 },
                new Planet { Name = "Uranus", OrbitalPeriod = 30688.50 },
                new Planet { Name = "Neptune", OrbitalPeriod = 60190.03 },
                new Planet { Name = "Pluto", OrbitalPeriod = 90560.07 },
                new Planet { Name = "Ceres", OrbitalPeriod = 1681.63 },
                new Planet { Name = "Eris", OrbitalPeriod = 203830 },
                new Planet { Name = "Haumea", OrbitalPeriod = 285195.4 },
                new Planet { Name = "Makemake", OrbitalPeriod = 309871.9 }
            };


            var observDateErrO = DateTime.Parse("2023-08-27");
            var nowDateErrO = DateTime.Now;
            var diffDateErrO = (nowDateErrO - observDateErrO).TotalDays / 365.25;

            //diffDateErrO        = 7.960243407142212;
            //diffDateErrO        = 89.49580697133393;
            //diffDateErrO        = 171.029007080852;

            var heliocentricLongitudeO = new Dictionary<string, double>
        {
            { "Mercury", 305.03184 },
            { "Venus", 341.92530 },
            { "Earth", 334.31054 },
            { "Mars", 195.51789 },
            { "Jupiter", 34.295280 },
            { "Saturn", 333.84907 },
            { "Uranus", 50.171940 },
            { "Neptune", 356.13987 },
            { "Pluto", 299.69090 },
            { "Ceres", 218.38950 },
            { "Eris", 20.356800 },
            { "Haumea", 210.61220 },
            { "Makemake", 186.91670 }
        };

            void Calc()
            {
                Timer timer = new Timer(TimerCallback, null, 0, 2500);
                while (true)
                {
                    var geoLongitude = new Dictionary<string, double>();

                    diffDateErrO += 0.00011407711613050422;
                    //diffDateErrO += 0.000001901285268841737;

                    int loop = 1;
                    foreach (var planet in heliocentricLongitudeO)
                    {
                        double wFormule = diffDateErrO * (360 / (planets[loop].OrbitalPeriod / 365.25));
                        geoLongitude[planet.Key] = ((planet.Value + wFormule) + 180) % 360;
                        loop += 1;
                    }

                    if (Math.Round(geoLongitude["Mercury"]) == Math.Round(geoLongitude["Venus"]) && Math.Round(geoLongitude["Venus"]) == Math.Round(geoLongitude["Earth"]))
                    //if (Math.Round(geoLongitude["Mercury"]) == Math.Round(geoLongitude["Venus"]) && Math.Round(geoLongitude["Venus"]) == Math.Round(geoLongitude["Earth"]) && Math.Round(geoLongitude["Earth"]) == Math.Round(geoLongitude["Mars"]))
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("FOUND");
                        Console.WriteLine($"TIME: {diffDateErrO}\nDEGREE: {Math.Round(geoLongitude["Mercury"])}:{Math.Round(geoLongitude["Venus"])}:{Math.Round(geoLongitude["Earth"])}\n");
                        //Console.WriteLine($"TIME: {diffDateErrO}\nDEGREE: {Math.Round(geoLongitude["Mercury"])}:{Math.Round(geoLongitude["Venus"])}:{Math.Round(geoLongitude["Earth"])}:{Math.Round(geoLongitude["Mars"])}\n");                        
                        Console.ForegroundColor = ConsoleColor.White;
                        diffDateErrO += 1;
                        //break;
                    }
                    else
                    {
                        GlobalVariables.DiffDate = diffDateErrO.ToString();
                        GlobalVariables.NowData = $"{Math.Round(geoLongitude["Mercury"])}:{Math.Round(geoLongitude["Venus"])}:{Math.Round(geoLongitude["Earth"])}:{Math.Round(geoLongitude["Mars"])}";
                    }
                }
                Console.ReadLine();
            }

            Calc();
        }
    }
}
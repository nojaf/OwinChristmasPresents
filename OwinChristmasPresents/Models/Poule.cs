using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OwinChristmasPresents.Models
{
    public class Poule
    {
        public string Name { get; set; }

        public IEnumerable<Person> People { get; set; }
    }
}
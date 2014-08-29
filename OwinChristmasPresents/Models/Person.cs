using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OwinChristmasPresents.Models
{
    public class Person
    {
        public string Name { get; set; }

        public string BuysFor { get; set; }

        public override string ToString()
        {
            return string.Format("{0} buys for {1}", Name, BuysFor);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OwinChristmasPresents.Models
{
    public class Family
    {
        public IEnumerable<Poule> Poules { get; set; }
    }
}
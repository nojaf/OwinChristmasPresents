using OwinChristmasPresents.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace OwinChristmasPresents.Controllers
{
    [RoutePrefix("api/present")]
    public class PresentApiController : ApiController
    {
        [Route("echo/{message}")]
        [HttpGet]
        public HttpResponseMessage Echo(string message)
        {
            return Request.CreateResponse<string>("Echo " + message);
        }

        [Route("randomize")]
        [HttpPost]
        public HttpResponseMessage Randomize(IEnumerable<Person> model)
        {
            Person[] randomOrder = Randomize<Person>(model);
            int length = randomOrder.Length;
            for (int i = 0; i < length; i++)
            {
                if (i < length - 1)
                {
                    randomOrder[i].BuysFor = randomOrder[i + 1].Name;
                }else
                {
                    //last person buys for the first one
                    randomOrder[i].BuysFor = randomOrder[0].Name;
                }
            }

            return Request.CreateResponse<Person[]>(randomOrder);
        }

        private T[] Randomize<T>(IEnumerable<T> target)
        {
            Random r = new Random();
            return target.OrderBy(x => (r.Next())).ToArray();
        }  
        [Route("translate")]
        [HttpGet]
        public HttpResponseMessage Translate(string lang)
        {
            Dictionary<string, string> translations = (lang == "nl" ? GetDutch() : GetEnglish());
            return Request.CreateResponse<Dictionary<string, string>>(translations);
        }

        private Dictionary<string, string> GetDutch()
        {
            Dictionary<string, string> dutch = new Dictionary<string, string>();
            dutch.Add("mainTitle", "Kerstavond cadeaus");
            dutch.Add("subTitle", "Een demo applicatie gemaakt met Owin, de source is op ");
            dutch.Add("personPlaceHolder", "Voeg een nieuwe persoon toe");
            return dutch;
        }

        private Dictionary<string, string> GetEnglish()
        {
            return null;
        }
    }
}
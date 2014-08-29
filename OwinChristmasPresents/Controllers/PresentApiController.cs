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
    }
}
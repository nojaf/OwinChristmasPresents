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
    }
}
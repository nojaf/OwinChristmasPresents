using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.StaticFiles;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Extensions;
using System.Web.Http;

[assembly: OwinStartup(typeof(OwinChristmasPresents.Startup))]

namespace OwinChristmasPresents
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
#if DEBUG
            //when things go south
            app.UseErrorPage();
#endif

            // Remap '/' to '.\public\'.
            // Turns on static files and public files.
            app.UseFileServer(new FileServerOptions()
            {
                RequestPath = PathString.Empty,
                FileSystem = new PhysicalFileSystem(@".\\public"),
            });

            app.UseStageMarker(PipelineStage.MapHandler);

            //Web Api
            HttpConfiguration config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            //Cause all the cool kids use JSON
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = true;
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            app.UseWebApi(config);

        }
    }
}

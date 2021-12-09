using System.Threading.Tasks;
using Statiq.App;
using Statiq.Web;
using Statiq.Common;

namespace MySite
{
  public class Program
  {
    public static async Task<int> Main(string[] args) =>
      await Bootstrapper
        .Factory
        .CreateWeb(args)
        .AddProcess(ProcessTiming.Initialization, _ => new ProcessLauncher("yarn", "install", "--immutable"))
        .AddProcess(ProcessTiming.BeforeExecution, _ => new ProcessLauncher("gulp"))
        .RunAsync();
  }
}
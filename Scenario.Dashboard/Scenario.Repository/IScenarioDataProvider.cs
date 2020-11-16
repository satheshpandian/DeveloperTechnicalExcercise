using System.Collections.Generic;
using Scenarios.Models;

namespace Scenarios.Repository
{
    public interface IScenarioDataProvider
    {
        List<Scenario> GetAllScenarios();
    }
}
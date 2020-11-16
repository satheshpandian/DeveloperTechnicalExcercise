using System.Collections.Generic;
using Scenarios.Models;

namespace Scenarios.Repository
{
    public interface IScenarioRepository
    {
        List<Scenario> GetAllScenarios();
    }
}
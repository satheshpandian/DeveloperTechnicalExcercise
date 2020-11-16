using Scenarios.Models;
using System.Collections.Generic;

namespace Scenarios.Repository
{
    public class ScenarioRepository: IScenarioRepository
    {
        private IScenarioDataProvider _iScenarioDataProvider;
        public ScenarioRepository(IScenarioDataProvider iScenarioDataProvider)
        {
            _iScenarioDataProvider = iScenarioDataProvider;
        }

        public List<Scenario> GetAllScenarios()
        {
            return _iScenarioDataProvider.GetAllScenarios();
        }
    }
}

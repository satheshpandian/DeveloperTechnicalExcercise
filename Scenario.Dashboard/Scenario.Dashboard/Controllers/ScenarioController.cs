using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Scenarios.Repository;

namespace Scenarios.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ScenarioController : ControllerBase
    {
        private readonly ILogger<ScenarioController> _logger;
        private readonly IScenarioRepository _scenarioRepository;

        public ScenarioController(ILogger<ScenarioController> logger, IScenarioRepository scenarioRepository)
        {
            _logger = logger;
            _scenarioRepository = scenarioRepository;
        }

        [HttpGet]
        public IEnumerable<Models.Scenario> Get()
        {
            return _scenarioRepository.GetAllScenarios().AsEnumerable();
        }

        [HttpGet]
        [Route("getNetworkLayers")]
        public int[] GetNetworkLayers()
        {
            return _scenarioRepository.GetAllScenarios().Select(x => x.NetworkLayerID).Distinct().OrderBy(x=>x).ToArray();
        }

        [HttpGet]
        [Route("getMarkets/{networkLayerId}")]
        public int[] GetMarketsByNetWorkLayerId(int networkLayerId)
        {
            return _scenarioRepository.GetAllScenarios().Where(x => x.NetworkLayerID==networkLayerId)
                .Select(x => x.MarketID).Distinct().OrderBy(x => x).ToArray();
        }

        [HttpGet]
        [Route("getNumOfMonths/{marketId}")]
        public int[] GetNumOfMonthsBymarketId(int marketId)
        {
            return _scenarioRepository.GetAllScenarios().Where(x => x.MarketID == marketId)
                .Select(x => x.NumMonths).Distinct().OrderBy(x => x).ToArray();
        }

        [HttpGet]
        [Route("getScenarios/{networkLayerId}/{marketId}/{numOfMonths}")]
        public List<Models.Scenario> GetScenarios(int networkLayerId,int marketId, int numOfMonths)
        {
            return _scenarioRepository.GetAllScenarios()
                .Where(x => x.NetworkLayerID == networkLayerId && x.MarketID==marketId && x.NumMonths==numOfMonths).ToList();
        }
    }
}

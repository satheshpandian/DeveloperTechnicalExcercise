using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Xml.Serialization;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Scenarios.Models;

namespace Scenarios.Repository
{
    public class ScenarioDataProvider: IScenarioDataProvider
    {
        private  XmlSerializer _serializer;
        private readonly IMemoryCache _cache;
        private const string CacheKey = "scenario-key";
        public string FilePath { get; set; }
        public ScenarioDataProvider(IMemoryCache cache, IOptions<AppSettings> appSettings)
        {
            _cache = cache;
            FilePath = appSettings.Value.DataFile;
            
        }

        public List<Scenario> GetAllScenarios()
        {
            if (!_cache.TryGetValue(CacheKey, out List<Scenario> scenarios))
            {
                StreamReader reader = new StreamReader(FilePath);
                _serializer = new XmlSerializer(typeof(List<Scenario>), new XmlRootAttribute("Data"));
                scenarios = (List<Scenario>)_serializer.Deserialize(reader);
                _cache.Set(CacheKey, scenarios);
                return scenarios;
            }
            return scenarios;
        }
    }
}
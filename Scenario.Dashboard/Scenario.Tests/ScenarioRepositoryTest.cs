using System;
using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using Scenarios.Repository;

namespace Scenarios.Tests
{
    public class ScenarioRepositoryTest
    {
        private Mock<IScenarioDataProvider> _iScenarioDataProvider;
        [Test]
        public void GetAllScenariosTest()
        {
            //Arrange
            _iScenarioDataProvider=new Mock<IScenarioDataProvider>();
            _iScenarioDataProvider.Setup(x => x.GetAllScenarios()).Returns(new List<Scenarios.Models.Scenario>()
            {
                new Scenarios.Models.Scenario()
                {
                    UserID = Guid.NewGuid().ToString()
                }
            });

            //Act
            ScenarioRepository scenarioRepository=new ScenarioRepository(_iScenarioDataProvider.Object);
            var lst = scenarioRepository.GetAllScenarios();

            //Assert
            Assert.NotNull(lst);
            Assert.AreEqual(lst.Count,1);
        }
    }
}
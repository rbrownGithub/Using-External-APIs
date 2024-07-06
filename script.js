document.getElementById('statsForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const playerName = document.getElementById('playerName').value;
  
    try {
      const response = await fetch('/get-nba-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerName })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const playerStats = await response.json();
      displayStats(playerStats);
    } catch (error) {
      console.error('Error fetching data:', error);
      const statsResults = document.getElementById('statsResults');
      statsResults.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
  });
  
  function displayStats(stats) {
    const statsResults = document.getElementById('statsResults');
    statsResults.innerHTML = '';
  
    for (let stat in stats) {
      if (stats.hasOwnProperty(stat)) {
        const statItem = document.createElement('p');
        statItem.textContent = `${stat}: ${stats[stat]}`;
        statsResults.appendChild(statItem);
      }
    }
  }
  
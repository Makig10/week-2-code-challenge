fetch('./db.json')
  .then(response => response.json())
  .then(characters => {
    
    const animalListElement = document.getElementById('animalList');
    characters.forEach(character => {
      const listItem = document.createElement('li');
      listItem.textContent = character.name;
      listItem.addEventListener('click', () => {
        
        fetch(`./db.json/${character.id}`)
          .then(response => response.json())
          .then(animal => {
            const animalDetailsElement = document.getElementById('animalDetails');
            animalDetailsElement.innerHTML = `
              <h2>${animal.name}</h2>
              <img src="${animal.image}" alt="${animal.name}">
              <p>Votes: ${animal.votes}</p>
              <button id="voteButton">Vote</button>
            `;
            const voteButton = document.getElementById('voteButton');
            voteButton.addEventListener('click', () => {
              
              animal.votes++;
              animalDetailsElement.innerHTML = `
                <h2>${animal.name}</h2>
                <img src="${animal.image}" alt="${animal.name}">
                <p>Votes: ${animal.votes}</p>
                <button id="voteButton">Vote</button>
              `;
            });
          })
          
      animalListElement.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Failed to fetch animal list:', error);
  });
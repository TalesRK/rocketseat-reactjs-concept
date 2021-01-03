import React from "react";

import "./styles.css";
import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      'title': `Novo Repositório ${Date.now()}`
    })

    const repository = response.data;

    setRepositories([...repositories, repository])
  }
  

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    let updatedRepositories = repositories.filter(repo => repo.id !== id);
    setRepositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => 
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getEssayBibliography from '@wasp/queries/getEssayBibliography';
import createBibliography from '@wasp/actions/createBibliography';

export function EssayPage() {
  const { essayId } = useParams();

  const { data: essay, isLoading: essayLoading, error: essayError } = useQuery(getEssayBibliography, { essayId });

  const handleCreateBibliography = async () => {
    try {
      const newBibliography = await createBibliography({ essayId });
      console.log('New bibliography created:', newBibliography);
    } catch (error) {
      console.error('Failed to create bibliography:', error);
    }
  };

  return (
    <div>
      {essayLoading ? (
        <p>Loading essay...</p>
      ) : essayError ? (
        <p>Error: {essayError.message}</p>
      ) : (
        <div>
          <h1>{essay.title}</h1>
          <p>{essay.content}</p>
          <h2>Bibliography</h2>
          {essay.bibliography.map((item) => (
            <div key={item.id}>
              <p>{item.source}</p>
              <p>{item.format}</p>
            </div>
          ))}
          <button onClick={handleCreateBibliography}>Add to Bibliography</button>
        </div>
      )}
    </div>
  );
}
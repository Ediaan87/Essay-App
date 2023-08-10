import React from 'react';
import { useQuery } from '@wasp/queries';
import getUserEssays from '@wasp/queries/getUserEssays';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { data: essays, isLoading, error } = useQuery(getUserEssays);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4 bg-slate-50">
      <h1 className="text-2xl font-bold mb-4">My Essays</h1>
      {essays.map((essay) => (
        <div key={essay.id} className="mb-4">
          <h2 className="text-lg font-semibold">{essay.title}</h2>
          <p className="text-gray-600">Word Count: {essay.wordCount}</p>
          <Link to={`/essay/${essay.id}`} className="text-blue-500">View Essay</Link>
        </div>
      ))}
    </div>
  );
}
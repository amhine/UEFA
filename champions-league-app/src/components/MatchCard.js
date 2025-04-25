import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MatchCard({ match }) {
  const navigate = useNavigate();
  const [manOfTheMatch, setManOfTheMatch] = useState(null);

  useEffect(() => {
    const fetchManOfTheMatch = async () => {
      try {
        const response = await axios.get(`https://api.sofascore.com/api/v1/event/${match.id}/statistics`);
        if (response.data && response.data.event && response.data.event.manOfTheMatch) {
          setManOfTheMatch(response.data.event.manOfTheMatch);
        }
      } catch (error) {
        console.error('Error fetching Man of the Match:', error);
      }
    };

    fetchManOfTheMatch();
  }, [match.id]);

  return (
    <div className="match-card">
      <h3>{match.tournament.name}</h3>
      
      <div className="match-teams">
        <div>{match.homeTeam.name}</div>
        <div>VS</div>
        <div>{match.awayTeam.name}</div>
      </div>

      <div className="match-info">
        <p>Date: {new Date(match.startTimestamp * 1000).toLocaleDateString()}</p>
        <p>Stade: {match.venue?.name || 'Non spécifié'}</p>
      </div>

      {manOfTheMatch ? (
        <div className="man-of-match">
          <p>Man of the Match: {manOfTheMatch.name}</p>
          {manOfTheMatch.rating && <p>Note: {manOfTheMatch.rating}/10</p>}
        </div>
      ) : (
        <div className="match-info">
          <p>Man of the Match: Information non disponible</p>
        </div>
      )}

      <button 
        className="back-button"
        onClick={() => navigate(`/match/${match.id}`)}
      >
        Voir les détails
      </button>
    </div>
  );
}

export default MatchCard; 
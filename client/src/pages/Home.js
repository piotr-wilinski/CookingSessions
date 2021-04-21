import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks'

import CookingSessionCard from '../components/CookingSessionCard'
import { FETCH_SESSIONS_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth'

import { Grid, Transition } from 'semantic-ui-react'
// import PostForm from '../components/PostForm';

import '../style/pages/Home.scss'

const Home = () => {
  const { user } = useContext(AuthContext)

  const {
    loading,
    data: { getSessions: sessions } = {}
  } = useQuery(FETCH_SESSIONS_QUERY);

  return (
    <div className="sessions">
      <div className="sessions__header">
        <h1 className="sessions__headline">Cooking Sessions with Buddies</h1>
        <p className="sessions__subheadline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, pariatur! Vitae ab tempora provident illum dolor neque, repellendus architecto ea dignissimos corporis debitis perferendis, animi aspernatur. Corrupti ad dignissimos inventore!</p>
      </div>
      {loading ? (
        <h2 className="sessions__loading">Loading Cooking Sessions...</h2>
      ) : (
          <div className="sessions__card">
            <Transition.Group>
              {sessions && sessions.map(session => (
                <CookingSessionCard key={session.id} session={session} />
              ))}
            </Transition.Group>
          </div>
        )}
    </div>
  );
}



export default Home;
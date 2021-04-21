import gql from 'graphql-tag';

export const FETCH_SESSIONS_QUERY = gql`
{
  getSessions {
    id
    title
    imageUrl
    body
    username
    name
    surname
    createdAt
    timeOfStart
    capacity
    url
    ingredients
    tools
    signedUp {
      username
      name
      surname
    }
    signedCount
    exp
    other
    category
    isActive
    isPremium
  }
}
`
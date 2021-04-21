import React from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useForm } from '../util/hooks'
import { FETCH_SESSIONS_QUERY } from '../util/graphql'

import '../style/pages/CreateCookingSession.scss'

const CreateCookingSession = () => {
  const { values, onChange, onSubmit } = useForm(createSessionCallback, {
    title: '',
    body: '',
    imageUrl: '',
    timeOfStart: '',
    capacity: 5,
    url: '',
    ingredients: ["test"],
    tools: ["test"],
    exp: '',
    other: '',
    category: ''
  })

  const [createSession, { error }] = useMutation(CREATE_SESSION_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_SESSIONS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_SESSIONS_QUERY,
        data: { getSessions: [result.data.createSession, ...data.getSessions] }
      })
      values.title = ''
      values.body = ''
      values.imageUrl = ''
      values.timeOfStart = ''
      values.capacity = ''
      values.url = ''
      values.ingredients = ["test"]
      values.tools = ["test"]
      values.exp = ''
      values.other = ''
      values.category = ''
    }
  })

  function createSessionCallback() {
    createSession()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Create a Cooking Session:</h2>

      <label htmlFor="title">
        Title:
        <input
          id="title"
          type="text"
          name="title"
          onChange={onChange}
          value={values.title}
          error={error ? true : false} />
      </label>

      <label htmlFor="body">
        Body:
        <input
          id="body"
          type="text"
          name="body"
          onChange={onChange}
          value={values.body}
          error={error ? true : false} />
      </label>

      <label htmlFor="imageUrl">
        Image (url):
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          onChange={onChange}
          value={values.imageUrl}
          error={error ? true : false} />
      </label>

      <label htmlFor="timeOfStart">
        Start time:
        <input
          id="timeOfStart"
          type="datetime-local"
          name="timeOfStart"
          onChange={onChange}
          value={values.timeOfStart}
          error={error ? true : false} />
      </label>

      <label htmlFor="capacity">
        Capacity:
        <input
          id="capacity"
          type="number"
          name="capacity"
          onChange={onChange}
          value={values.capacity}
          error={error ? true : false} />
      </label>

      <label htmlFor="url">
        Link to the meeting:
        <input
          id="url"
          type="text"
          name="url"
          onChange={onChange}
          value={values.url}
          error={error ? true : false} />
      </label>

      <label htmlFor="exp">
        Experience needed:
        <input
          id="exp"
          type="text"
          name="exp"
          onChange={onChange}
          value={values.exp}
          error={error ? true : false} />
      </label>

      <label htmlFor="other">
        Other informations:
        <input
          id="other"
          type="text"
          name="other"
          onChange={onChange}
          value={values.other}
          error={error ? true : false} />
      </label>

      <label htmlFor="category">
        Category:
        <input
          id="category"
          type="text"
          name="category"
          onChange={onChange}
          value={values.category}
          error={error ? true : false} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

const CREATE_SESSION_MUTATION = gql`
  mutation createSession(
    $title: String!
    $body: String!
    $imageUrl: String!
    $timeOfStart: String!
    $capacity: String!
    $url: String!
    $ingredients: [String!]
    $tools: [String!]
    $exp: String!
    $other: String
    $category: String
    ) {
      createSession(
        title: $title
        body: $body
        imageUrl: $imageUrl
        timeOfStart: $timeOfStart
        capacity: $capacity
        url: $url
        ingredients: $ingredients
        tools: $tools
        exp: $exp
        other: $other
        category: $category
      ) {
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

export default CreateCookingSession;
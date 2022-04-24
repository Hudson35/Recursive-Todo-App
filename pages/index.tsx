import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TodoApp from '../components/TodoApp'
import ListContext from '../components/TodoContext'


const Home: NextPage = () => {
  return (
    <>
      <ListContext>
        <TodoApp />
      </ListContext>
    </>
  )
}

export default Home

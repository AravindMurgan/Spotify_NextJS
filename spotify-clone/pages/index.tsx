import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-hidden' >
      {/* Sidebar */}
      {/* Maincontent */}
      <main>
        <Sidebar />
      </main>

    </div>
  )
}

export default Home

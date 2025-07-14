import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = lazy(() => import("./components/web/Navbar"))
const Home = lazy(() => import("./pages/Home"))
const ResumeLayout = lazy(() => import("./pages/ResumeLayout"))
const ResumeFormat = lazy(() => import("./pages/ResumeFormat"))
const Format1 = lazy(() => import("./pages/Format1"))

function App() {

  const { theme } = useSelector((state) => state.data)

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className='flex items-center justify-center h-screen'>
          <img src="/loading.gif" alt="Loading" />
        </div>
      }>
        <div className={`${theme === "dark" && "bg-zinc-800 text-gray-300"}`}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/resume/new' element={<ResumeLayout />} />
            <Route path='/resume/format' element={<ResumeFormat />} />
            <Route path='/resume/format/1' element={<Format1 />} />
            <Route path='*' element={<h1>Error 404 || Page not found</h1>} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  )
}
export default App;
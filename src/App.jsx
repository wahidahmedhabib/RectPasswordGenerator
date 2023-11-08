import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(9)
  const [numberAllow, setNumberAllow] = useState(true)
  const [charactorallow, setCharactorallow] = useState(true)

  const PassGenrator = useCallback(() => {
    let pass = ''
    let resultpass = `QWERTYUIOPLKJHGFDSAZXCVBNM${charactorallow ? '~!@#$%^&*+=?/><' : ''}${numberAllow ? '1234567890' : ''}mnbvcxzasdfghjklpoiuytrewq`
    for (var i = 0; i < length; i++) {
      let ind = Math.floor(Math.random() * resultpass.length)
      pass += resultpass[ind]
    }
    setPassword(pass)

  }
    , [length, numberAllow, charactorallow, setPassword])

  useEffect(() => {
    PassGenrator()
  }, [length, numberAllow, charactorallow, setPassword, PassGenrator])

  const passRef = useRef(null)

  const copyPassToClip = useCallback(() => {
    passRef.current?.select()
    navigator.clipboard.writeText(password)
  }
    , [password])


  return (
    <>
      <div className='w-[70vw] lg:w-[50%] rounded-xl  h-48 p-1
       mx-auto mt-10 bg-gray-600  f lex    '>

        <h1 className=' text-center mt-5 text-white font-bold text-2xl'>
          PassWord Generator
        </h1>
        <div className=' flex items-center rounded-2xl
         w-[90%] m-auto  mt-4' >
          <input type="text"
            readOnly
            ref={passRef}
            value={password}
            placeholder='Password'
            className='h-10 w-[80%] border-r-emerald-950 
          rounded-l-xl p-2  text-lg outline-none '
            name="" id="" />

          <button
            onClick={copyPassToClip}
            className='w-[20%] rounded-r-xl h-10
            hover:bg-blue-500 transition-all duration-500
             bg-blue-700 text-white font-bold  ' >
            COPY
          </button>
        </div>

        <div className=' flex
         md:flex  justify-center items-center 
        min-[320px]:mt-4  max-[600px]:flex-col
        gap-3  text-orange-600 font-bold '>
          <div className='flex gap-1  min-w-[230px]'>
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='' />
            <label htmlFor=""
            >Length : {length}</label>
            {/* Length :{ length }  */}
          </div>

          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              onChange={() => {
                setNumberAllow(prev => !prev)
              }}
              name="" id="" />Numbers
          </div>
          <div>
            <input
              defaultChecked={charactorallow}

              onChange={() => {
                setCharactorallow(prev => !prev)
              }}
              type="checkbox" name="" id="" />Character
          </div>


        </div>

      </div>

    </>
  )
}

export default App

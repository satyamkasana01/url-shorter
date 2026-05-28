import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const UrlForm = () => {
  const [url, setUrl] = useState('https://www.google.com')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await axios.post('http://localhost:3000/api/create', { url })
      console.log(data.data)
    } catch (error) {
      console.log("Axios error:", error)
    }
  }

  return (
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event)=>setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
        type='submit'
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">
            Shorten URL
        </button>
      </form>
  )

}


export  {UrlForm}

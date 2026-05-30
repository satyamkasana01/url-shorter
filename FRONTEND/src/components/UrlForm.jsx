import React  from 'react'
import { useState } from 'react'
import axios from 'axios'
import { createShortUrl } from '../api/shortUrl.api'


const UrlForm = () => {
  const [url, setUrl] = useState('https://www.google.com')
  const [shortUrl, setShortUrl] = useState('')
  const[copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault() 

    try {
      const data = await createShortUrl(url)
      //console.log(data)
      setShortUrl(data.shortUrl) // This .shortUrl is not from this useState, it is from the backend response of the API which we are getting in data variable
    } catch (error) {
      console.log("Error:", error.message)
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

        {shortUrl && (
  <div className="mt-4 p-3 bg-gray-100 rounded-md">
    <p className="text-sm text-gray-700 mb-2">Short URL:</p>

    <div className="flex items-center gap-2">
      <input
        type="text"
        value={shortUrl}
        readOnly
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
      />

      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(shortUrl)
            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 500)
        }}
        className={`px-3 py-2 text-white rounded-md ${
          copied ? "bg-green-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
    >
        {copied ? "Copied" : "Copy"}
    </button>
    </div>
  </div>
)}
        
      </form>
  )

}


export  {UrlForm}

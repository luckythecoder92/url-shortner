import React, { useState } from 'react';
import  axiosInstance  from '../utils/axiosInstance.js';
// import shortUrl from '../../../backend/src/models/shorturl.model.js';
import { createShortUrl } from '../apis/createShortUrl.js';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(''); 
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
      const short  = await createShortUrl( url );
      setShortUrl(short); 
 
  }

  const copyToClipboard = () => { 
    navigator.clipboard.writeText(shortUrl);
    setCopied(true); 

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div>
      <div className="space-y-4">
        <input
          type="url"
          placeholder="Enter your URL here..."
          id='url'
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Shorten URL
        </button>
      </div>
      
      {shortUrl && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Shortened URL:
          </p>
          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
            <span className="flex-1 text-sm text-gray-600 break-all">
              {shortUrl}
            </span>
             <button
              onClick={copyToClipboard}
              className={`px-3 py-1 text-sm rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${copied 
                  ? 'bg-green-500 text-white focus:ring-green-500' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UrlForm;
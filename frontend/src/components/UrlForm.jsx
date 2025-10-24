import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shortenUrl, clearUrl } from '../store/slices/urlSlice';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  const dispatch = useDispatch();
  const { shortUrl, loading, error } = useSelector((state) => state.url);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearUrl());
    
    if (!url) {
      return;
    }

    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        const urlWithProtocol = `https://${url}`;
        await dispatch(shortenUrl(urlWithProtocol)).unwrap();
      } else {
        await dispatch(shortenUrl(url)).unwrap();
      }
      setUrl(''); // Clear input after successful submission
    } catch (err) {
      console.error('Error shortening URL:', err);
    }
  };

  const copyToClipboard = () => { 
    navigator.clipboard.writeText(shortUrl);
    setCopied(true); 

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <input
          type="url"
          placeholder="Enter your URL here..."
          id='url'
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            ${loading 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
        >
          {loading ? 'Creating...' : 'Shorten URL'}
        </button>
      </div>
      
      {shortUrl && (
        <div className="mt-6 animate-fade-in">
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
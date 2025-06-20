"use client"

import { useState } from "react"

const TUT_SCHOOL_COORDINATES = "55.894611,37.374147"

const YandexMap = () => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const mapUrl = `https://yandex.com/maps/?ll=${TUT_SCHOOL_COORDINATES}&z=17&mode=whatshere&whatshere[point]=${TUT_SCHOOL_COORDINATES}&whatshere[zoom]=17`

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 min-h-[500px]">
      {/* Loading state */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-gray-500 animate-pulse">Loading map...</div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <div className="text-gray-500 mb-2">Failed to load map</div>
          <button
            onClick={() => {
              setHasError(false)
              setIsLoading(true)
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Map iframe - hidden when loading or error */}
      {!hasError && (
        <iframe
          src={mapUrl}
          className={`w-full h-[500px] ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          frameBorder="0"
          allowFullScreen
          aria-label="Tut School location"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}

      {/* Floating open button - only shown when map is visible */}
      {!hasError && !isLoading && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Open in Yandex Maps"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#FC3F1D"/>
            <path d="M16 12H12V8H10V12H6V14H10V18H12V14H16V12Z" fill="white"/>
          </svg>
        </a>
      )}
    </div>
  )
}

export default YandexMap
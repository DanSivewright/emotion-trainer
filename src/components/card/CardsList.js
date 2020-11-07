
import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'

export const CardsList = () => {
  // const [people, setPeople] = useState([{ name: 'Elon Musk', url: 'https://assets.entrepreneur.com/content/3x2/2000/20181206170226-mark-zuckerberg.jpeg?width=700&crop=2:1' }, { name: 'Mark Zuckerberg', url: 'https://assets.entrepreneur.com/content/3x2/2000/20181206170226-mark-zuckerberg.jpeg?width=700&crop=2:1' }])
  const [loading, setLoading] = useState(false)

  // REFS
  const videoRef = useRef(null)

  // CONSTANTS
  const videoHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const videoWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

  useEffect(() => {
    const MODEL_URL = '/models'
    setLoading(true)
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo)
    }
    loadModels()
  }, [])

  const startVideo = () => {
    navigator.getUserMedia({
      video: {}
    }, stream => videoRef.current.srcObject = stream,
    err => console.error(err)
    )
  }

  const playVideo = () => {
    setInterval(async () => {
      if (loading) setLoading(false)
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      if (detections.length > 0) {
        if (detections[0].expressions.happy * 100 > 50) alert('Well Done')
      }
      // if (detections?.expressions.happy > 0.6) alert("You're happy")
    }, 1000)
  }

  return (
    <>
      {loading ? <p>Loading</p> : null}
      <video style={{ objectFit: 'cover' }} ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={playVideo} />
    </>
    // <div className='tinderCards__cardContainer'>
    //   {people.map((person, i) => (
    //     <TinderCard
    //       className='swpie'
    //       key={i}
    //       preventSwipe={['up', 'down']}
    //     >
    //       <div
    //         onClick={() => setCurrentUser(currentUser)}
    //         style={{
    //           backgroundImage: `url(${person.url})`
    //         }}
    //         className='card'
    //       >
    //         <h3>{person.name}</h3>
    //       </div>
    //     </TinderCard>
    //   ))}
    // </div>
  )
}

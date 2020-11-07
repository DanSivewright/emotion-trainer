import React, { useEffect, useRef, useState } from 'react'

// PACKAGES
import * as faceapi from 'face-api.js'

// ICONS
import { ReactComponent as BackIcon } from '../shared/icons/back.svg'
import { Link } from 'react-router-dom'

export const EmotionReplicate = () => {
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(5)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [emotionIndex, setEmotionIndex] = useState(0)
  const id = useRef(null)
  const elapsedId = useRef(null)
  const clear = () => { window.clearInterval(id.current) }
  const clearElapsed = () => { window.clearInterval(elapsedId.current) }
  const expressions = ['angry', 'disgusted', 'happy', 'neutral', 'sad', 'surprised', 'fearful']

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
        if (expressions[emotionIndex] !== 'fearful') {
          if (detections[0].expressions[expressions[emotionIndex]] > 0.5) {
            console.log('emotionIndex: ', emotionIndex + 1)
            // console.log()
            setEmotionIndex(emotionIndex + 1)
          }
        } else {
          window.localStorage.setItem('success', timeElapsed)
          window.location.href = '/'
        }
      }
    }, 1000)
  }

  useEffect(() => {
    playVideo()
    // eslint-disable-next-line
  }, [emotionIndex])

  // TIMER USE EFFECT
  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1)
    }, 1000)
    return () => clear()
  }, [])

  useEffect(() => {
    if (timer === 0) {
      clear()
    }
  }, [timer])

  // ELAPSED
  useEffect(() => {
    elapsedId.current = window.setInterval(() => {
      setTimeElapsed((time) => time + 1)
    }, 1000)
    return () => clearElapsed()
  }, [])

  return (
    <>
      <div className='replicate__wrapper success'>
        <div className='emotion'>
          <p>Replicate this emotion:</p>
          <h1>{expressions[emotionIndex]}</h1>
        </div>
        {loading ? <p>Loading</p> : null}
        <Link to='/' className='circle__button withBlur'><BackIcon /></Link>
        {timer !== 0 && (<h1 className='countdown'>{timer}</h1>)}
        {/* <div className='result' /> */}
      </div>
      <video className='webCam__wrapper' style={{ objectFit: 'cover' }} ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={playVideo} />
    </>
  )
}

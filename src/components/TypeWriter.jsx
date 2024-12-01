'use client'
import React, { useState, useEffect } from 'react'

export function TypeWriter({ 
  texts, 
  delay = 2000, 
  typingSpeed = 100, 
  pauseBetweenTexts = 1500, 
  className 
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentString = texts[currentTextIndex]
    
    let timeout

    if (!isDeleting && currentText.length < currentString.length) {
      // Typing
      timeout = setTimeout(() => {
        setCurrentText(prev => currentString.slice(0, prev.length + 1))
      }, typingSpeed)
    } else if (isDeleting && currentText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1))
      }, typingSpeed / 2)
    } else if (!isDeleting && currentText.length === currentString.length) {
      // Pause at full text
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, delay)
    } else if (isDeleting && currentText.length === 0) {
      // Move to next text
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentTextIndex(prev => (prev + 1) % texts.length)
      }, pauseBetweenTexts)
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, delay, typingSpeed, pauseBetweenTexts])

  return <span className={className}>{currentText}</span>
}

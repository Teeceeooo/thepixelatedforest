import React, { useRef, useEffect, useState } from 'react'
import OpeningScene from '../OpeningScene/OpeningScene'
import OpeningSceneRightFlee from '../OpeningSceneRightFlee/OpeningSceneRightFlee'
import OpeningSceneHome from '../OpeningSceneHome/OpeningSceneHome'

interface OpeningSceneNymphStayProps {
    onChoice: () => void
}
const OpeningSceneNymphStay: React.FC<OpeningSceneNymphStayProps> = ({
    onChoice
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [textOutput, setTextOutput] = useState<string>(
        "You chose to stand still and do nothing.\nThe tree nymph casts an enchantment on you.\nYou now understand the tree nymph's language.\nThe tree nymph quietly tells you: 'I see your innocence'.\nI will now teleport you home'."
    )
    const [inputValue, setInputValue] = useState<string>('')
    const [currentScene, setCurrentScene] = useState<string>(
        'OpeningSceneNymphStay'
    )
    const [timeRemaining, setTimeRemaining] = useState<number>(15)

    //Paths
    const images = {
        openingSceneRightStay:
            process.env.PUBLIC_URL + '/img/openingSceneRightStay.webp',
        openingScene: process.env.PUBLIC_URL + '/img/openingScene.webp',
        OpeningSceneNymphStay:
            process.env.PUBLIC_URL + '/img/openingSceneNymphStay.webp',
        OpeningSceneHome: process.env.PUBLIC_URL + '/img/openingSceneHome.webp'
    }

    const [imageSrc, setImageSrc] = useState<string>(
        images.OpeningSceneNymphStay
    )

    useEffect(() => {
        if (timeRemaining > 0) {
            const timerId = setInterval(() => {
                setTimeRemaining((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(timerId)
        } else {
            setCurrentScene('openingSceneHome')
        }
    }, [timeRemaining])

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext('2d')
            const image = new Image()
            image.src = imageSrc

            image.onload = () => {
                if (context) {
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    context.drawImage(image, 0, 0, canvas.width, canvas.height)
                }
            }
        }
    }, [imageSrc])

    //Input
    const handleUserInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const userResponse = inputValue.toLowerCase()

            setInputValue('')
        }
    }

    if (currentScene === 'openingSceneHome') {
        return (
            <OpeningSceneHome onChoice={() => setCurrentScene('nextScene')} />
        )
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#333'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    fontFamily: 'monospace',
                    backgroundColor: '#222',
                    color: '#eee',
                    borderRadius: '8px',
                    width: '75%',
                    maxWidth: '900px'
                }}
            >
                {/* Img Box */}
                <div
                    style={{
                        border: '1px solid black',
                        marginBottom: '10px',
                        width: '100%',
                        maxWidth: '100%',
                        height: '600px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        width={900}
                        height={600}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            display: 'block'
                        }}
                    ></canvas>
                </div>

                {/* Text Box */}
                <div
                    style={{
                        border: '1px solid black',
                        padding: '10px',
                        whiteSpace: 'pre-line',
                        minHeight: '150px',
                        maxHeight: '300px',
                        width: '100%',
                        maxWidth: '100%',
                        overflowY: 'auto',
                        textAlign: 'center'
                    }}
                >
                    {textOutput}
                </div>

                {/* Input Box */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleUserInput}
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        padding: '10px',
                        marginTop: '10px',
                        fontFamily: 'monospace'
                    }}
                    placeholder="Type your response here..."
                />
            </div>
        </div>
    )
}

export default OpeningSceneNymphStay

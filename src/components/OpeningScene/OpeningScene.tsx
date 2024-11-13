import React, { useRef, useEffect, useState } from 'react'
import OpeningSceneLeft from '../OpeningSceneLeft/OpeningSceneLeft'
import OpeningSceneRight from '../OpeningSceneRight/OpeningSceneRight'

interface OpeningSceneProps {
    onChoice: () => void
}
const OpeningScene: React.FC<OpeningSceneProps> = ({ onChoice }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [textOutput, setTextOutput] = useState<string>(
        'You magically appear in a dark forest.\n' +
            'The smell of fresh grass and the sounds of the forest creatures soothes you.\n' +
            "You hear a whisper 'Welcome to The Pixelated Forest'.\n" +
            'It sends chills down your spine.\n' +
            "You look around. You're at a crossroad."
    )
    const [inputValue, setInputValue] = useState<string>('')
    const [currentScene, setCurrentScene] = useState<string>('openingScene')

    //Paths
    const images = {
        openingSceneLeft: process.env.PUBLIC_URL + '/img/openingSceneLeft.webp',
        openingSceneRight:
            process.env.PUBLIC_URL + '/img/openingSceneRight.webp',
        openingSceneMiddle:
            process.env.PUBLIC_URL + '/img/openingSceneMiddle.webp',
        openingScene: process.env.PUBLIC_URL + '/img/openingScene.webp'
    }

    const [imageSrc, setImageSrc] = useState<string>(images.openingScene)

    const choiceGoLeft = ['left', 'go left', 'walk left', 'run left']
    const choiceGoRight = ['right', 'go right', 'walk right', 'run right']
    const choiceGoMiddle = [
        'middle',
        'go middle',
        'walk middle',
        'forward',
        'go forward',
        'walk forward',
        'north',
        'go north',
        'walk north',
        'go straight',
        'straight'
    ]

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

            if (choiceGoLeft.includes(userResponse)) {
                setCurrentScene('openingSceneLeft')
            } else if (choiceGoRight.includes(userResponse)) {
                setCurrentScene('openingSceneRight')
            } else if (choiceGoMiddle.includes(userResponse)) {
                setTextOutput('go middle')
            } else {
                setTextOutput((prev) => prev + '\n> ' + userResponse)
            }

            setInputValue('')
        }
    }

    if (currentScene === 'openingSceneLeft') {
        return (
            <OpeningSceneLeft
                onChoice={() => setCurrentScene('nextSceneLeft')}
            />
        )
    } else if (currentScene === 'openingSceneRight') {
        return (
            <OpeningSceneRight
                onChoice={() => setCurrentScene('nextSceneRight')}
            />
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

export default OpeningScene

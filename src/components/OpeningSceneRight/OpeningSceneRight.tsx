import React, { useRef, useEffect, useState } from 'react'
import OpeningScene from '../OpeningScene/OpeningScene'
import OpeningSceneRightFlee from '../OpeningSceneRightFlee/OpeningSceneRightFlee'
import OpeningSceneRightStay from '../OpeningSceneRightStay/OpeningSceneRightStay'

interface OpeningSceneRightProps {
    onChoice: () => void
}
const OpeningSceneRight: React.FC<OpeningSceneRightProps> = ({ onChoice }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [textOutput, setTextOutput] = useState<string>(
        "You walked right and went deeper into the forest.\nAs you walk you hear sounds from the trees you don't recognize.\nYou notice a significantly larger tree in the shining.\nYou close your eyes for a second and as you open your eyes a tree nymph appears in front of you.\nThe creature looks shy.\n\nWhat do you do? Flee or Stay?"
    )
    const [inputValue, setInputValue] = useState<string>('')
    const [currentScene, setCurrentScene] =
        useState<string>('openingSceneRight')

    //Paths
    const images = {
        openingSceneLeft: process.env.PUBLIC_URL + '/img/openingSceneLeft.webp',
        openingSceneRight:
            process.env.PUBLIC_URL + '/img/openingSceneRight.webp',
        openingSceneMiddle:
            process.env.PUBLIC_URL + '/img/openingSceneMiddle.webp',
        openingScene: process.env.PUBLIC_URL + '/img/openingScene.webp'
    }

    const [imageSrc, setImageSrc] = useState<string>(images.openingSceneRight)

    const choice2_1 = [
        'flee',
        'run',
        'walk',
        'walk away',
        'get the fuck outta here',
        'back',
        'south',
        'go back',
        'walk back'
    ]
    const choice2_2 = ['stay', 'nothing', 'wait']

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

            if (choice2_1.includes(userResponse)) {
                setCurrentScene('openingSceneRightFlee')
            } else if (choice2_2.includes(userResponse)) {
                setCurrentScene('openingSceneRightStay')
            } else {
                setTextOutput((prev) => prev + '\n> ' + userResponse)
            }

            setInputValue('')
        }
    }

    if (currentScene === 'openingSceneRightFlee') {
        return (
            <OpeningSceneRightFlee
                onChoice={() => setCurrentScene('nextScene')}
            />
        )
    } else if (currentScene === 'openingSceneRightStay') {
        return (
            <OpeningSceneRightStay
                onChoice={() => setCurrentScene('nextScene')}
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

export default OpeningSceneRight

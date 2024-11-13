import React, { useRef, useEffect, useState } from 'react'
import OpeningScene from '../OpeningScene/OpeningScene'

interface OpeningSceneRightFleeProps {
    onChoice: () => void
}
const OpeningSceneRightFlee: React.FC<OpeningSceneRightFleeProps> = ({
    onChoice
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [textOutput, setTextOutput] = useState<string>(
        'You run away at high speed.\nYou become disoriented.\nThe winds sing their song.\nYou faint.\n\nDo you want to play a new game?'
    )
    const [inputValue, setInputValue] = useState<string>('')
    const [currentScene, setCurrentScene] = useState<string>(
        'openingSceneRightFlee'
    )

    const acceptedWords = [
        'yes',
        'y',
        'ye',
        'yez',
        'yess',
        'yass',
        'yuss',
        'yuzz',
        'ok',
        'oki',
        'okay',
        'okay!',
        'okej',
        'k',
        'aye',
        'yes!',
        'ya',
        'japp',
        'jep',
        'hell yeah',
        'yeah',
        'sure',
        'fine'
    ]

    //Paths
    const images = {
        openingSceneRightFlee:
            process.env.PUBLIC_URL + '/img/openingSceneRightFlee.webp',
        openingScene: process.env.PUBLIC_URL + '/img/openingScene.webp'
    }

    const [imageSrc, setImageSrc] = useState<string>(
        images.openingSceneRightFlee
    )

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

            if (acceptedWords.includes(userResponse)) {
                setCurrentScene('openingScene')
            } else {
                setTextOutput((prev) => prev + '\n> ' + userResponse)
            }

            setInputValue('')
        }
    }

    if (currentScene === 'openingScene') {
        return <OpeningScene onChoice={() => setCurrentScene('nextScene')} />
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

export default OpeningSceneRightFlee

import React, { useRef, useEffect, useState } from 'react'
import OpeningScene from '../OpeningScene/OpeningScene'
import OpeningSceneRightFlee from '../OpeningSceneRightFlee/OpeningSceneRightFlee'
import OpeningSceneNymphAttack from '../OpeningSceneNymphAttack/OpeningSceneNymphAttack'
import OpeningSceneNymphStay from '../OpeningSceneNymphStay/OpeningSceneNymphStay'

interface OpeningSceneRightStayProps {
    onChoice: () => void
}
const OpeningSceneRightStay: React.FC<OpeningSceneRightStayProps> = ({
    onChoice
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [textOutput, setTextOutput] = useState<string>(
        'You stay and look at the tree nymph.\nIt looks at you with curiosity.\nThe skin of the tree nymph is olive-green.\nYou see a glimmer of magic in the eyes.\nYou notice a bow and arrows in between you and the tree nymph.\nYou pick it up.\n\nWhat do you do? Flee, Nothing or Fight?'
    )
    const [inputValue, setInputValue] = useState<string>('')
    const [currentScene, setCurrentScene] = useState<string>(
        'openingSceneRightStay'
    )

    const choice3_1 = [
        'flee',
        'run',
        'walk',
        'walk away',
        'get the fuck outta here'
    ]
    const choice3_2 = ['stay', 'nothing', 'wait']
    const choice3_3 = [
        'fight',
        'kill',
        'combat',
        'brawl',
        'box',
        'confront',
        'wrestle'
    ]

    //Paths
    const images = {
        openingSceneRightStay:
            process.env.PUBLIC_URL + '/img/openingSceneRightStay.webp',
        openingScene: process.env.PUBLIC_URL + '/img/openingScene.webp'
    }

    const [imageSrc, setImageSrc] = useState<string>(
        images.openingSceneRightStay
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
            if (choice3_1.includes(userResponse)) {
                setCurrentScene('openingSceneRightFlee')
            } else if (choice3_2.includes(userResponse)) {
                setCurrentScene('openingSceneNymphStay')
            } else if (choice3_3.includes(userResponse)) {
                setCurrentScene('openingSceneNymphAttack')
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
    } else if (currentScene === 'openingSceneNymphStay') {
        return (
            <OpeningSceneNymphStay
                onChoice={() => setCurrentScene('nextScene')}
            />
        )
    } else if (currentScene === 'openingSceneNymphAttack') {
        return (
            <OpeningSceneNymphAttack
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

export default OpeningSceneRightStay

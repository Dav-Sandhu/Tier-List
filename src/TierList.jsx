import './TierList.scss'
import { useState } from 'react'

const TierList = ({ list, setList, setHoveredImage, setItems }) => {

    const [hoverIndex, setHoverIndex] = useState(null)

    return(
        <>
            <div className="tier-list">
                {Object.entries(list).map(([key, values]) => (

                    <div className={'tier-row ' + key}>
                        <div className={'rank ' + key}>{key}</div>
                        <div 
                            className='tier' 
                            key={key}
                            onDrop={(e) => {
                                e.preventDefault()
                                const item = e.dataTransfer.getData('item')

                                setList(prev => {
                                
                                    let output = {...prev}
                                    
                                    for (let [k, v] of Object.entries(prev)){
                                        output[k] = v.filter(i => i !== item)
                                    }

                                    if (hoverIndex === null){
                                        output[key] = [...output[key], item]
                                    }else{
                                        output[key].splice(hoverIndex, 0, item)
                                    }

                                    return output
                                })

                                setHoveredImage('')
                                setItems(prev => prev.filter(i => i !== item))
                            }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {values.map((value, index)=> (
                                <div 
                                    className='item' 
                                    key={value} 
                                    onDragOver={() => setHoverIndex(index)} 
                                    onDragLeave={() => setHoverIndex(null)} 
                                >
                                    <button 
                                        className='delete-btn'
                                        onClick={() => {
                                            setList(prev => {
                                                let output = {...prev}
                                                output[key] = prev[key].filter(i => i !== value)
                                                return output
                                            })
                                        }}
                                    >x</button>
                                    <img 
                                        className='item-img'
                                        src={value}
                                        draggable
                                        onDragStart={(event) => event.dataTransfer.setData('item', value)}
                                        onMouseEnter={() => setHoveredImage(value)}
                                        onMouseLeave={() => setHoveredImage('')} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TierList
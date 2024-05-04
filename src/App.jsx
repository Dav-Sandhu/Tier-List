import "./App.scss"
import Navbar from "./Navbar"
import TierList from "./TierList"

import { useState } from "react"

const App = () => { 

    const [list, setList] = useState({
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: []
    })

    const [items, setItems] = useState([])
    const [hoveredImage, setHoveredImage] = useState('')

    return(
        <>
            <Navbar setItems={setItems} />
            <TierList 
                list={list} 
                setList={setList} 
                setHoveredImage={setHoveredImage} 
                setItems={setItems} 
            /> 
            {hoveredImage.length > 0 ? <img className="item-in-focus" src={hoveredImage} /> : ''}
            <div 
                className="item-container"
                onDrop={(e) => {
                    e.preventDefault()
                    const item = e.dataTransfer.getData('item')

                    setList(prev => {
                    
                        let output = {...prev}
                        
                        for (let [k, v] of Object.entries(prev)){
                            output[k] = v.filter(i => i !== item)
                        }

                        return output
                    })

                    setHoveredImage('')
                    setItems(prev => {
                        if (!prev.includes(item)){
                            return [...prev, item]
                        }
                        return prev
                    })
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                {items.map(item => {
                    return(
                        <div className='item' key={item}>
                            <button 
                                className='delete-btn'
                                onClick={() => {
                                    setItems(prev => prev.filter(i => i !== item))
                                }}
                            >x</button>
                            <img 
                                className='item-img'
                                key={item} 
                                src={item}
                                draggable
                                onDragStart={(event) => event.dataTransfer.setData('item', item)}
                                onMouseEnter={() => setHoveredImage(item)}
                                onMouseLeave={() => setHoveredImage('')} 
                            />
                        </div>
                    )
            })}
            </div>
        </>
    )
}
export default App
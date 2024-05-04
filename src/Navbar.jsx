import { useState } from "react"

const Navbar = ({setItems}) => {

    const [url, setUrl] = useState('')

    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
            
            <a className="navbar-brand ms-2" href="#">Tier List</a>

            {/*For smaller screens/mobile devices it changes the layout to better suit the hardware.*/}
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navContent" 
                aria-controls="navContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse ms-2" id="navContent">
                <form 
                    className="d-flex" 
                    role="search"
                    onSubmit={(e) => {
                        e.preventDefault()
                        setItems(prevItems => [...prevItems, url])
                    }}
                >
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Image URL" 
                        value={url}
                        onChange={e => {
                            setUrl(e.target.value)
                        }}
                    />
                    <button className="btn btn-outline-light" type="submit">Add</button>
                </form>
            </div>

        </nav>
    )
}

export default Navbar
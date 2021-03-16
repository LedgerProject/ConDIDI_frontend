import React, { Component } from 'react'; 
import Imge from 'react-random-image'; 

class Image extends Component {

    render() {

        const {name, width, height} = this.props; 

        return(
            <div className={name}>
                <Imge width={width} height={height}/>
            </div>
        )
    }

}

export default Image; 
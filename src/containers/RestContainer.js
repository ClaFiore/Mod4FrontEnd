import React, { Component } from 'react'
import RestCollection from './RestCollection'
import RestMap from './RestMap'
import RestDesc from '../components/RestDesc'
import Sort from '../components/Sort'

class RestContainer extends Component {
    state={
        fetch: true,
        restaurants: [],
        start: 0,
        cuisines: [],
    }

    componentDidMount(){
        let pages = [0, 20, 40,60, 80]
        if (this.state.fetch){
            this.setState({ restaurants: []})
            for (let i=0; i < pages.length; i++) {
                fetch(this.props.restUrl+`?start=${pages[i]}`)
                .then(res => res.json())
                .then(restaurants => {
                    this.setState({
                        restaurants : [ ...this.state.restaurants, ...restaurants]
                    })
                })
            }
            this.setState({fetch: false})
        }
    }

    

    nextPage=() => {
        let start = this.state.start
        if (start < 80){
            start = start + 20
            this.setState({ start })
        }
    }

    previousPage = () => {
        let start = this.state.start
        if (start>0){
            start = start - 20
            this.setState({ start })
        }
    }

    displayTwenty = () => {
        return this.state.restaurants.slice(this.state.start, this.state.start + 20)
    }

   

    render(){

        
        return(
            <div>
                { true ? 
                <div>
                <Sort />
                <RestCollection 
                    restaurants={this.displayTwenty()}
                    nextPage={this.nextPage}
                    previousPage={this.previousPage}
                /> 
                </div>:
                <RestMap />}
            </div>
        )
    
    }
}

export default RestContainer
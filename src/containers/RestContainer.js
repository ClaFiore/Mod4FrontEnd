import React, { Component } from 'react'
import RestCollection from './RestCollection'
import Map from './Map'
import Sort from '../components/Sort'
import './RestContainer.css'
import Filter from '../components/Filter'
import { Button } from 'semantic-ui-react'

class RestContainer extends Component {
    state={
        restaurants: [],
        displayRestaurants: [],
        start: 0,
        sort: "",
        cuisines: 0,
        cuisineRest: [],
        list: true,
        lat: 38.907192,
        lng: -77.036873
    }

    componentDidMount(){
        let pages = [0, 20, 40,60, 80]      
        for (let i=0; i < pages.length; i++) {
            fetch(this.props.restUrl+`?start=${pages[i]}&lat=${this.state.lat}&long=${this.state.lng}`)
            .then(res => res.json())
            .then(restaurants => {
                this.setState({
                    restaurants : [ ...this.state.restaurants, ...restaurants],
                    displayRestaurants: [ ...this.state.restaurants, ...restaurants],
                })
            })
        }  
    }

    search = (e) => {
        e.preventDefault()
        // make fetch to resturl
    }

    changeView = (value) => {
        this.setState({
            list: value,
            cuisines: 0
        })
    }

    sortBy = (sort) => {
        let cuisines = this.state.cuisines
        let displayRestaurants
        if (cuisines === 0)
            displayRestaurants = this.state.restaurants
        if (cuisines > 0)
            displayRestaurants = this.state.cuisineRest
        
        switch (sort){
            case "ratingASC":
                displayRestaurants = displayRestaurants.sort((a,b) => a.rating - b.rating)
                break
            case "ratingDESC":
                displayRestaurants = displayRestaurants.sort((a,b) => b.rating - a.rating)
                break;
            case "priceASC":
                displayRestaurants = displayRestaurants.sort((a,b) => a.price_range - b.price_range)
                break;
            case "priceDESC":
                displayRestaurants = displayRestaurants.sort((a,b) => b.price_range - a.price_range)
                break;
            case "alphaASC":
                displayRestaurants = displayRestaurants.sort((a,b) => a.name.localeCompare(b.name))
                break;
            case "alphaDESC":
                displayRestaurants = displayRestaurants.sort((a,b) => b.name.localeCompare(a.name))
                break;
        }
        this.setState({
            [cuisines>0? "cuisineRest": "displayRestaurants"]: displayRestaurants ,
            sort
        })
    }

    

    nextPage=() => {
        let start = this.state.start
        let cuisines = this.state.cuisines
        let cuisineRest = this.state.cuisineRest
        if (cuisineRest.length > start + 20 || cuisines === 0){
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
        let cuisines = this.state.cuisines
        if (cuisines === 0){
            return this.state.displayRestaurants.slice(this.state.start, this.state.start + 20)
        }
        else if (cuisines>0){
            return this.state.cuisineRest.slice(this.state.start, this.state.start + 20)
        }
    }
    
    cuisineFilter = (value) => {
        if (value > 0){
            this.setState({cuisineRest: [], sort: "", start: 0, cuisines: value})
            let pages = [0, 20, 40, 60, 80]
            for (let i=0; i < pages.length; i++) {
                fetch(this.props.restUrl+`?cuisines=${value}&start=${pages[i]}&lat=${this.state.lat}&long=${this.state.lng}`)
                .then( res => res.json())
                .then(cuisineRest => {
                    this.setState({
                        cuisineRest:[ ...this.state.cuisineRest, ...cuisineRest]
                    })
                })
            }
        }
        else{
            this.setState({cuisines: 0})
        }
    }

    searchResults = (lat, lng) => {
        let pages = [0, 20, 40,60, 80]
        this.setState({restaurants: [], displayRestaurants: [], lat, lng, cuisines: 0})      
            for (let i=0; i < pages.length; i++) {
                fetch(this.props.restUrl+`?start=${pages[i]}&lat=${lat}&long=${lng}`)
                .then(res => res.json())
                .then(restaurants => {
                    this.setState({
                        restaurants : [ ...this.state.restaurants, ...restaurants],
                        displayRestaurants: [ ...this.state.restaurants, ...restaurants],
                        lat,
                        lng
                    })
                })
            }  
    }
   

    render(){

        
        return(
            
            <div className="restContainer">
                <div className="image-div">

                </div>
                   
                    <div className='body'>
                            <div className = "sort">
                                <Filter cuisines={this.state.cuisines} cuisineFilter={this.cuisineFilter}/>
                                <Sort sortBy={this.sortBy} sort={this.state.sort}/>
                                <div className='buttons-container'>
                                        <div className='buttons'onClick={() => this.changeView(true)}>
                                        <p className='btn' >List</p>
                                        </div>
                                        <div className='buttons' onClick={() => this.changeView(false)}>
                                        <p className='btn' >Map</p>
                                        </div>
                                </div>
                                {this.state.list ? 
                                <div className='buttons-container'>
                                        <div className='buttons' onClick={this.previousPage}>
                                            <p className='btn'  > Previous Page</p>
                                        </div>
                                        <div className='buttons' onClick={() => this.nextPage()}>
                                            <p className='btn' >Next Page</p>
                                        </div>
                                    </div> : null}
                            </div>
                        { this.state.list ? 
                            <RestCollection 
                                status={this.props.status}
                                restaurants={this.displayTwenty()}
                                nextPage={this.nextPage}
                                previousPage={this.previousPage}
                            />  :
                             <Map lat={this.state.lat} long={this.state.lng} searchResults={this.searchResults} restaurants={this.state.cuisines> 0 ? this.state.cuisineRest : this.state.displayRestaurants}/>
                        }
                    </div>
                    
            </div>
        )
    
    }
}

export default RestContainer
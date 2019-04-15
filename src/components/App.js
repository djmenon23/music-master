import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import Artist from './Artist';
import Tracks from './Tracks';
import Search from '../Search';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com/artist/'
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class App extends Component {
    state = {
        artist: null,
        tracks: [],
        loading: false
    }

    componentDidMount() {
        this.searchArtist('pink floyd')
    }

    searchArtist = (artistQuery) => {
        this.fetchArtistDetails(artistQuery);
    }

    fetchArtistDetails = (name) => {
        this.setState({loading: true})
        fetch(`${API_ADDRESS}${name}`)
        .then(response => response.json())
        .then(result => {
            if(result.artists.total > 0) {   
            const artist = result.artists.items[0];
            const id = result.artists.items[0].id
            this.setState({artist})
            this.fetchTopTracks(id);
            }else{
                ToastsStore.error(`Could not find artist details`)
                this.setState({loading: false})}
        })
        .catch(error => ToastsStore.error(error.message));
    }

    fetchTopTracks = (id) => {
        this.setState({loading: true})
        fetch(`${API_ADDRESS}${id}/top-tracks`)
        .then(response => response.json())
        .then(result =>{
            
        this.setState({tracks: result.tracks, loading: false})})
        .catch(error => ToastsStore.error(error.message));
    }

    render() {  
        return(
            <div>
                <h2>Music Master</h2>
                <Search searchArtist={this.searchArtist}/>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={50}
                    color={'#123abc'}
                    loading={this.state.loading}
                    />
                {!this.state.artist ? null :
                <Artist artist={this.state.artist}/>}
                 {!this.state.tracks ? null :
                <Tracks tracks={this.state.tracks}/>}
                <ToastsContainer position={ToastsContainerPosition. TOP_CENTER} store={ToastsStore}/>
            </div>
        );
    }
}

export default App;
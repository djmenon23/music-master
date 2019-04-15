import React from 'react';

const Artist = ({artist}) => {
    const {images, name, followers, genres} = artist
    return(
        <div>
           <h3>{name}</h3> 
            <p>{followers.total} followers</p>
            <p>{genres.join(',')}</p>
            <img style={{width: 200, height:200, borderRadius: 100, objectFit: 'cover'}} 
            src={images[0] && images[0].url} 
            alt="artist-profile"/>
        </div>
    )
}

export default Artist;
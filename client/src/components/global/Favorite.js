import { useState, useEffect } from 'react'
import axios from 'axios'
import FavoriteSnackbar from './FavoriteSnackbar';
const ownAxios = axios.create();

function Favorite({ ticker, userId, inWatchlist, jwt }) {
   const [favorite, setFavorite] = useState(false);
   const [watched, setWatched] = useState(inWatchlist);
   ownAxios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
   
   useEffect(() => {
      if(favorite !== false) {
         axios.post(process.env.REACT_APP_API_URL + '/stockApi/setFavorite', { ticker, userId, status: !watched })
         .then(response => { setFavorite(false) })
         .catch(err => { console.error(err) });
         setWatched(!watched);
      }
   }, [favorite])

   return (
      <div>
         <div onClick={() => { setFavorite(!favorite) }} className="favorite-btn">
            {watched ? <i className="fas favorite-star  fa-star"></i> : <i className="far fa-star"></i>}
         </div>
         <FavoriteSnackbar watched={watched} favorite={favorite} />
      </div>
   )
}

export default Favorite

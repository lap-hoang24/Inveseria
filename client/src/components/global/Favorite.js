import { useState, useEffect } from 'react'
import authAxios from '../api/axiosAuth';
import FavoriteSnackbar from './FavoriteSnackbar';

function Favorite({ ticker, userId, inWatchlist, jwt }) {
   const [favorite, setFavorite] = useState(false);
   const [watched, setWatched] = useState(inWatchlist);
   
   useEffect(() => {
      if(favorite !== false) {
         authAxios.post('/stockApi/setFavorite', { ticker, status: !watched })
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

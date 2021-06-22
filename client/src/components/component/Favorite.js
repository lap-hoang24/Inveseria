import { useState, useEffect } from 'react'
import axios from 'axios'
import FavoriteSnackbar from './FavoriteSnackbar';


function Favorite({ ticker, userId, inWatchlist }) {
   const [favorite, setFavorite] = useState(false);
   const [watched, setWatched] = useState(inWatchlist);

   useEffect(() => {
      if(favorite !== false) {
         axios.post('/stockApi/setFavorite', { ticker, userId, status: !watched })
         .then(response => { setFavorite(false) })
         .catch(err => { console.error(err) });
         setWatched(!watched);
      }
   }, [favorite])

   return (
      <div>
         <div onClick={() => { setFavorite(!favorite) }} className="favorite-btn">
            {watched ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
         </div>
         <FavoriteSnackbar watched={watched} favorite={favorite} />
      </div>
   )
}

export default Favorite

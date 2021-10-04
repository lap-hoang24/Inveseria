import React, { useEffect, useState } from 'react';
import NewsTime from './NewsTime';
import axios from 'axios';

function News({ type, period, token, heading }) {
   const [news, setNews] = useState();
   const imageUnavailable = "https://www.ecpgr.cgiar.org/fileadmin/templates/ecpgr.org/Assets/images/No_Image_Available.jpg";
   useEffect(() => {
      axios.get(`${type}${period}&token=${token}`)
         .then(response => {
            response.data.length = 15;
            setNews(response.data);
         })
         .catch(error => console.log(error));
   }, [])

   return (
      <div id="news">
         <div className="news-heading">{heading}</div>
         {news && news.map(piece => {
            const { headline, image, url, id, datetime } = piece;
            let imageUrl = image === '' ? imageUnavailable : image;
            return (
               <article key={id} className="news-piece">
                  <p className="headline">{headline}</p>
                  <img className="news-img" src={imageUrl} alt="" />
                  <div className="time_readmore-wrapper">
                     <a href={url} className="read-more">Read more...</a>
                     <NewsTime timeStamp={datetime} />
                  </div>
               </article>
            )
         })}
      </div>
   )
}

export default News

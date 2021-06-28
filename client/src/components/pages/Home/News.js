import React, { useEffect, useState } from 'react'
import axios from 'axios';

function News() {
   const [news, setNews] = useState();


   const newsTime = (timeStamp) => {
      let now = (new Date().getTime() / 1000).toFixed(0);
      let difference = now - timeStamp;
      let hour = difference / 3600;
      let minute = ((difference % 3600) / 60).toFixed(0);
      hour = ("" + hour).slice(0, 1);
      return `${hour}h ${minute}min`
   }

   useEffect(() => {

      axios.get('https://finnhub.io/api/v1/news?category=general&token=c32dffiad3ieculvh350')
         .then(response => {
            response.data.length = 20;
            console.log(response.data);
            setNews(response.data);
         })
         .catch(error => console.log(error));
   }, [])

   return (
      <div id="news">
         {news && news.map(piece => {
            const { headline, image, source, url, category, id, datetime } = piece;
            let time = newsTime(datetime);

            return (
               <article key={id} className="news-piece">
                  <p className="headline">{headline}</p>
                  <img className="news-img" src={image} alt="" />
                  <div>{time}</div>
               </article>
            )
         })}
      </div>
   )
}

export default News

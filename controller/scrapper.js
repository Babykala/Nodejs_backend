const request = require('request-promise');
const cheerio = require('cheerio');
const mongo=require('./connect');


const Amazonlisting = require('../model/product');
const data = [];

module.exports = {
    amazon : () => {
            
            amazonHeader = async () =>{
                
                    const result = await request.get('https://www.amazon.in/s?k='+'mouse');
                    const $ = await cheerio.load(result);
                 
                    $('.s-asin').each((i,el)=> {
                        
                        const id = $(el).attr('data-asin');
                        const name = $(el).find('h2 span').text();  
                        const price = $(el).find('.a-price-whole').text();
                        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                        const image = $(el).find('.s-image').attr('src');
                        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');

                        if(id!='undefined'){
                            const datas = {id,name,price,rating,image,link};
                            data.push(datas)
                        }
                        
                         Amazonlisting.create({
                              id : id,
                              name: name,
                              price:price,
                              rating:rating,
                              image:image,
                              link:link
                          })
                          .then((listing)=> {
                              console.log(listing)
                          }); 
                        
                    });
                
            return data;
        }
     
         
        
        const main = async () =>{
            await mongo.connectMongoose();;
            const amazonHead = await amazonHeader();
            console.log("Total scrapped : " + amazonHead.length);
          return amazonHead;
        }

        main();
        
    } 
}
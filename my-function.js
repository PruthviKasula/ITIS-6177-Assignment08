exports.handler = async (event) => {
    // TODO implement     
   if(event.httpMethod === 'GET') {
       if(event && event.queryStringParameters && event.queryStringParameters.keyword) {
            console.log("Keyword received: " + event.queryStringParameters.keyword);
            const str = event.queryStringParameters.keyword
            const resp = "Pruthvi Kasula says " + str
            return {
                statusCode :200,
                body: JSON.stringify(resp)
               }
       }          
   
       if (event && (!event.queryStringParameters || !event.queryStringParameters.keyword)) {
            return {
                 statusCode:400,
                 body:JSON.stringify({error:"No keyword entered."})             
           }         
       }     
   } 
};

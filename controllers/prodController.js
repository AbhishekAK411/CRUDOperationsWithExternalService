import axios from "axios";

export const addProduct = async (req,res) =>{
    try{
        const {title, price, description, image, category} = req.body;
        if(!title) return res.send("Title is required.");
        if(!price) return res.send("Price is required.");
        if(!description) return res.send("Description is required.");
        if(!image) return res.send("Image is required.");
        if(!category) return res.send("Category is required.");

        const response = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                image: image,
                category: category
            })
        });
        const json = await response.json();
        console.log(json);
        return res.send(json);
    }catch(err){
        return res.send(err);
    }
}


export const checkAPI = async (req,res) =>{
    const options = {
        method: 'GET',
        url: 'https://youtube-search-and-download.p.rapidapi.com/channel/about',
        params: {
          id: 'UCE_M8A5yxnLfW0KghEeajjw'
        },
        headers: {
          'X-RapidAPI-Key': 'eccd6d6feemsh2a777da29beaf15p14fe1ajsncb2464e044e6',
          'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return res.send(response.data);
      } catch (err) {
          return res.send(err);
      }
}
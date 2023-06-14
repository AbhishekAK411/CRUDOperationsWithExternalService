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
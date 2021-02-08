const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const buildSchema = require('graphql').buildSchema;

let fs=require('fs');

let appServer = new express();

appServer.get('/product/json',(req,res)=>{
	fs = require('fs');
	
	fs.readFile('product.json','utf8',function(err,data){
		if(err)
		{
			console.log(err.message);
		}
		res.type('application/json');
		res.send(data);
	});
});



appServer.get('/product/xml',(req,res)=>{
	fs = require('fs');
	
	fs.readFile('product.xml','utf8',function(err,data){
		if(err)
		{
			console.log(err.message);
		}
		let strXML =data;
		res.type('application/xml');
		res.send(strXML);
	});
});

const schema = buildSchema(`
  type Query {
    products: [Product]
	product(name: String): Product
  }
  
  type Product {
	  name: String
	  quantity: Int
	 
  }
`);

let rawJson = fs.readFileSync('product.json');
let productJson = JSON.parse(rawJson);

// The root provides a resolver function for each API endpoint
const rootValue = {
  products: () => productJson.products,
  product: (obj)=>productJson.products.find(rec=>rec.name===obj.name)
};

appServer.use(
  '/product/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql:true
  }),
);

appServer.use('/', express.static('../dist/Assign1'));

appServer.listen(1501);
console.log('listen on port 1501');
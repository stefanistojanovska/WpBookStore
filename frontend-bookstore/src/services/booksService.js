import axios from "../axios/axios"

const BookService ={
    fetchBooks:()=>
    {
        return axios.get("/books")
    },
    fetchCategories:()=>
    {
        return axios.get("/categories")
    },
    fetchBooksByCategory:(name)=>
    {
        return axios.get(`/books/category/${name}` )
    },
    updateTry:(bookId,userId)=>
    {
        return axios.patch(`/update/${bookId}/${userId}`)
    },
    updateTryCart:(bookId,userId)=>
    {
      return axios.patch(`/cart/add/${bookId}/${userId}`)
    },
    removeTry:(bookId,userId)=>
    {
        return axios.patch(`/remove/${bookId}/${userId}`)
    },
    removeTryCart:(bookId,userId)=>
    {
        return axios.patch(`cart/remove/${bookId}/${userId}`)
    },
    fetchUserByUsername:(name)=>
    {
        return axios.get(`/users/${name}`)
    },
    fetchAuthorById:(id)=>
    {
      return axios.get(`author/${id}`)
    },
    buy:(bookId,userId)=>
    {
        return axios.patch(`buy/${bookId}/${userId}`)
    },
    fetchCategoryById:(id)=>
    {
        return axios.get(`category/${id}`)
    },
    fetchBookDetails:(id)=>
    {
        return axios.get(`/book/${id}`)
    },
    fetchAuthors:()=>
    {
        return axios.get('/authors')
    },
    createNewUser:(username,password,userRole)=>
    {
        const data={
            username:username,
            password:password,
            userRole:userRole
        }
        return axios.post("/users/create",data,{
            headers: {'Content-Type': 'application/json'}
        })
    },
    fetchRole:(name)=>{
        return axios.get(`roles/${name}`)
    },
    fetchWishList:(username)=>
    {
        return axios.get(`wishlist/${username}`)
    },
    fetchCart:(username)=>
    {
        return axios.get(`cart/${username}`)
    },
    createNewAuthor:(nameFull)=>
    {
        const data={
            nameFull:nameFull
        }
        return axios.post("/authors/add",data,{
            headers: {'Content-Type': 'application/json'}
        })
    },
    createNewBook:(title,description,poster,year,pagesNum,price,bestseller,authors,categories)=>
    {
        const data= {
            title:title,
            description:description,
            poster:poster,
            year:year,
            pagesNum:pagesNum,
            price:price,
            bestseller:bestseller,
            categories:categories,
            authors:authors
            }
        return axios.post("/books/create",data,{
            headers: {'Content-Type': 'application/json'}
        })
    }
};
export default BookService;
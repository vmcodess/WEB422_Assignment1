// let saleData = [];      // Empty array (we will populate it later with a FETCH call to our back end API)
// let page = 1;           // This will keep track of the current page that the use viewing
// const PER_PAGE = 10;    // This will be a CONST value that we will use to reference how many sale items we wish to view on each page of our application

// // Lodash Template (This will be a CONST value that consists of solely of a Lodash template ( defined using the _.template() function ))
// const SALE_TABLE_TEMPLATE = _.template(
//     `<% _.forEach(data, function(sale) { %> 
//         <tr data-id="<%- sale._id %>">
//             <td><%- sale.customer.email %></td>
//             <td><%- sale.storeLocation %></td>
//             <td><%- sale.items.length %></td> 
//             <td><%- moment(sale.saleDate).format('LLLL') %></td>
//         </tr> 
//     <% }) %>`
// );



// // This template must provide all of the layout and formatting for the content contained within our modal window for a specific "sale"
// const saleModelBodyTemplate = _.template(`
//     <h4>Customer</h4>
//     <strong>email: </strong><%- data.customer.email %><br>
//     <strong>age: </strong><%- data.customer.age %><br>
//     <strong>satisfaction: </strong><%- data.customer.satisfaction %> / 5 <br>
//     <br>
//     <h4>Items: $<%- data.total.toFixed(2) %></h4>
//     <table class="table">
//         <thead>
//             <tr>
//                 <th>Product name</th>
//                 <th>Quantity</th>
//                 <th>Price</th>
//             </tr>
//         </thead>
//         <tbody>
//             <% _.forEach(data.items,function(current){%>
//                 <tr>
//                     <td> <%- current.name%> </td>
//                     <td> <%- current.quantity%> </td>
//                     <td> $<%- current.price%> </td>
//                 </tr>
//             <% }) %>
//         </tbody>
//     </table>
// `);  


// // Function to populate the saleDatta array with data from our API created in ASS1 (on heroku)
// function loadSaleData() {
//     fetch(`https://web422-assmt1.herokuapp.com/api/sales/?page=${page}&perPage=${PER_PAGE}`)
//     .then(response => response.json())
//     .then((data) => {

//         saleData = data;
//         $("#sales-table tbody").html(SALE_TABLE_TEMPLATE({ data:saleData }));
//         $("#current-page").html(`${page}`);
//     })
//     .catch((error) => {
//         console.log(`Error to fetch: ${error}`)
//     })
// };


// $( document ).ready(function() {
//     // invoking loadSaleData() function to populate our table with the data
//     loadSaleData();

//     // wire up click events for all <tr> elements contained within <tbody> of our main "sale-table"
//     $("#sale-table").on("click", "tr", function (x) {
//         let selectedId = $(this).attr("data-id");
//         let clickedSale = _.find(saleData, function(sale){
//             return sale._id == selectedId;
//         });

//         // calculating the total cost of all items in the sale
//         let total = 0;
//         for (let i = 0; i < clickedSale.items.length; i++) {
//             total += clickedSale.items[i].price * clickedSale.items[i].quantity;
//         }

//         clickedSale.total = total;
//         $("#sale-modal .modal-title").html("Sale: " + clickedSale._id);
//         $("#sale-modal .modal-body").html(saleModelBodyTemplate({ data : clickedSale }));
//         $("#sale-modal").modal({ 
//             keyboard: false, 
//             backdrop: "static" 
//         });
//     });

//     $("#previous-page").on("click", function() {
//         if (page > 1) {
//             page--;
//             loadSaleData();
//         }
//     });

//     $("#next-page").on("click", function(){
//         page++;
//         loadSaleData();
//     })
// });


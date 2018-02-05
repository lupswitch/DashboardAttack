$(document).ready(function() {

    /*-----Declare my lets for acces to the DOM------*/
    let array = document.getElementById('tab_products_order');
    let count = 1;
    let totalPrice;
    let current_order_price;
    let qte_product;
    let product_added;
    /*------------------------------------------------*/

    /*---------------------Event---------------------*/
    $("#add_product").click(function() {
        product_added = $('#select_product_order').val();
        qte_product = $('#qte_product_order').val();
        addRowProduct(product_added);
    });
    /*-----------------------------------------------*/


    function addRowProduct($id) {
        if(product_added != null) {

            if (($('#qte_product_order').val() != '') && ($('#qte_product_order').val() > 0)) {
                /*******************************************/
                $("#collapse_products").show("slow");

                ///URL FOR GET INFORMATIONS OF MY PRODUCT///
                const url = "getInfosProductsArray.html";
                ////////////////////////////////////////////

                /*Declare form*/
                let form = {id: $id};

                /***Post ajax request and get the result in product***/
                let product = send_post(form, url);
                /****************************************************/
                /*Calculation of price of sizes + price of products * number of products*/
                $totalPrice = (parseFloat(qte_product) * parseFloat(product.sizes_price)) + (parseFloat(product.base_price) * parseFloat(qte_product));
                $current_order_price = parseFloat($("body").find('#current_order_price').val());
                $("#current_order_price").val($totalPrice + $current_order_price);

                /*Insert an row in my table*/
                let row = array.insertRow(1);
                row.id = "ligne" + count; /// Pour chaques ligne on lui affecte un id "ligne" + la letiable count*/

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);
                let cell8 = row.insertCell(7);
                let cell9 = row.insertCell(8);

                cell1.innerHTML = qte_product;
                cell2.innerHTML = product.product_name;
                cell3.innerHTML = product.reference;
                cell4.innerHTML = product.description;
                cell5.innerHTML = product.base_price;
                cell6.innerHTML = "<img src=\"" + "/local/assets/img/uploaded/" + product.img_url + "\" width=\"80px\" height=\"80px\">";;
                cell7.innerHTML = product.colors_names;
                cell8.innerHTML = product.sizes_names;
                cell9.innerHTML = '<a onClick="deleteRow(' + count + ',' + product.id_product + ',' + qte_product + ')" style="font-size:1.5em;" class="glyphicon glyphicon-remove" aria-hidden="true"></a>';
                count++;
                notify("pe-7s-refresh-2", "<b>Informations : </b> Le produit à été ajouté à la commande avec succès !", "info");

            } else {
                notify("pe-7s-refresh-2", "<b>Informations : </b> Le champ quantité du produit n'est pas correctement renseigné ", "danger");
            }

        } else{
            notify("pe-7s-refresh-2", "<b>Informations : </b> Veuillez selectionner un produit avant de l'ajouter à la commande", "danger");
        }


    }

});
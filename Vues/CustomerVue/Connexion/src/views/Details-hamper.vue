<template>
  <v-container class="contrainer-restaurants">
    <div v-if="priceOrder > 0">
        <v-list-item>
          <v-list-item-content class="list-item-restaurants">
            <v-list-item-title style="margin-bottom: 20px">
              <strong>Vous commandez chez {{restaurantName}}</strong>
            </v-list-item-title>
            <v-list-item-title class="list-item-subtitle" style="margin-bottom: 20px">
              <strong>Lieu de livraison :</strong> {{userAdresse}}
            </v-list-item-title>
            <v-list-item-title class="list-item-subtitle" style="margin-bottom: 20px">
              <strong>Total : {{priceOrder}} €</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-title class="title-hamper"><strong>Votre commande est composée de :</strong></v-list-item-title>

        <v-list-item
            v-for="(item, i) in detailsMenuOrder"
            :key="i"
            class="list-items-hamper"
            style="margin-bottom:10px"
        >
          <v-btn  @click="DeleteMenuInOrder(item._id, item.menu_price)" icon>
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-img
              :src="require(`../assets/repas/menu1_Mauricette.jpg`)"
              max-width="145px"
              class="pa-2"
          />

          <v-list-item-content class="list-elements">
            <v-list-item-title><strong>{{item.menu_name}}</strong></v-list-item-title>
            <v-list-item-title>Prix : {{item.menu_price}} €</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-for="(item, i) in detailsItemOrder"
            :key="i"
            class="list-items-hamper"
            style="margin-bottom:10px"
        >
          <v-btn @click="DeleteItemInOrder(item._id, item.item_price)" icon>
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-img
              :src="require(`../assets/repas/menu1_Mauricette.jpg`)"
              max-width="145px"
              class="pa-2"
          />

          <v-list-item-content class="list-elements">
            <v-list-item-title><strong>{{item.item_name}}</strong></v-list-item-title>
            <v-list-item-title><strong>Prix :</strong> {{item.item_price}} €</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
            v-for="(item, i) in detailsItemOptionalsOrder"
            :key="i"
            class="list-items-hamper"
            style="margin-bottom:10px"
        >
          <v-btn @click="DeleteItemInOrderOption(item._id, item.item_price)" icon>
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <v-img
              :src="require(`../assets/repas/menu1_Mauricette.jpg`)"
              max-width="145px"
              class="pa-2"
          />

          <v-list-item-content class="list-elements">
            <v-list-item-title><strong>{{item.item_name}}</strong></v-list-item-title>
            <v-list-item-title><strong>Prix :</strong> {{item.item_price}} €</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-title class="list-item-btn" @click="ValidationFinale()">
          <v-btn>Valider ma commande</v-btn>
        </v-list-item-title>
  </div>
  <div v-else>
    <v-list-item >
      <v-list-item-content class="list-item-restaurants">
        <v-list-item-title>
          <strong>Ajouter un article à votre commande pour voir le détail de votre commande.</strong>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
  </v-container>
</template>

<script>
 import RestaurantService from "../services/restaurant.service";

 export default {
    name: "Details-hamper-vue",
    data: () => ({
      showDialog: false,
      restaurantName: "",
      userAdresse: "",
      address: "",
      detailsMenuOrder : [],
      detailsItemOrder: [],
      detailsItemOptionalsOrder: [],
      priceOrder: 0,
    }),
    methods: {
      ValidationFinale()
      {
        this.$store.dispatch('orderModule/updatePrice', {
          price: this.priceOrder,
          orderId: this.$store.state.orderModule.order._id
        })

        this.$store.dispatch('orderModule/validationOrder', {
          orderId: this.$store.state.orderModule.order._id
        })
        this.$router.push({ name: 'restaurants', params: { showOkCom: 'true', restaurantName: this.restaurantName} });
      },
      DeleteItemInOrder(id, price) {
        this.$store.dispatch('orderModule/deleteItem', {
          itemId: id,
          orderId: this.$store.state.orderModule.order._id
        }).then (() => {
          this.detailsItemOrder.splice(0, this.detailsItemOrder.length);
          this.priceOrder = this.priceOrder - price;
          for(const value of this.$store.state.orderModule.order.id_items) {
            RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsItemOrder.push(response.data);
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }
        })
      },
      DeleteItemInOrderOption(id, price) {
        this.$store.dispatch('orderModule/deleteItemOption', {
          itemId: id,
          orderId: this.$store.state.orderModule.order._id
        }).then (() => {
          this.detailsItemOptionalsOrder.splice(0, this.detailsItemOptionalsOrder.length);
          this.priceOrder = this.priceOrder - price;
          for(const value of this.$store.state.orderModule.order.id_items_optional) {
            RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsItemOptionalsOrder.push(response.data);
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }
        })
      },
      DeleteMenuInOrder(id, price) {
        this.$store.dispatch('orderModule/deleteMenu', {
          menuId: id,
          orderId: this.$store.state.orderModule.order._id
        }).then (() => {
          this.detailsMenuOrder.splice(0, this.detailsMenuOrder.length);
          this.priceOrder = this.priceOrder - price;
          for(const value of this.$store.state.orderModule.order.id_menus) {
            RestaurantService.getDetailsMenu(value, this.$store.state.orderModule.order.restaurantId).then(
                response => {
                  this.detailsMenuOrder.push(response.data);
                },
                error => {
                  this.content =
                      (error.response && error.response.data) ||
                      error.message ||
                      error.toString();
                }
            )
          }
         // this.UpdatePriceOrder(this.priceOrder);
        })
      },
      detailsRestaurants() {
        RestaurantService.getRestaurantById(this.$store.state.orderModule.order.restaurantId).then(
            response => {
              this.restaurantName = response.data.restaurant_name;
            },
            error => {
              this.content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
        );
      },
      detailsMenus() {
        this.detailsMenuOrder.splice(0, this.detailsMenuOrder.length);
        for(const value of this.$store.state.orderModule.order.id_menus) {
          RestaurantService.getDetailsMenu(value, this.$store.state.orderModule.order.restaurantId).then(
              response => {
                this.detailsMenuOrder.push(response.data);
                this.priceOrder = this.priceOrder + response.data.menu_price;
              },
              error => {
                this.content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          )
        }
      },
      detailsItems() {
        this.detailsItemOrder.splice(0, this.detailsItemOrder.length);
        for(const value of this.$store.state.orderModule.order.id_items) {
          RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
              response => {
                this.detailsItemOrder.push(response.data);
                this.priceOrder = this.priceOrder + response.data.item_price;
              },
              error => {
                this.content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          )
        }
      },
      detailsItemsOptionals() {
        this.detailsItemOptionalsOrder.splice(0, this.detailsItemOptionalsOrder.length);
        for(const value of this.$store.state.orderModule.order.id_items_optional) {
          RestaurantService.getDetailsItem(value, this.$store.state.orderModule.order.restaurantId).then(
              response => {
                console.log(response.data);
                this.detailsItemOptionalsOrder.push(response.data);
                this.priceOrder = this.priceOrder + response.data.item_price;
              },
              error => {
                this.content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
              }
          )
        }
      }
    },
     mounted()
     {
       RestaurantService.getDetailsOrder(this.$store.state.orderModule.order._id).then(
           response => {
             this.priceOrder = response.data.order_price;
             this.userAdresse = this.$store.state.auth.user.address;
             this.detailsRestaurants(); // Pour le nom et adresse du restaurant
             this.priceOrder = 0;
             if ((response.data.id_menus).length != 0)
             {
               this.detailsMenus();
             }

             if ((response.data.id_items).length != 0)
             {
               this.detailsItems();
             }

             if ((response.data.id_items_optional).length != 0)
             {
               this.detailsItemsOptionals();
             }
           },
           error => {
             this.content =
                 (error.response && error.response.data) ||
                 error.message ||
                 error.toString();
           }
       )
     },
  }
</script>

<style>
  .v-image-orders .v-image__image {
    height: 100px;
    width: 100px;
  }
  .list-item-subtitle {
    margin-left: 5%;
  }
  .list-item-btn {
    text-align: center;
  }
  .list-item-btn .ml-auto{
    max-width: 100%;
  }
  .description-order {
    width: 60%;
    margin-left: 9%;
    border-right: 1px dashed black;
  }
  .list-item-subtitle-textarea {
    margin-left: 20%;
  }
  .textarea-description {
    background-color: #F4F6F6;
  }
  .container-details-hamper {
    display: flex;
  }
  .title-hamper {
    margin-left: 5%;
    margin-bottom: 2%;
  }

</style>
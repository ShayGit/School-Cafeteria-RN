import { navigate, push, setParams } from "../components/RootNavigation";

import { Alert } from "react-native";
import createDataContext from "./createDataContext";
import { firestore } from "../config/firebase";

const menuReducer = (state, action) => {
  switch (action.type) {
    case "set_first_categories":
      return {
        ...state,
        categories: action.payload.categories,
      };
    case "set_products":
      return {
        ...state,
        products: [...state.products, ...action.payload.products],
      };
    case "set_sub_categories":
            return {
        ...state,
        categories: [...state.categories, ...action.payload.categories]
      };
      case "set_loading":
            return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

const fetchCategories = (dispatch) => async () => {
  try {
    const categories = await firestore
      .collection("Categories")
      .where("parent", "==", null)
      .get();
      console.log("firestore request categories");
    const listToShow = [];
    categories.forEach((category) => {
      const categoryData = category.data();
      const showItem = {
        id: category.id,
        ...categoryData,
      };
      listToShow.push(showItem);
    });
    dispatch({
      type: "set_first_categories",
      payload: { categories: listToShow },
    });
    setParams({
      list: listToShow,
      title: "תפריט",
    });
  } catch (error) {
    Alert.alert(error.message);
    console.log(error);
  }
};

const itemSelected = (dispatch) => async ({ categories, products, item }) => {
  try {
    dispatch({
      type: "set_loading",
      payload: true,
    });
    const  itemId = item.id;
    const itemName = item.name;
    let listToShow = [];
    const subCategories = categories.filter((category) => {
      return category.parent === itemId;
    });
    if (subCategories.length === 0) {
      const subCategoryProducts = products.filter((product) => {
        return product.category === itemId;
      });
      if (subCategoryProducts.length === 0) {
        const product = products.filter((product) => {
          return product.id === itemId;
        });

        if (product.length === 0) {
          const productsDB = await firestore
            .collection("products")
            .where("category", "==", itemId)
            .get();
            console.log("firestore request products");

          if (productsDB.empty) {
            const subCategoriesDB = await firestore
              .collection("Categories")
              .where("parent", "==", itemId)
              .get();
             console.log("firestore request sub categories");

            if (!subCategoriesDB.empty) {
              subCategoriesDB.forEach((subCategory) => {
                const subCategoryData = subCategory.data();
                const showItem = {
                  id: subCategory.id,
                  ...subCategoryData,
                };

                listToShow.push(showItem);
              });

              dispatch({
                type: "set_sub_categories",
                payload: { categories: listToShow },
              });
              push('Category',{
                list: listToShow,
                title: itemName,
              });
            }
            else{
              dispatch({
                type: "set_loading",
                payload: false,
              });
              Alert.alert('לא נמצאו מוצרים');
            }
          }
          else{
            productsDB.forEach((product) => {
              const productData = product.data();

              if(productData.customIngredients)
              {
                productData.customIngredients = productData.customIngredients.map(ingredient => ({
                    name: ingredient,
                    isChecked: false
                  })
                );
              }

              const showItem = {
                id: product.id,
                 ...productData
                // name: productData.name,
                // category: productData.category,
                // description: productData.description,
                // image: productData.image,
                // price: productData.price,
                // customIngredients: customIngredients

              };
              listToShow.push(showItem);
            });
            dispatch({
              type: "set_products",
              payload: { products: listToShow },
            });
            push('Category',{
              list: listToShow,
              title: itemName,
            });
          }
        }
        else{
          navigate('Product', {product: product[0]});
        }
      }
      else{
        push('Category',{
          list: subCategoryProducts,
          title: itemName,
        });
        
      }
    }
    else{
    
      push('Category',{
        list: subCategories,
        title: itemName,
      });
    }
  } catch (error) {
    dispatch({
      type: "set_loading",
      payload: false,
    });
    Alert.alert(error.message);
    console.log(error);
  }
};

const setLoading = (dispatch) => (isLoading) => {
  dispatch({
    type: "set_loading",
    payload: isLoading,
  });
}

export const { Provider, Context } = createDataContext(
  menuReducer,
  {
    fetchCategories,
    itemSelected,
    setLoading
  },
  {
    categories: [],
    products: [],
    loading: false
  }
);

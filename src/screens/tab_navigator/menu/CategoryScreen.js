import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import CustomHeader from "components/CustomHeader";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "components/ListItem";
import Loader from "components/Loader";
import { Context as MenuContext } from "context/MenuContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const CategoryScreen = ({ route, navigation }) => {
  const title =
    route.params == undefined ? "תפריט" : route.params.title;
    const list = route.params == undefined? null : route.params.list;
    
  const {
    state: { categories, products, loading },
    fetchCategories,
    itemSelected,
    setLoading
  } = useContext(MenuContext);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(false)


      
    }, [])
  );

  useEffect(() => {
    console.log("useEffect Category Screen");
    if (route.params === undefined) {
      fetchCategories();
    }

    return ()=> {
      console.log('unmounted Category Screen')
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader text={title} isBack={navigation.canGoBack() && title !== 'תפריט'} />
{list === null?
      <Loader />
      : null}
      {!loading ?
      <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              name={item.name ? item.name : null}
              image={item.image ? item.image : null}
              description={item.description ? item.description : null}
              price={item.price ? item.price : null}
              onItemSelect={()=>itemSelected({categories, products, item})}
            />
          )}
        />
      </View> 
: null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default CategoryScreen;

import { FlatList, View, Text, Image } from "react-native";

export default function RecipeList({recipes}) {
    return(
        <FlatList 
        data = {recipes}
        renderItem={({item}) => (
            <View style={{margin: 5, alignItems: "center"}}>
                <Text style={{fontSize: 20}}>{item.strMeal}</Text>
                <Image style={{ width: 120, height: 120}} source={{uri: item.strMealThumb}}/>
            </View>
        )}
        ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: "#ccc", marginVertical: 10, width: "100%"}}/>
        )}
        />
    )
}
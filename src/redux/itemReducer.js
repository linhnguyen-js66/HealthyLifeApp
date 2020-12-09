const initStore = {
    Meal:[]
}
export default function reducer(state = initStore, action){
    switch(action.type){
        case "ADD_MEAL":{
           let result = {...state}
           //input mealname
           let indexOfMealName = state.Meal.findIndex((item) => item.itemMeal.name == action.payload.name)
           //tìm quantity
           if(indexOfMealName < 0){
               result.Meal.push({itemMeal:action.payload,quantity:1})
           }
           else{
               result.Meal[indexOfMealName].quantity++
           }
           console.log(result)
           return result
        }
        case "REMOVE_PRODUCT":{
            let resultSelected = {...state}
            let findMealName = state.Meal.findIndex((item)=> item.itemMeal.name == action.payload.name)
            if(findMealName < 0){
                resultSelected.Meal.push({itemMeal:action.payload,quantity:0})
            }
            else{
                resultSelected.Meal[findMealName].quantity == 0
            }
            console.log(resultSelected)
            return resultSelected
        }
        default:
            return initStore;
    }
}
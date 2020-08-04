export const initDietDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        diet: { 
            diet_id: 0,
            diet_level: 0,
            food_type:0,
            food_type_name:"", 
            occurred_date: occurredDate,
            
        }
      }
}
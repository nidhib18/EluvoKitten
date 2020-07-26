export const initPainDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        pain: { 
            pain_id: 0,
            pain_level: 0,
            pain_type:0,
            pain_type_name:"",
            occurred_date: occurredDate,
            locations: [] 
        }
      }
}
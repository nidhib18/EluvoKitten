export const initSexDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        sex: { 
            sex_id: 0,
            sex_level: 0,
            sexual_activity:{},
            sexual_activity_name:"", 
            occurred_date: occurredDate,
            
        }
      }
}
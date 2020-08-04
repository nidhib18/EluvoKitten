export const initDigestionDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        digestion: { 
            digestion_id: 0,
            digestion_level: 0,
            bowel_symptom:0, 
            bowel_symptom_name:"",
            occurred_date: occurredDate,
            
        }
      }
}
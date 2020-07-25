export const initMoodDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        mood: { 
            mood_id: 0,
            mood_level: 0,
            mood_description:0, 
            mood_description_name:"",
            occurred_date: occurredDate,
            
        }
      }
}
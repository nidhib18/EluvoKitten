export const initPainDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        pain: { 
            pain_id: 0,
            pain_level: 0,
            occurred_date: occurredDate,
            locations: []
        }
      }
}
export const initBloodDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        blood: { 
            bleeding_id: 0,
            bleeding_level: 0,
            period_product:0, 
            period_product_name:"",
            occurred_date: occurredDate,
            
        }
      }
}
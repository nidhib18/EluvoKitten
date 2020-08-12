export const initMedicationDetails = (userId, occuredDate) => {
    return  { 
        user_id: userId,
        medication: { 
            medication_id: 0,
            medication_type: "",
            medication_quantity:"", 
            medication_time_taken:"",
            medication_side_effects: 0, 
            occured_date: occuredDate,
            
        }
      }
}
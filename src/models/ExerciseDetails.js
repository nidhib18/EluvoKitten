export const initExerciseDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        exercise: { 
            exercise_id: 0,
            exercise_level: 0,
            exercise_type:0, 
            exercise_type_name:"",
            occurred_date: occurredDate,
            
        }
      }
}
export const initAppointmentDetails = (userId, occurredDate) => {
    return  { 
        user_id: userId,
        appointment: { 
            appointment_date:"",
            appointment_type: "",
            appointment_with: "",
            appointment_location: "",
            appointment_notes:"",
            occurred_date: occurredDate,
            
        }
      }
}